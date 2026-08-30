import { Link } from "wouter";
import { Home as HomeIcon, User, Newspaper } from "lucide-react";

export type NavKey = "home" | "about" | "magazine";

interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
  { key: "about", label: "About Us", href: "/founder", icon: <User className="w-4 h-4" /> },
  { key: "magazine", label: "Magazine", href: "/magazine", icon: <Newspaper className="w-4 h-4" /> },
];

interface SidebarProps {
  active?: NavKey;
  /**
   * When on the homepage we want the Home link to scroll to top instead of
   * relying on navigation. Pass a handler to override the Home click.
   */
  onHomeClick?: () => void;
}

/**
 * Floating, detached top navigation bar (pill-shaped, silver/metallic high-contrast).
 * Centered near the top of the viewport, stays fixed while scrolling.
 */
export default function Sidebar({ active, onHomeClick }: SidebarProps) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl px-2">
      <nav className="nav-sidebar-silver flex items-center justify-between gap-2 rounded-[2rem] px-4 sm:px-5 py-2.5">
        {/* Brand */}
        <Link
          href="/"
          onClick={active === "home" && onHomeClick ? onHomeClick : undefined}
          className="nav-brand-text"
        >
          buildingit
        </Link>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            const handleClick =
              item.key === "home" && onHomeClick ? onHomeClick : undefined;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={handleClick}
                className={`nav-link-box flex items-center gap-2 justify-center ${
                  isActive ? "nav-link-box-active" : "nav-link-box-inactive"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
