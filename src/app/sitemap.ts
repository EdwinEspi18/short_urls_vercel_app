import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://short-urls-vercel-app.vercel.app/",
      priority: 1,
    },
    {
      url: "https://short-urls-vercel-app.vercel.app/dashboard",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
