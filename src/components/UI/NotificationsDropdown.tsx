import { useEffect, useRef } from "react";
import {Link} from "react-router-dom";

export type NotificationItem = {
  id: string | number;
  title: string;
  description?: string;
  href?: string;
  time?: string; // e.g., "2m ago"
  unread?: boolean;
};

interface NotificationsDropdownProps {
  open: boolean;
  items: NotificationItem[];
  onClose: () => void;
}

// A themed dropdown that slides from the top when opening and slides up when closing
export default function NotificationsDropdown({ open, items, onClose }: NotificationsDropdownProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click or on Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Max height is animated for slide effect; adjust as needed
  const baseClasses =
    "absolute right-0 mt-2 w-80 max-w-[90vw] origin-top overflow-hidden rounded-lg border border-amber-500/20 bg-gray-900/95 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300 ease-out";

  const openClasses = open
    ? "max-h-[420px] opacity-100 translate-y-0"
    : "max-h-0 opacity-0 -translate-y-2 pointer-events-none";

  return (
    <div
      ref={panelRef}
      className={`${baseClasses} ${openClasses}`}
      role="dialog"
      aria-label="Notifications"
      aria-hidden={!open}
    >
      <div className="divide-y divide-amber-500/10">
        <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-b from-gray-900/80 to-gray-900/40">
          <h4 className="text-amber-400 font-semibold">Notifications</h4>
          {items.length > 0 && (
            <span className="text-xs text-amber-300/80">{items.length} new</span>
          )}
        </div>

        {/* List */}
        <ul className="max-h-[360px] overflow-auto custom-scrollbar">
          {items.length === 0 && (
            <li className="px-4 py-6 text-sm text-gray-300/80">No notifications yet.</li>
          )}
          {items.map((n) => (
            <li key={n.id} className="group">
              {n.href ? (
                <Link
                  to={n.href}
                  className="block px-4 py-3 hover:bg-amber-500/10 transition-colors"
                  onClick={onClose}
                >
                  <NotificationRow item={n} />
                </Link>
              ) : (
                <div className="px-4 py-3">
                  <NotificationRow item={n} />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-4 py-2 text-right bg-gray-900/60">
          <Link
            to="/notifications"
            className="text-sm text-amber-300 hover:text-amber-200 transition-colors"
            onClick={onClose}
          >
            View all
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1 h-2 w-2 rounded-full ${item.unread ? "bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.6)]" : "bg-gray-500"}`}
      />
      <div className="flex-1">
        <p className="text-sm text-gray-100">
          <span className="font-medium text-amber-300">{item.title}</span>
          {item.description && (
            <span className="text-gray-300"> — {item.description}</span>
          )}
        </p>
        {item.time && (
          <p className="mt-0.5 text-xs text-gray-400">{item.time}</p>
        )}
      </div>
    </div>
  );
}
