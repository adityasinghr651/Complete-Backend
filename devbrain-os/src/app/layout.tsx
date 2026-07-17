import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Three type roles, on purpose:
// - Space Grotesk (display): headlines. Geometric, slightly technical,
//   distinct from the generic system-font look of most AI-tool landing pages.
// - Inter (sans/body): long-form reading. Neutral and highly legible so it
//   never competes with the display face.
// - JetBrains Mono (mono): code, file paths, ADR ids -- anything that should
//   visually read as "this is a literal engineering artifact."
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBrain OS",
  description:
    "The open source AI engineering operating system -- a permanent Engineering Brain for your codebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
