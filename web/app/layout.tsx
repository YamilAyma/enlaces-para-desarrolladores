import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // Changed to Roboto
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Enlaces para Desarrolladores",
    template: "%s | Enlaces para Desarrolladores",
  },
  description: "Una colección curada de cientos de recursos, herramientas y bibliotecas para potenciar tu flujo de trabajo como desarrollador. Packs, UI Kits, Iconos y más.",
  keywords: ["desarrolladores", "recursos", "frontend", "backend", "herramientas", "gratis", "web development", "ui kits", "iconos"],
  authors: [{ name: "Yamil Ayma", url: "https://github.com/YamilAyma" }],
  creator: "Yamil Ayma",
  metadataBase: new URL("https://enlaces.yamilayma.com"), // Replace with actual domain if known, or use localhost for now and update later
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://enlaces.yamilayma.com",
    title: "Enlaces para Desarrolladores",
    description: "Descubre cientos de recursos cuidadosamente seleccionados para llevar tu desarrollo al siguiente nivel.",
    siteName: "Enlaces para Desarrolladores",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Enlaces para Desarrolladores Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enlaces para Desarrolladores",
    description: "Colección curada de recursos y herramientas para desarrolladores.",
    images: ["/logo.png"],
    creator: "@yamilayma", 
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
