import { siteConfig } from "@/app/siteConfig";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">{siteConfig.name}</h1>
    </>
  );
}
