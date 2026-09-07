import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getLinks } from "@/lib/data";
import { CommandPalette } from "@/components/command-palette";
import { SITE_CONFIG } from "@/lib/site-config";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Recursos de Código Abierto`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ["desarrolladores", "recursos", "frontend", "backend", "herramientas", "gratis", "web development", "ui kits", "iconos"],
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
  creator: SITE_CONFIG.author.name,
  metadataBase: new URL(SITE_CONFIG.url), 
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | Recursos de Código Abierto`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/banner.png", 
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Recursos de Código Abierto`,
    description: SITE_CONFIG.description,
    images: ["/banner.png"],
    creator: SITE_CONFIG.author.twitterHandle, 
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: SITE_CONFIG.verification.google,
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
        "@id": `${SITE_CONFIG.url}/#website`,
        "url": SITE_CONFIG.url,
        "name": SITE_CONFIG.name,
        "description": SITE_CONFIG.description,
        "publisher": {
          "@id": `${SITE_CONFIG.url}/#creator`
        },
        "inLanguage": "es"
      },
      {
        "@type": "Person",
        "@id": `${SITE_CONFIG.url}/#creator`,
        "name": SITE_CONFIG.author.name,
        "url": SITE_CONFIG.author.url,
        "sameAs": [
          SITE_CONFIG.author.twitter
        ],
        "jobTitle": SITE_CONFIG.author.jobTitle
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CONFIG.url}/#webpage`,
        "url": SITE_CONFIG.url,
        "name": `${SITE_CONFIG.name} - Recursos y Herramientas`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_CONFIG.url}/#website`
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE_CONFIG.analytics.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE_CONFIG.analytics.gtmId}');`}
        </Script>
        {/* End Google Tag Manager */}

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
