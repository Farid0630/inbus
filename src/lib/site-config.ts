/**
 * Single source of truth for company data used across the site.
 *
 * ⚠️ PLACEHOLDER DATA — replace every value below with the real company
 * details before going live. Nothing here is fetched from an external
 * source; it is safe to edit directly.
 */

export const siteConfig = {
  companyName: "Inbus Solusi Bisnis",
  brandName: "Inbus Solusi Bisnis",
  domain: "www.makassarcocoexport.com", // TODO: ganti dengan domain asli
  foundedYear: 2015, // TODO
  address: {
    line1: "Jl. Pelabuhan Hasanuddin No. 00", // TODO
    city: "Makassar",
    province: "Sulawesi Selatan",
    postalCode: "90111", // TODO
    country: "Indonesia",
    mapsUrl: "https://maps.google.com/?q=Makassar,Indonesia", // TODO: link Google Maps asli
  },
  contact: {
    email: "export@makassarcocoexport.com", // TODO
    workingHours: "Senin – Sabtu, 08.00 – 17.00 WITA", // TODO
  },
  social: {
    instagram: "https://instagram.com/", // TODO
    facebook: "https://facebook.com/", // TODO
    linkedin: "https://linkedin.com/", // TODO
  },
  export: {
    portOfLoading: "Makassar (Soekarno-Hatta Port)", // TODO
    incoterms: ["FOB", "CIF", "CNF"],
    monthlyCapacityTons: 500, // TODO
    countriesServed: 15, // TODO
  },
  certifications: [
    {
      id: "phytosanitary",
      icon: "leaf",
    },
    {
      id: "sucofindo",
      icon: "badge-check",
    },
    {
      id: "iso",
      icon: "shield-check",
    },
    {
      id: "halal",
      icon: "circle-check",
    },
  ],
} as const;

