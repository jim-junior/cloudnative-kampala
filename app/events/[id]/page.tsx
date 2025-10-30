// app/events/[id]/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  ExternalLink,
  FileText,
  Video,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import eventsData from "@/assets/events.json";

export function generateEventMetadata({ params }: { params: { id: string } }) {
  const event = eventsData.find((item) => item.id === params.id);

  if (!event) return null;

  const speakerNames =
    event.speakers?.map((s) => s.name).join(", ") || "Guest Speakers";
  const keywords = [
    ...(event.tags || []),
    "Event",
    "CNCF",
    "Cloud",
    "AI",
    "Tech",
  ];

  return {
    title: `${event.title} | ${speakerNames}`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      url: `https://your-website.com/events/${event.id}`,
      siteName: "Your Website Name",
      images: [
        {
          url: event.imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "article",
      authors: event.speakers?.map((s) => s.name),
      tags: event.tags,
      publishedTime: event.date,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
      creator: event.speakers?.[0]?.twitter || "@yourtwitterhandle",
    },
    keywords,
  };
}

type Speaker = {
  name: string;
  title?: string;
  company?: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
};

export type EventDetail = {
  id: string;
  title: string;
  date: string; // ISO date
  time?: string;
  location?: string;
  description: string;
  fullDescription?: string; // Longer, more detailed description
  imageUrl?: string;
  rsvpUrl?: string | null;
  speakers?: Speaker[];
  slidesUrl?: string;
  recordingUrl?: string; // YouTube video ID or full URL
  attendeeCount?: number;
  tags?: string[];
  status: "upcoming" | "past" | "ongoing";
};

const CNCF_COMMUNITY_PAGE = "https://community.cncf.io/cloud-native-kampala/";

function formatDate(iso: string) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function extractYouTubeId(url: string): string | null {
  // Handle direct video IDs
  if (url.length === 11 && !url.includes("/")) {
    return url;
  }

  // Handle full YouTube URLs
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export default function page({ params }: { params: { id: string } }) {
  const event = (eventsData as EventDetail[]).find(
    (evt) => evt.id === params.id
  );

  if (!event) {
    notFound();
  }

  const recording_type: "youtube" | "google_drive" | "other" =
    event.recordingUrl
      ? event.recordingUrl.includes("youtube.com")
        ? "youtube"
        : event.recordingUrl.includes("drive.google.com")
        ? "google_drive"
        : "other"
      : "other";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to events
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Event Image */}
            {event.imageUrl && (
              <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <img
                  src={event.imageUrl}
                  alt={`${event.title} poster`}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Event Header Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-4">
                {event.status === "upcoming" && "Upcoming Event"}
                {event.status === "past" && "Past Event"}
                {event.status === "ongoing" && "Happening Now"}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">
                    {formatDate(event.date)}
                    {event.time && ` • ${event.time}`}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                )}

                {event.attendeeCount && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">
                      {event.attendeeCount} attendees
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {event.status === "upcoming" && event.rsvpUrl && (
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    RSVP Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {event.slidesUrl && (
                  <a
                    href={event.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                  >
                    <FileText className="w-4 h-4" />
                    View Slides
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About this event
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.fullDescription || event.description}
                </p>
              </div>
            </section>

            {/* Video Recording */}

            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-red-600" />
                Session Recording
              </h2>
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-gray-900">
                {recording_type === "youtube" && (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(
                      event.recordingUrl!
                    )}`}
                    title={event.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {recording_type === "google_drive" && (
                  <iframe
                    src={event.recordingUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                )}
                {recording_type === "other" && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
                    <a
                      href={event.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Watch Recording
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Speaker{event.speakers.length > 1 ? "s" : ""}
                </h2>
                <div className="space-y-6">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {speaker.avatar ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={speaker.avatar}
                              alt={speaker.name}
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                      </div>

                      {/* Speaker Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {speaker.name}
                        </h3>
                        {(speaker.title || speaker.company) && (
                          <p className="text-sm text-gray-600 mt-1">
                            {speaker.title}
                            {speaker.title && speaker.company && " at "}
                            {speaker.company}
                          </p>
                        )}
                        {speaker.bio && (
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {speaker.bio}
                          </p>
                        )}

                        {/* Social Links */}
                        <div className="flex gap-3 mt-3">
                          {speaker.twitter && (
                            <a
                              href={speaker.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-500 transition"
                              aria-label="Twitter"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                          )}
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-700 transition"
                              aria-label="LinkedIn"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                          {speaker.github && (
                            <a
                              href={speaker.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-900 transition"
                              aria-label="GitHub"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Event Details
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500 mb-1">Date & Time</dt>
                  <dd className="text-gray-900 font-medium">
                    {formatDate(event.date)}
                    {event.time && (
                      <span className="block text-gray-600 font-normal mt-1">
                        {event.time}
                      </span>
                    )}
                  </dd>
                </div>

                {event.location && (
                  <div>
                    <dt className="text-gray-500 mb-1">Location</dt>
                    <dd className="text-gray-900 font-medium">
                      {event.location}
                    </dd>
                  </div>
                )}

                {event.attendeeCount && (
                  <div>
                    <dt className="text-gray-500 mb-1">Attendees</dt>
                    <dd className="text-gray-900 font-medium">
                      {event.attendeeCount} people
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-gray-500 mb-1">Status</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === "upcoming"
                          ? "bg-green-100 text-green-800"
                          : event.status === "past"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">
                  Join our community for more events
                </p>
                <a
                  href={CNCF_COMMUNITY_PAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition"
                >
                  Visit Community Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
