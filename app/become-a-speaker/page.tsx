// app/become-a-speaker/page.jsx
"use client";

import React, { useState } from "react";
import { Mic } from "lucide-react";

interface SpeakerForm {
  name: string;
  email: string;
  organization?: string;
  title: string;
  abstract: string;
  bio: string;
  level: "Introductory" | "Intermediate" | "Advanced";
  preferredDate?: string;
  duration: string;
  equipment?: string;
  links?: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface Status {
  loading: boolean;
  success: boolean | null;
  message: string;
}

const initialForm: SpeakerForm = {
  name: "",
  email: "",
  organization: "",
  title: "",
  abstract: "",
  bio: "",
  level: "Introductory",
  preferredDate: "",
  duration: "30",
  equipment: "",
  links: "",
  consent: false,
};

export default function BecomeASpeakerPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: null,
    message: "",
  });

  function validate(values: SpeakerForm): FormErrors {
    const e: FormErrors = {};
    if (!values.name.trim()) e.name = "Your name is required.";
    if (!values.email.trim()) e.email = "A contact email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email.";
    if (!values.title.trim()) e.title = "Talk title is required.";
    if (!values.abstract.trim() || values.abstract.trim().length < 50)
      e.abstract = "Please provide a short abstract (≥ 50 characters).";
    if (!values.bio.trim()) e.bio = "A short speaker bio is required.";
    if (!values.consent)
      e.consent =
        "Please confirm you agree to share this info with the organizers.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ loading: false, success: null, message: "" });

    const valErrors = validate(form);
    setErrors(valErrors);
    if (Object.keys(valErrors).length > 0) return;

    setStatus({ loading: true, success: null, message: "" });

    try {
      const res = await fetch("/api/speakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.error || "Failed to submit. Try again later.");

      setStatus({
        loading: false,
        success: true,
        message: "Thanks — your proposal was submitted!",
      });
      setForm(initialForm);
      setErrors({});
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || "Submission failed.",
      });
    }
  }

  function updateField(key: keyof SpeakerForm, value: string | boolean) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <header className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto mb-3">
            <Mic className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Become a Speaker
          </h1>
          <p className="mt-2 text-gray-600 max-w-prose mx-auto">
            Want to present at a Cloud Native Kampala meetup or workshop? Fill
            the form below and the organizers will review your proposal.
          </p>
        </header>

        {/* Status */}
        {status.success === true && (
          <div className="mb-4 rounded-md bg-green-50 border border-green-100 p-3 text-green-800">
            {status.message}
          </div>
        )}
        {status.success === false && (
          <div className="mb-4 rounded-md bg-rose-50 border border-rose-100 p-3 text-rose-800">
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name, Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Full name
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={`mt-1 text-gray-700 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-rose-400" : "border-gray-200"
                }`}
                placeholder="Jane Doe"
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`mt-1 text-gray-700 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-rose-400" : "border-gray-200"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
              )}
            </label>
          </div>

          {/* Organization + Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Organization (optional)
              </span>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => updateField("organization", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company, University or 'Independent'"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Links (slides, GitHub, portfolio)
              </span>
              <input
                type="text"
                value={form.links}
                onChange={(e) => updateField("links", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/you, https://slides.com/..."
              />
            </label>
          </div>

          {/* Title and Level */}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Talk title
              </span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className={`mt-1 text-gray-700 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-rose-400" : "border-gray-200"
                }`}
                placeholder="E.g. Getting started with Kubernetes"
              />
              {errors.title && (
                <p className="text-xs text-rose-600 mt-1">{errors.title}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Level</span>
              <select
                value={form.level}
                onChange={(e) => updateField("level", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Introductory</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>

          {/* Abstract */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Short abstract
            </span>
            <textarea
              value={form.abstract}
              onChange={(e) => updateField("abstract", e.target.value)}
              rows={5}
              className={`mt-1 text-gray-700 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.abstract ? "border-rose-400" : "border-gray-200"
              }`}
              placeholder="Describe your talk in 2–4 short paragraphs. Include key takeaways."
            />
            {errors.abstract && (
              <p className="text-xs text-rose-600 mt-1">{errors.abstract}</p>
            )}
          </label>

          {/* Bio + Duration + Date */}
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-gray-700">
                Short speaker bio
              </span>
              <input
                type="text"
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className={`mt-1 text-gray-700 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.bio ? "border-rose-400" : "border-gray-200"
                }`}
                placeholder="One-liner or two about your background"
              />
              {errors.bio && (
                <p className="text-xs text-rose-600 mt-1">{errors.bio}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Duration (mins)
              </span>
              <select
                value={form.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </label>
          </div>

          {/* Preferred date + equipment */}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Preferred date (optional)
              </span>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => updateField("preferredDate", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Equipment / notes
              </span>
              <input
                type="text"
                value={form.equipment}
                onChange={(e) => updateField("equipment", e.target.value)}
                className="mt-1 text-gray-700 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Projector, Zoom, mac vs windows, special setup..."
              />
            </label>
          </div>

          {/* Consent */}
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I agree to share this information with the Cloud Native Kampala
              organizers. I understand the organizers may contact me to schedule
              or request additional details.
              {errors.consent && (
                <span className="block text-xs text-rose-600 mt-1">
                  {errors.consent}
                </span>
              )}
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {status.loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    className="opacity-25 stroke-current"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
              ) : (
                <Mic className="w-5 h-5" />
              )}
              <span>
                {status.loading ? "Submitting..." : "Submit Proposal"}
              </span>
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Tip: Keep the abstract focused on outcomes and key takeaways.
          Organizers typically review proposals within a week.
        </p>
      </div>
    </main>
  );
}
