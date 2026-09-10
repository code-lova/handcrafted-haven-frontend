import React from "react";
import { LucideIcon } from "lucide-react";

type Accent = "terracotta" | "olive" | "gold" | "muted";

const accentStyles: Record<Accent, { bg: string; text: string }> = {
  terracotta: { bg: "bg-terracotta/10", text: "text-terracotta" },
  olive: { bg: "bg-olive/10", text: "text-olive" },
  gold: { bg: "bg-gold/20", text: "text-rich-brown" },
  muted: { bg: "bg-gray-100", text: "text-muted" },
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  accent: Accent;
}

const StatCard = ({ icon: Icon, label, value, accent }: StatCardProps) => {
  const { bg, text } = accentStyles[accent];

  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 ${bg} ${text}`}>
        <Icon size={20} />
      </span>
      <p className="text-3xl font-playfair font-semibold text-rich-brown">{value}</p>
      <p className="text-sm text-muted mt-1">{label}</p>
    </div>
  );
};

export default StatCard;
