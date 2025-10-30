"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import cncgIcon from "@/public/cncg-icon-color.svg";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/become-a-speaker", label: "Speak" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current?.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" aria-label="Cloud Native Kampala home">
              <img
                className="h-10 w-10 cursor-pointer"
                src={cncgIcon.src}
                alt="Cloud Native Kampala Logo"
              />
            </Link>
            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-gray-900">
                Cloud Native Kampala
              </h1>
              <p className="text-xs text-gray-600">A CNCF Community Group</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://community.cncf.io/cloud-native-kampala/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              Join Us
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={btnRef}
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                // X icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (slide down) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden transition-[max-height,opacity] duration-200 ease-out overflow-hidden bg-white border-t ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-800 hover:text-blue-600 font-medium px-2 py-2 rounded-md"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://community.cncf.io/cloud-native-kampala/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full text-center mt-2 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            Join Us
          </a>

          {/* optional: small quick links or social icons */}
          <div className="pt-4 border-t border-blue-50">
            <p className="text-xs text-gray-500">Follow us</p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
