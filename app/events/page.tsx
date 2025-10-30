"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, CheckCircle, Clock, ChevronRight } from "lucide-react";
import eventsData from "@/assets/events.json";
import { EventDetail } from "./[id]/page";

const CNCF_COMMUNITY_PAGE = "https://community.cncf.io/cloud-native-kampala/";

function formatDate(iso: string) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function EventsPage() {
  const upcomingEvents: EventDetail[] = eventsData
    ? (Object.values(eventsData).filter(
        (evt) => evt.status === "upcoming"
      ) as EventDetail[])
    : [];

  const pastEvents: EventDetail[] = eventsData
    ? (Object.values(eventsData).filter(
        (evt) => evt.status === "past"
      ) as EventDetail[])
    : [];

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              Events
            </h1>
            <p className="mt-1 text-sm text-gray-600 max-w-xl">
              Find upcoming meetups, workshops, and recordings from past events.
              Click RSVP to join an event or view details for past sessions.
            </p>
          </div>
        </div>

        {/* Upcoming events */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Upcoming
            </h2>
            <p className="text-sm text-gray-500">
              {upcomingEvents.length} upcoming event
              {upcomingEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="rounded-lg p-6 bg-gray-50 border border-gray-100 text-center">
              <p className="text-gray-600">
                No upcoming events at the moment. Check back later or join our
                community for updates.
              </p>
              <a
                href={CNCF_COMMUNITY_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Join the community
              </a>
            </div>
          ) : (
            <div className="grid gap-6">
              {upcomingEvents.map((evt) => (
                <article
                  key={evt.id}
                  className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Event Image */}
                  {evt.imageUrl && (
                    <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={evt.imageUrl}
                        alt={`${evt.title} poster`}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {evt.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatDate(evt.date)}
                            {evt.time ? ` • ${evt.time}` : ""}
                          </span>
                        </span>
                        {evt.location && (
                          <span className="hidden sm:inline">•</span>
                        )}
                        {evt.location && (
                          <span className="text-gray-500">{evt.location}</span>
                        )}
                      </div>
                      {evt.description && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                          {evt.description}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      <a
                        href={evt.rsvpUrl ?? CNCF_COMMUNITY_PAGE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                      >
                        RSVP
                        <ChevronRight className="w-4 h-4" />
                      </a>

                      <Link
                        href={`/events/${evt.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-gray-50 text-sm text-gray-700 border border-gray-100 hover:bg-gray-100 transition"
                        aria-label={`Open details for ${evt.title}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Past events */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              Past events
            </h2>
            <p className="text-sm text-gray-500">
              {pastEvents.length} past event{pastEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          {pastEvents.length === 0 ? (
            <div className="rounded-lg p-6 bg-gray-50 border border-gray-100 text-center">
              <p className="text-gray-600">No past events found yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {pastEvents.map((evt) => (
                <article
                  key={evt.id}
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Event Image */}
                  {evt.imageUrl && (
                    <div className="bg-gray-100 -z-10">
                      <img
                        src={evt.imageUrl}
                        alt={`${evt.title} poster`}
                        //fill
                        //className="object-cover"
                        //sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {evt.title}
                    </h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatDate(evt.date)}
                            {evt.time ? ` • ${evt.time}` : ""}
                          </span>
                        </span>
                        {evt.location && (
                          <span className="text-gray-500">
                            • {evt.location}
                          </span>
                        )}
                      </div>
                    </div>
                    {evt.description && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                        {evt.description}
                      </p>
                    )}

                    {/* Action Section */}
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/events/${evt.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition"
                      >
                        View details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <span className="text-xs text-gray-400">
                        Recording / slides
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default EventsPage;
