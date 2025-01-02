export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Skybound News",
  description: "News and travel reviews from the commercial aviation world.",
  navItems: [
    {
      label: "News",
      href: "/news"
    },
    {
      label: "Reviews",
      href: "/reviews"
    },
    {
        label: "About",
        href: "/about"
    }
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
