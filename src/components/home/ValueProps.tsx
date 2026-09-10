import React from "react";
import { Handshake, Leaf, ShieldCheck, Gem } from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "One of a kind",
    description: "No two pieces are identical — each is made and finished by hand.",
  },
  {
    icon: Handshake,
    title: "Support artisans directly",
    description: "Your purchase goes straight to the maker, not a warehouse.",
  },
  {
    icon: Leaf,
    title: "Sustainable materials",
    description: "Small-batch production means less waste and more care.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Your orders and payments are protected end to end.",
  },
];

const ValueProps = () => {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-start gap-3">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-olive/10 text-olive">
              <Icon size={22} />
            </span>
            <h3 className="font-semibold text-rich-brown">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
