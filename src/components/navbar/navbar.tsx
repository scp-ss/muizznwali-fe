"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Todo App", href: "/todo" },
    { name: "Heavy Duty Calculator", href: "/heavy-duty-calculator" },
    { name: "Downloads", href: "/downloads" },
    { name: "Extra Apps", href: "/Extraapps" },
    { name: "API's", href: "/api" },
  ];

  return (
    <nav className="navbar sticky top-0 z-50">
      <div className="navbar-inner">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "nav-active" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
//The woods