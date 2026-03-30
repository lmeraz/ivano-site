import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export function personSchema(
  siteSettings: {
    readonly name: string;
    readonly role: string;
    readonly description: string;
    readonly email: string;
    readonly siteUrl: string;
    readonly baseCity: string;
  },
  path = "/",
) {
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
