import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // Changed to Roboto
import "./globals.css";
import { getLinks } from "@/lib/data";
import { CommandPalette } from "@/components/command-palette";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Enlaces para Desarrolladores | Recursos de Código Abierto",
    template: "%s | Enlaces para Desarrolladores",
  },
  description: "Una colección curada de cientos de recursos, herramientas y bibliotecas para potenciar tu flujo de trabajo como desarrollador. Packs, UI Kits, Iconos y más.",
  keywords: ["desarrolladores", "recursos", "frontend", "backend", "herramientas", "gratis", "web development", "ui kits", "iconos"],
  authors: [{ name: "Yamil Ayma", url: "https://github.com/YamilAyma" }],
  creator: "Yamil Ayma",
  metadataBase: new URL("https://enlaces-para-desarrolladores.netlify.app"), 
  alternates: {
    canonical: "https://enlaces-para-desarrolladores.netlify.app",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://enlaces-para-desarrolladores.netlify.app",
    title: "Enlaces para Desarrolladores | Recursos de Código Abierto",
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
    title: "Enlaces para Desarrolladores | Recursos de Código Abierto",
    description: "Colección curada de recursos y herramientas para desarrolladores.",
    images: ["/logo.png"],
    creator: "@yamilayma", 
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "hKxa3eTYihytsIbCFOtjcyLBoZkGx7ryB5ejex8LB1w",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getLinks();

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://enlaces-para-desarrolladores.netlify.app/#website",
        "url": "https://enlaces-para-desarrolladores.netlify.app",
        "name": "Enlaces para Desarrolladores",
        "description": "Una colección curada de cientos de recursos, herramientas y bibliotecas para potenciar tu flujo de trabajo como desarrollador.",
        "publisher": {
          "@id": "https://enlaces-para-desarrolladores.netlify.app/#creator"
        },
        "inLanguage": "es"
      },
      {
        "@type": "Person",
        "@id": "https://enlaces-para-desarrolladores.netlify.app/#creator",
        "name": "Yamil Ayma",
        "url": "https://github.com/YamilAyma",
        "sameAs": [
          "https://x.com/yamilayma"
        ],
        "jobTitle": "Software Developer"
      },
      {
        "@type": "CollectionPage",
        "@id": "https://enlaces-para-desarrolladores.netlify.app/#webpage",
        "url": "https://enlaces-para-desarrolladores.netlify.app",
        "name": "Enlaces para Desarrolladores - Recursos y Herramientas",
        "isPartOf": {
          "@id": "https://enlaces-para-desarrolladores.netlify.app/#website"
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Desarrollo Web"
          },
          {
            "@type": "Thing",
            "name": "Herramientas de programación"
          }
        ]
      }
    ]
  };

  return (
    <html lang="es">
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {children}
        <CommandPalette categories={categories} />
      </body>
    </html>
  );
}
