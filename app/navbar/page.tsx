"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/" },
    { name: "Startup Manager", href: "/startup-manager" },
    { name: "Security Center", href: "/security" },
    { name: "Performance Center", href: "/performance" },
    { name: "Logs", href: "/logs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          HERACLES
        </Link>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-md font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-primary ${pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}
