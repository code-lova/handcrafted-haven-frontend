import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import TanstackProvider from "@/providers/tanstackQuery";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { UserProvider } from "@/context/userContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Empowering artisans through beautiful digital storefronts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <TanstackProvider>
          <SessionProviderWrapper>
            <UserProvider>
              <main>
                {children}
                <Toaster />
              </main>
            </UserProvider>
          </SessionProviderWrapper>
        </TanstackProvider>
      </body>
    </html>
  );
}
