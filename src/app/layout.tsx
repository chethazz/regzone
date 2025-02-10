import type { Metadata } from "next";
import { Sulphur_Point } from "next/font/google";
import "./globals.css";

const sulphurPoint = Sulphur_Point({
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Regzone",
    absolute: "Regzone"
  },
  description: "Get your premium shopping done!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sulphurPoint.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
