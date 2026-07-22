import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Cool AIFX Studios",
  description:
    "End-to-end AI-native creative production by One Cool Group.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
