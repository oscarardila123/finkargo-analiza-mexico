import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthSessionProvider } from "@/components/providers/session-provider";
import { ConsoleErrorFilter } from "@/components/console-error-filter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finkargo Analiza - Inteligencia Comercial para Colombia",
  description: "Plataforma B2B SaaS de inteligencia de mercado basada en datos de aduanas colombianas para importadores, exportadores y agentes de carga.",
  keywords: "inteligencia comercial, importaciones Colombia, exportaciones, Aduanas, proveedores internacionales, análisis de mercado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConsoleErrorFilter />
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
