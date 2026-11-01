import type { MetadataRoute } from "next";
import { getAllTourSlugs } from "@/lib/data/tours";
import { getAllDestinationSlugs } from "@/lib/data/destinations";
import { getAllPostSlugs, getAllCategories } from "@/lib/blog";
import { categoryToSlug } from "@/lib/taxonomy";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/tours",
    "/destinations",
    "/services",
    "/why-adventophile",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
  }));

  const tourRoutes: MetadataRoute.Sitemap = getAllTourSlugs().map((slug) => ({
    url: new URL(`/tours/${slug}`, site.url).toString(),
    lastModified: now,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = getAllDestinationSlugs().map((slug) => ({
    url: new URL(`/destinations/${slug}`, site.url).toString(),
    lastModified: now,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: new URL(`/blog/${slug}`, site.url).toString(),
    lastModified: now,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: new URL(`/blog/category/${categoryToSlug(category)}`, site.url).toString(),
    lastModified: now,
  }));

  return [...staticRoutes, ...destinationRoutes, ...tourRoutes, ...postRoutes, ...categoryRoutes];
}
