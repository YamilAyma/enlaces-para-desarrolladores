export const SITE_CONFIG = {
  name: "Enlaces para Desarrolladores",
  shortName: "Enlaces Devs",
  description:
    "Una colección curada de cientos de recursos, herramientas y bibliotecas de código abierto para desarrolladores.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://enlaces-para-desarrolladores.netlify.app",
  author: {
    name: "Yamil Ayma",
    url: "https://github.com/YamilAyma",
    twitter: "https://x.com/yamilayma",
    twitterHandle: "@yamilayma",
    jobTitle: "Software Developer",
  },
  links: {
    github: "https://github.com/YamilAyma/enlaces-para-desarrolladores",
    contributing:
      "https://github.com/YamilAyma/enlaces-para-desarrolladores/blob/main/CONTRIBUTING.md",
    rss: "/posts/rss.xml",
    sitemap: "/sitemap.xml",
  },
  revalidate: 3600,
  defaultPageSize: 30,
  verification: {
    google: "hKxa3eTYihytsIbCFOtjcyLBoZkGx7ryB5ejex8LB1w",
  },
} as const;
