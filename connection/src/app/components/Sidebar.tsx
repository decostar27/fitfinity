"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, DollarSign, MessageSquareQuote, Users, Link as LinkIcon, Mail } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Events", path: "/events", icon: <CalendarDays size={20} /> },
    { name: "Memberships", path: "/memberships", icon: <DollarSign size={20} /> },
    { name: "Testimonials", path: "/testimonials", icon: <MessageSquareQuote size={20} /> },
    { name: "Applications", path: "/applications", icon: <Users size={20} /> },
    { name: "Subscribers", path: "/subscribers", icon: <Mail size={20} /> },
  ];

  return (
    <aside className="dock glass-panel">
      <nav className="dock-menu">
        <Link href="/" className="dock-logo group">
          <LinkIcon className="text-primary" size={24} color="#ff7f11" />
          <span className="dock-tooltip">Connectio</span>
        </Link>
        <div className="dock-divider"></div>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`dock-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span className="dock-tooltip">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
