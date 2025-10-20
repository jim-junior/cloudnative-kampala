import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";

interface SpeakerPayload {
  name: string;
  email: string;
  title: string;
  abstract: string;
  bio: string;
  consent: boolean;
  organization?: string;
  level?: string;
  duration?: string | number;
  preferredDate?: string;
  equipment?: string;
  links?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

function validatePayload(body: SpeakerPayload): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!body?.name?.trim()) errors.name = "Missing name";
  if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.email = "Invalid email";
  if (!body?.title?.trim()) errors.title = "Missing title";
  if (!body?.abstract?.trim() || body.abstract.trim().length < 50)
    errors.abstract = "Abstract too short (>=50 chars)";
  if (!body?.bio?.trim()) errors.bio = "Missing bio";
  if (!body?.consent) errors.consent = "Consent required";
  return errors;
}

function buildIssueTitle(body: SpeakerPayload): string {
  const safeTitle = body.title.trim().replace(/\r?\n|\r/g, " ");
  const namePart = body.name ? ` — ${body.name.trim().split(" ")[0]}` : "";
  return `${safeTitle}${namePart}`;
}

function buildIssueBody(body: SpeakerPayload, meta?: { ip?: string }): string {
  const lines = [
    `## Speaker proposal submitted via website`,
    ``,
    `**Name:** ${body.name || "-"}`,
    `**Email:** ${body.email || "-"}`,
    body.organization ? `**Organization:** ${body.organization}` : null,
    `**Talk title:** ${body.title || "-"}`,
    `**Level:** ${body.level || "-"}`,
    `**Duration (mins):** ${body.duration || "-"}`,
    body.preferredDate ? `**Preferred date:** ${body.preferredDate}` : null,
    body.equipment ? `**Equipment / notes:** ${body.equipment}` : null,
    body.links ? `**Links:** ${body.links}` : null,
    `\n`,
    `## Abstract`,
    `\n`,
    `${(body.abstract || "-").trim()}`,
    `\n`,
    `\n`,
    `## Speaker bio`,
    `\n`,
    `${(body.bio || "-").trim()}`,
    `\n`,
    `---`,
    `*Received ${new Date().toLocaleString()}*`,
  ];

  if (meta?.ip) lines.push(`*Submitted from IP: ${meta.ip}*`);
  return lines.filter(Boolean).join("\n");
}

export async function POST(request: Request) {
  try {
    const body: SpeakerPayload = await request.json();

    // Validate payload
    const errors = validatePayload(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 422 }
      );
    }

    const {
      GITHUB_APP_ID,
      GITHUB_INSTALLATION_ID,
      GITHUB_PRIVATE_KEY,
      GITHUB_ISSUE_LABELS,
      GITHUB_ASSIGNEES,
    } = process.env;

    if (!GITHUB_APP_ID || !GITHUB_INSTALLATION_ID || !GITHUB_PRIVATE_KEY) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: parseInt(GITHUB_APP_ID, 10),
        privateKey: GITHUB_PRIVATE_KEY,
        installationId: parseInt(GITHUB_INSTALLATION_ID, 10),
      },
    });

    // Optional labels and assignees
    const labels = GITHUB_ISSUE_LABELS
      ? GITHUB_ISSUE_LABELS.split(",")
          .map((l) => l.trim())
          .filter(Boolean)
      : ["speaker"];
    const assignees = GITHUB_ASSIGNEES
      ? GITHUB_ASSIGNEES.split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      : [];

    // Build issue title & body
    const issueTitle = buildIssueTitle(body);
    const meta = { ip: request.headers.get("x-forwarded-for") || undefined };
    const issueBody = buildIssueBody(body, meta);

    // Create the GitHub issue
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: "open-ug",
        repo: "cloudnative-kampala",
        title: issueTitle,
        body: issueBody,
        labels,
        assignees,
      }
    );

    return NextResponse.json(
      {
        message: "Proposal received",
        issueUrl: response.data.html_url,
        received: {
          name: body.name,
          email: body.email,
          title: body.title,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Speaker API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
