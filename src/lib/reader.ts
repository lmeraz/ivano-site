import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export async function personSchema(path = "/") {
  const siteSettings = await reader.singletons.siteSettings.read();
  if (!siteSettings) throw new Error("Site settings not found");
  return {
    "@context": "https://schema.org" as const,
    "@type": "Person" as const,
    name: siteSettings.name,
    jobTitle: siteSettings.role,
    description: siteSettings.description,
    email: siteSettings.email,
    url: `${siteSettings.siteUrl}${path}`,
    homeLocation: {
      "@type": "City" as const,
      name: siteSettings.baseCity,
    },
  };
}
