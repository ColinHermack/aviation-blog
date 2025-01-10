import React from 'react';

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

interface ArticleCardProps {
    title: string;
    coverPhoto: string,
    datePosted: Date
    type: string
}

export default function ArticleCard(props: ArticleCardProps) {
    return (
        <Link
          key={props.title.toLowerCase().replace(" ", "-")}
          className="m-4"
          href={`/news/${props.title.toLowerCase().replaceAll(" ", "-")}`}
        >
          <Card
            className="w-[350px] h-[175px] max-w-full flex flex-col justify-top align-center"
            shadow={"md"}
          >
            <CardBody className="flex flex-row items-top justify-between overflow-visible">
              <h4 className="font-bold text-md w-[200px] text-left">
                {props.title}
              </h4>
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                height={100}
                src={`/${props.type}_images/${props.coverPhoto}`}
                width={100}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <p className="text-tiny text-default-500 font-bold">
                {props.datePosted.toDateString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      );
}