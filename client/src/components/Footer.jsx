import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand */}
        <div className="space-y-3 mb-3">
          <h2 className="text-lg font-extrabold text-gray-900 mb-0">
            College Events Aggregator
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-0">
            Discover internships, jobs, and college events across India — all in
            one trusted platform.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
          {/* Explore */}
          <div className="pt-4 md:pt-0 border-t md:border-t-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-events" className="hover:text-blue-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/all-internships" className="hover:text-blue-600">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/all-internships" className="hover:text-blue-600">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="pt-4 md:pt-0 border-t md:border-t-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/about" className="hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="pt-4 md:pt-0 border-t md:border-t-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/privacy-policy" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-blue-600">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/syedsadikaslam"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white shadow hover:text-gray-900 text-gray-500"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/Md-Sadik-9104a2252"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white shadow hover:text-blue-600 text-gray-500"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@internx.com"
              className="p-2 rounded-full bg-white shadow hover:text-red-500 text-gray-500"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center">
            © {year} College Events Aggregator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
