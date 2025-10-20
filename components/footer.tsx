import { Mail } from "lucide-react";
import React from "react";
import cncgIcon from "@/public/cncg-icon-color.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img
                className="h-10 w-10"
                src={cncgIcon.src}
                alt="CNCF Kampala Logo"
              />
              <div>
                <h3 className="text-lg font-semibold">Cloud Native Kampala</h3>
                <p className="text-gray-400 text-sm">
                  Cloud Native Computing Foundation
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Building a vibrant cloud native community in Kampala, Uganda. Join
              us to learn, share, and grow together in the cloud native
              ecosystem.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:cncf-kampala@open.ug"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://www.cncf.io/"
                  className="hover:text-white transition-colors"
                >
                  Cloud Native Computing Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://community.cncf.io/"
                  className="hover:text-white transition-colors"
                >
                  CNCF Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://github.com/cncf/foundation/blob/main/code-of-conduct.md"
                  className="hover:text-white transition-colors"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Cloud Native Kampala Community. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Part of the{" "}
            <a
              href="https://www.cncf.io/"
              className="text-blue-600 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloud Native Computing Foundation
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            Phipphy characters by{" "}
            <a
              href="https://phippy.io"
              className="text-blue-600 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              phippy.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
