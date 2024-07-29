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
      <article className="flex md:items-center px-5 py-6 mb-10 rounded-3xl shadow-lg border-[1px] md:flex-col md:hover:scale-105 transition-all duration-200">
        <div className="w-24 h-24 md:w-40 md:h-40  rounded-lg overflow-hidden relative ">
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
        <div className="flex flex-col flex-1 self-stretch md:mt-3 ml-5 md:ml-0">
          <div className="flex-1 flex flex-col space-y-1 justify-center">
            <div>
              <p className="text-xl font-semibold">
                {" "}
                {post.title.length > 10
                  ? post.title.slice(0, 10) + "..."
                  : post.title}
              </p>
              <div className="flex text-black/50 text-sm">
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
      </article>
    </Link>
  );
};

export default Post;
