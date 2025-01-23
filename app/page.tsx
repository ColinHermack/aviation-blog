import { Image } from "@nextui-org/image";
import { Card, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/app/siteConfig";
import ArticleCard from "@/app/article-card";
import {
  ArticleMetadata,
  getPaginatedNewsArticleMetadata,
} from "@/articles/utils";

function LatestArticles() {
  let latestArticles: ArticleMetadata[] = getPaginatedNewsArticleMetadata(
    1,
  ).slice(0, 3);

  return latestArticles.map((article) => {
    return (
      <ArticleCard
        key={article.title.toLowerCase().replace(" ", "-")}
        coverPhoto={article.cover}
        datePosted={new Date(article.datePosted)}
        title={article.title}
        type={article.type}
      />
    );
  });
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-top w-full min-h-screen">
      <Image
        alt={siteConfig.name}
        className="object-cover my-10"
        height={400}
        src="/cover_image.png"
        width={800}
      />
      <p className="text-center text-xl font-bold">
        A site about commercial aviation and global travel.
      </p>

      <div className="my-10 flex flex-col justify-top align-center gap-8 md:flex-row md:justify-center md:items-center">
        <Link href="/news">
          <Card isFooterBlurred className="border-none" radius="lg">
            <Image
              alt="A Boeing 777 engine"
              className="object-cover"
              height={200}
              src="/engine.png"
              width={200}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-xl font-bold text-white/80">News</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/reviews">
          <Card isFooterBlurred className="border-none" radius="lg">
            <Image
              alt="A Singapore Airlines Boeing 777"
              className="object-cover"
              height={200}
              src="/singapore_777.png"
              width={200}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-xl font-bold text-white/80">Reviews</p>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/history">
          <Card isFooterBlurred className="border-none" radius="lg">
            <Image
              alt="A Lufthansa Boeing 747-800"
              className="object-cover"
              height={200}
              src="/lufthansa_747.png"
              width={200}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-xl font-bold text-white/80">History</p>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-5">Latest Articles</h2>
      <LatestArticles />
    </div>
  );
}
