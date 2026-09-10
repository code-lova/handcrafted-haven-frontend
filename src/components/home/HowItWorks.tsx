import React from "react";
import Link from "next/link";
import { Search, MessageCircle, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse handmade goods by category, price, or the story behind them.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description: "Read each maker's story and see the craftsmanship before you buy.",
  },
  {
    icon: PackageCheck,
    title: "Support",
    description: "Check out securely, knowing your purchase supports an independent artisan.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-playfair font-semibold text-rich-brown text-center mb-2">
        How Handcrafted Haven Works
      </h2>
      <p className="text-muted text-center max-w-xl mx-auto mb-12">
        A simple, direct path from a maker&apos;s workshop to your home.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {steps.map(({ icon: Icon, title, description }, idx) => (
          <div key={title} className="text-center">
            <div className="relative mx-auto w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
              <Icon size={26} />
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-semibold">
                {idx + 1}
              </span>
            </div>
            <h3 className="font-semibold text-rich-brown mb-2">{title}</h3>
            <p className="text-sm text-muted max-w-xs mx-auto">{description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-rich-brown text-white px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-playfair font-semibold">Are you an artisan?</h3>
          <p className="text-white/70 mt-2 max-w-md">
            Set up a seller profile, list your work, and reach buyers who care
            about handmade craftsmanship.
          </p>
        </div>
        <Link
          href="/signup"
          className="px-6 py-3 rounded-md bg-gold text-rich-brown font-medium hover:bg-white transition whitespace-nowrap"
        >
          Start Selling
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
