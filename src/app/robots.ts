import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/q/"],
    },
    sitemap: "https://short-urls-vercel-app.vercel.app/sitemap.xml",
  };
}
