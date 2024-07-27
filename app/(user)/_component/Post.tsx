import Image from "next/image";
import { GoHeart } from "react-icons/go";

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import { IPost } from "../_lib/type";
import { MdPlace } from "react-icons/md";
dayjs.extend(relativeTime);
dayjs.locale("ko");
const Post = ({ post }: { post: IPost }) => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${post._id.toString()}`}>
      <article className="flex px-8 py-10 mb-10 rounded-3xl shadow-lg border-[1px] hover:border-green-700 transition-all duration-100 ">
        <div className="flex flex-col flex-1 self-stretch ">
          <div className="flex-1  flex flex-col space-y-1 justify-center">
            <div>
              <p className="text-2xl font-semibold">{post.title}</p>
              <div className="flex text-black/50 text-md">
                <p className="flex items-center text-black/80 mr-1">
                  <MdPlace />
                  {post.address.place_name}
                </p>
                |
                <p className="ml-1">
                  {post.content.length > 10
                    ? post.content.slice(0, 10) + "..."
                    : post.content}
                </p>
              </div>
            </div>
            <div className="text-sm flex">
              <p className="flex">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{post.rating}.0</span>
              </p>
              <p className="text-gray-500 ml-2">
                {dayjs(post.createAt).fromNow(false)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-40 h-40 rounded-lg overflow-hidden relative ">
          <Image
            src={post.imageUri}
            alt="image"
            fill
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            placeholder="blur"
            objectFit="cover"
          />
        </div>
      </article>
    </Link>
  );
};

export default Post;
