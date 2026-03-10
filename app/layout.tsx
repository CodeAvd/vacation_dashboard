import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vacation Cafe Simulator - Product Feedback Dashboard",
  description:
    "Premium analytics dashboard for analyzing player bugs, friction, feedback themes, and roadmap priorities from Steam, Discord, YouTube, and community discussions.",
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
