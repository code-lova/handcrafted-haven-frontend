import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PageHeader from "../core/PageHeader";
import ValueProps from "../home/ValueProps";
import { Store, ListChecks, SlidersHorizontal, Star } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "Seller Profiles",
    description: "Authenticated artisans build a profile to share their story and craft.",
  },
  {
    icon: ListChecks,
    title: "Product Listings",
    description: "Every item is listed with real photos, pricing, and a description.",
  },
  {
    icon: SlidersHorizontal,
    title: "Search & Filters",
    description: "Browse by category and price to find exactly what you're after.",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Buyers can leave feedback that helps other shoppers and makers alike.",
  },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="About Handcrafted Haven"
        title="A marketplace built around the maker"
        description="We connect independent artisans with people who care where their things come from — no middlemen, no mass production."
      />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-playfair font-semibold text-rich-brown mb-6 text-center">
          Our Story
        </h2>
        <div className="space-y-6 text-muted text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            Handcrafted Haven started with a simple observation: it&apos;s
            surprisingly hard to buy something handmade from the person who
            actually made it. Independent artisans are often boxed into
            generic marketplaces that hide their story behind a product code.
          </p>
          <p>
            We built this platform to flip that around. Every seller gets a
            profile to share who they are and how they work. Every listing is
            a &ldquo;story&rdquo; — the piece, its materials, and the process
            behind it — not just a price tag.
          </p>
          <p>
            The result is a small, growing community of creators and
            conscious consumers who&apos;d rather buy fewer things, made well,
            by someone they can actually get to know.
          </p>
        </div>
      </section>

      <section className="bg-olive/5 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-playfair font-semibold text-rich-brown mb-10 text-center">
            What You&apos;ll Find Here
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/10 text-terracotta mb-4">
                  <Icon size={22} />
                </span>
                <h3 className="font-semibold text-rich-brown mb-2">{title}</h3>
                <p className="text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ValueProps />

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-playfair font-semibold text-rich-brown mb-4">
          Join the community
        </h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          Whether you&apos;re here to shop or to sell, there&apos;s a place
          for you at Handcrafted Haven.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/story"
            className="px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition"
          >
            Explore the Marketplace
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-md border border-olive text-olive hover:bg-olive hover:text-white font-medium transition"
          >
            Sell Your Craft
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
