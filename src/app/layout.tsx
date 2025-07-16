import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CheckingAdmin from "@/components/Secure/CheckingAdmin";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ToolDu Admin Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <CheckingAdmin>{children}</CheckingAdmin>
      </body>
    </html>
  );
}
