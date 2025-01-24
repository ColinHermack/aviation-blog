export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "The Air Travel Guy",
  description: "News and travel reviews from the commercial aviation world.",
  navItems: [
    {
      label: "Aviation",
      href: "/articles?topic=aviation",
    },
    {
      label: "Travel",
      href: "/articles?topic=travel",
    },
    {
      label: "Photography",
      href: "/articles?topic=photography",
    },
  ],
};
