import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Donafy",
  description: "Plataforma de donaciones Donafy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-donafy-cream text-donafy-text">
        <AuthSessionProvider>
          {children}
          <ScrollToTop />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
