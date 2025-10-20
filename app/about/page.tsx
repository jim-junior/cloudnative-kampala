// app/about/page.jsx   (or pages/about.jsx for pages router)
"use client";

import React from "react";
import Link from "next/link";
import { Users, Flag, Heart } from "lucide-react";

const TEAM = [
  {
    name: "Jim Junior Beingana",
    role: "Lead Organizer",
    bio: "DevOps engineer, community builder, and lead organizer for Cloud Native Kampala.",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQEBXBs4HS6GQg/profile-displayphoto-scale_400_400/B4DZjYeogtGgAk-/0/1755978568140?e=1762387200&v=beta&t=hcGPFJ8595PxvqEUj1vHRTtalLTw1gt-_iwZC7mIYrc",
    social: {
      github: "https://github.com/jim-junior",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Edwin Rwakasiisi",
    role: "Community & Communications Lead",
    bio: "Passionate about fostering community engagement and spreading the word about cloud native technologies.",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQFY3FrtAYsYKw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709929580663?e=1762387200&v=beta&t=BlSNIm3ATUO43JSb4cH5MsJHI_k0Nei4iZcBdbdmLOI",
    social: { github: "#", twitter: "#" },
  },
  {
    name: "Kakuru Conrad Akankwasa",
    role: "Content & Technical Lead",
    bio: "Passionate about cloud native technologies and educating the community through workshops and talks.",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQECw1HUZ7JNYQ/profile-displayphoto-scale_400_400/B4DZgTaW5OHsAg-/0/1752672336961?e=1762387200&v=beta&t=uvWoDjN_NiOezHHHzwDz_C8EtHXME_DAzRC6b_wTxzU",
    social: { github: "#", twitter: "#" },
  },
  {
    name: "Nabasumba Suzan",
    role: "Events and Operations Lead",
    bio: "Tech enthusiast passionate about cloud native technologies and community building.",
    img: "",
    social: { github: "#", twitter: "#" },
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-base text-blue-600 font-semibold inline-flex items-center gap-2">
            <Flag className="w-4 h-4" />
            About Cloud Native Kampala
          </h2>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Building a stronger cloud native community in Uganda
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Cloud Native Kampala is an official CNCF community group bringing
            together developers, DevOps engineers, students, and cloud native
            enthusiasts to learn, collaborate, and contribute to open source.
          </p>
        </header>

        {/* Mission & Values */}
        <section className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50/60 to-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower the Kampala tech community with skills,
              mentorship, and real-world experience in cloud native
              technologies. We provide a welcoming space to learn Kubernetes,
              containers, observability, CI/CD, and more — and to contribute
              back to the global open-source ecosystem.
            </p>
          </div>

          {/* Values */}
          <div className="rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Our Values
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-white border">
                <h4 className="font-medium text-gray-900">Inclusivity</h4>
                <p className="text-sm text-gray-600 mt-1">
                  We welcome people of all backgrounds and skill levels.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border">
                <h4 className="font-medium text-gray-900">Open Source</h4>
                <p className="text-sm text-gray-600 mt-1">
                  We encourage contribution and collaboration with open-source
                  projects.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border">
                <h4 className="font-medium text-gray-900">Learning</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Hands-on learning through workshops, talks, and mentorship.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border">
                <h4 className="font-medium text-gray-900">Community</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Building meaningful local connections and professional
                  networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">The Team</h3>
            <p className="text-sm text-gray-500">
              Volunteer organizers and contributors
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <article
                key={member.name}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 relative rounded-full overflow-hidden mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-medium text-gray-900">
                  {member.name}
                </h4>
                <p className="text-sm text-blue-600 font-medium">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-600">{member.bio}</p>

                <div className="mt-4 flex gap-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 text-sm"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Affiliation */}
        <section className="rounded-2xl p-8 border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Affiliation
              </h3>
              <p className="text-gray-600 mb-4">
                Cloud Native Kampala is an official CNCF Community Group. We are
                connected to the larger Cloud Native Computing Foundation (CNCF)
                ecosystem — giving members access to global projects, learning
                resources, and contribution opportunities.
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href="https://community.cncf.io/cloud-native-kampala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Visit our CNCF Page
                </Link>

                <Link
                  href="/community"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Community Hub
                </Link>
              </div>
            </div>

            <div className="w-40 h-24 flex-shrink-0 flex items-center justify-center">
              <img
                src={
                  "https://github.com/cncf/artwork/raw/main/other/cncf/horizontal/color/cncf-color.png"
                }
                alt="CNCF Logo"
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
