import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PasswordProtection } from "@/components/auth/PasswordProtection";

export const metadata: Metadata = {
  title: "StudioDirection Questionnaires",
  description: "Client questionnaire system",
  icons: {
    icon: "/fav-black-32.svg",
    apple: "/fav-black-256.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PasswordProtection>
        {children}
        </PasswordProtection>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

