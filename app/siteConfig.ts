export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "The Air Travel Guy",
  description: "News and travel reviews from the commercial aviation world.",
  navItems: [
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Reviews",
      href: "/reviews",
    },
    {
      label: "History",
      href: "/history",
    },
  ],
};
