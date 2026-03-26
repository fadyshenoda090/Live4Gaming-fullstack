import { useState, useEffect, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBar from "./SideBar";
import NotificationsDropdown, {
  type NotificationItem,
} from "./NotificationsDropdown";
import type { User } from "../../types/types.ts";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState<number>(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Demo notifications; replace with real data source
  const notifications = useMemo<NotificationItem[]>(
    () => [
      {
        id: 1,
        title: "Tournament starts soon",
        description: "Rocket League in 30 min",
        time: "2m ago",
        unread: true,
        href: "/tournaments",
      },
      {
        id: 2,
        title: "New game added",
        description: "Check out Elden Ring DLC",
        time: "1h ago",
        unread: true,
        href: "/games",
      },
      {
        id: 3,
        title: "Welcome to Live4Gaming",
        description: "Customize your profile",
        time: "Yesterday",
        unread: false,
        href: "/about",
      },
    ],
    [],
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`border-primary/20 text-text-main fixed top-0 z-50 flex w-full items-center justify-between border-b px-6 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-bg-darker/80 shadow-[0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-md"
          : "bg-bg-darker"
      }`}
    >
      {/* Left: Logo + Burger */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="text-primary-light hover:text-primary cursor-pointer text-2xl transition-colors duration-300 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-primary-light hover:text-primary flex items-center gap-2 text-xl font-semibold transition-all duration-300"
        >
          <img
            src="/logo.png"
            alt="LiveForGaming"
            width={32}
            height={32}
            className="border-primary h-8 w-8 rounded-full border shadow-[0_0_10px_rgba(245,158,11,0.4)]"
          />
          <span className="hidden font-bold tracking-wide sm:block">
            Live4Gaming
          </span>
        </Link>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden gap-6 font-medium md:flex">
        {[
          { to: "/", label: "Home" },
          { to: "/games", label: "Games" },
          { to: "/tournaments", label: "Tournaments" },
          { to: "/about", label: "About" },
          { to: "/contact-us", label: "Contact" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:text-primary-light transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 text-lg">
        {user && (
          <Link
            to="/tournaments/enrolled"
            className="hover:text-primary-light hidden items-center gap-1 transition-all duration-300 sm:inline-flex"
          >
            <span className="text-sm">Enrolled</span>
            {enrolledCount > 0 && (
              <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-black shadow-[0_0_6px_rgba(245,158,11,0.6)]">
                {enrolledCount}
              </span>
            )}
          </Link>
        )}

        {/* Notifications */}
        {user && (
          <div className="relative">
            <button
              className="hover:text-primary-light relative transition-all duration-300"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Toggle notifications"
              aria-expanded={notifOpen}
            >
              <IoNotificationsOutline size={23} />
              {unreadCount > 0 && (
                <span className="bg-secondary absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-black shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* Dropdown */}
            <NotificationsDropdown
              open={notifOpen}
              items={notifications}
              onClose={() => setNotifOpen(false)}
            />
          </div>
        )}

        {/* Avatar */}
        {user && (
          <Link to="/profile" className="group flex items-center gap-2">
            <img
              src={user.avatar || "/profiles/default.jpg"}
              alt={user.username}
              width={28}
              height={28}
              className="border-primary/60 group-hover:border-primary-light h-7 w-7 rounded-full border transition-colors"
            />
            <span className="text-text-muted group-hover:text-primary-light hidden text-sm transition-colors sm:inline">
              {user.username}
            </span>
          </Link>
        )}

        {/* Auth Controls */}
        {user ? (
          <button className="border-primary text-primary-light hover:text-primary cursor-pointer rounded-lg border px-1.5 py-0.5 shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all duration-300">
            Logout
          </button>
        ) : (
          <>
            <Link
              to={`/auth/login`}
              className="border-primary text-primary-light hover:text-primary cursor-pointer rounded-lg border px-1.5 py-0.5 shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to={`/auth/register`}
              className="border-primary text-primary-light hover:text-primary cursor-pointer rounded-lg border px-1.5 py-0.5 shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Sidebar (mobile) */}
      {menuOpen && <SideBar setMenuOpen={setMenuOpen} />}
    </nav>
  );
};

export default Navbar;
