import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bg-darker border-surface-border border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <img
                src={`/logo.png`}
                alt={`LiveForGaming`}
                width={40}
                height={40}
                className={`h-11 w-11 rounded-full`}
              />
              <h2 className="text-2xl font-black tracking-wider uppercase">
                <span className="text-white">LIVE4</span>
                <span className="bg-header-gradient bg-clip-text text-transparent">
                  GAMING
                </span>
              </h2>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Join the ultimate gaming platform where warriors unite, battles
              begin, and legends are born.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-light border-primary/30 mb-6 border-b pb-2 text-lg font-bold tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/tournaments"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Tournaments
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboards"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-primary-light border-primary/30 mb-6 border-b pb-2 text-lg font-bold tracking-wide uppercase">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/support/help-center"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/support/contact-us"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/support/faq"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support/community"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/support/report-issue"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-primary-light border-primary/30 mb-6 border-b pb-2 text-lg font-bold tracking-wide uppercase">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/legal/terms-of-service"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/privacy-policy"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/cookie-policy"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/eula"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  EULA
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/code-of-conduct"
                  className="text-text-muted hover:text-primary-light text-sm font-medium transition-colors duration-300"
                >
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-surface-border mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="mb-2 text-lg font-bold text-white">
                Stay in the Battle
              </h3>
              <p className="text-text-muted text-sm">
                Get the latest updates on tournaments and new releases
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-surface-lighter border-surface-border placeholder-text-dim focus:border-primary focus:ring-primary/20 min-w-64 flex-1 rounded-lg border px-4 py-3 text-white transition-all duration-300 focus:ring-2 focus:outline-none"
              />
              <button className="bg-primary-gradient hover:shadow-primary-glow border-primary-light rounded-lg border px-6 py-3 font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-surface-border border-t">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-text-dim text-sm">
              © {new Date().getFullYear()} Live4Gaming. All rights reserved.
            </div>
            <div className="text-text-dim flex items-center gap-2 text-sm">
              <div className="bg-secondary h-1.5 w-1.5 animate-pulse rounded-full" />
              <span>Made for warriors</span>
            </div>
            <div className="text-text-dim flex items-center gap-6 text-sm">
              <span>18+</span>
              <span>ESRB</span>
              <span>PEGI 16</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
