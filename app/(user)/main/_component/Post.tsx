import Image from "next/image";
import { GoHeart } from "react-icons/go";

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import { IPost } from "../../_lib/type";
import { formatToKRW } from "../_lib/formatToKRW";

dayjs.extend(relativeTime);
dayjs.locale("ko");
const Post = ({ post }: { post: IPost }) => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${post._id.toString()}`}>
      <article className="flex p-6 hover:bg-black/10 transition-all duration-100 border-b-[1px]">
        <div className="w-40 h-40 rounded-lg overflow-hidden relative">
          <Image
            src={post.imageUri}
            alt="image"
            fill
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col h-40 justify-between ml-4">
          <div>
            <p className="text-xl">{post.title}</p>
            <p className="text-gray-500">
              {dayjs(post.createAt).fromNow(true)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;
