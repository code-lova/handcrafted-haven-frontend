import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  children: React.ReactNode;
}

const AuthShell = ({ eyebrow, title, description, bullets, children }: AuthShellProps) => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-rich-brown text-white p-12">
        <Link href="/" className="text-2xl font-playfair font-bold w-fit">
          Handcrafted Haven
        </Link>

        <div>
          <p className="text-gold uppercase tracking-wide text-sm font-medium mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-playfair font-semibold mb-4">{title}</h2>
          <p className="text-white/70 max-w-sm mb-8">{description}</p>
          <ul className="space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-white/90">
                <Check size={18} className="text-gold mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Handcrafted Haven
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          <Link
            href="/"
            className="lg:hidden block text-center text-xl font-playfair font-bold text-rich-brown mb-8"
          >
            Handcrafted Haven
          </Link>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthShell;
