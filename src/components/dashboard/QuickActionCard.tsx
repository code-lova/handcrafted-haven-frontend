import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const QuickActionCard = ({ icon: Icon, title, description, href }: QuickActionCardProps) => {
  return (
    <Link
      href={href}
      className="group p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-terracotta/30 transition"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-terracotta/10 text-terracotta mb-4 group-hover:bg-terracotta group-hover:text-white transition">
        <Icon size={20} />
      </span>
      <h3 className="font-semibold text-rich-brown">{title}</h3>
      <p className="text-sm text-muted mt-1">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
