import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <section className="bg-rich-brown text-white text-center px-6 py-16">
      {eyebrow && (
        <p className="text-sm font-medium tracking-wide uppercase text-gold mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl font-playfair font-bold">{title}</h1>
      {description && (
        <p className="mt-4 text-white/80 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
    </section>
  );
};

export default PageHeader;
