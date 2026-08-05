import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Pimple - AI Digital Twin",
  description: "Interact with Shubham's digital twin to learn about his experience, projects, and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
