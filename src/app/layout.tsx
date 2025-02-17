import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Sulphur_Point } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider";

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
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
