"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IPost, User } from "../../_lib/type";
import { getUser } from "../../_lib/api-handler/User";
import { getPost } from "../../_lib/api-handler/Post";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Skeleton } from "./Skeleton";
import { FaStar } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import useKakaoLoader from "../../../_component/use-kakao-loader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DetailPostHeader from "./DetailPostHeader";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const DetailPost = ({ postid }: { postid: string }) => {
  const router = useRouter();
  useKakaoLoader();
  const { data: post, isLoading: isPostLoading } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["post", postid],
    queryFn: getPost,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const { data: user, isLoading: isUserLoading } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", post?.writer], // 빈 문자열로 대체하여 ['users', null] 방지
    queryFn: getUser, // post가 존재할 때만 실행
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (isPostLoading || isUserLoading) {
    return <Skeleton />;
  }
  if (!post) {
    return (
      <>
        <DetailPostHeader />
        <div className="w-full h-full flex justify-center items-center">
          <p>존재하지 않는 포스트입니다.</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative">
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: parseFloat(post.address.location_y),
            lng: parseFloat(post.address.location_x),
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "400px",
          }}
          level={2} // 지도의 확대 레벨
        >
          <MapMarker
            position={{
              lat: parseFloat(post.address.location_y),
              lng: parseFloat(post.address.location_x),
            }}
          />
        </Map>
        <div className="z-10 absolute -bottom-3 right-0 p-4 bg-white/80">
          <div className="flex items-center">
            <p>{post.address.place_name}</p>
            <p className="text-black/50 text-sm ml-2">
              {post.address.category}
            </p>
          </div>
          <p className="text-black/50">{post.address.address_name}</p>
        </div>
      </div>

      <div className="w-full h-full mt-12 md:mt-0">
        <div className="w-full py-5 px-5  flex flex-col items-center">
          <div className="bg-black/10 w-fit px-3 py-1 rounded-3xl text-black/80 flex items-center self-start">
            <MdEditNote className="mr-1" />
            {post.address.category}
          </div>
          {/* 작성자 프로필 */}
          <div className="flex items-center my-4 self-start">
            <div>
              <Image
                src={`/avatar${user.selectedAvatar}.png`}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            <Link href={`/${user.id}`}>
              <div className="ml-2">
                <p className="font-semibold">{user.name}</p>
                <p className="text-black/40 text-sm">
                  {" "}
                  {dayjs(post.createAt).fromNow(false)}
                </p>
              </div>
            </Link>
          </div>
          <div className="font-semibold text-2xl self-start">{post.title}</div>
          {/* 장소 / 메뉴 / 별점 */}
          <div className="mt-4 space-y-3 self-start">
            <div className="flex items-center">
              <p className="bg-black/10 px-2 py-1 text-sm rounded-3xl flex items-center">
                <FaRegBuilding className="mr-1" />
                장소
              </p>
              <p className="ml-2">{post.address.place_name}</p>
            </div>
            <div className="flex">
              <p className="bg-black/10 px-2 py-1 text-sm rounded-3xl flex items-center">
                <MdOutlineRestaurantMenu className="mr-1" />
                메뉴
              </p>
              <p className="ml-2">{post.menu}</p>
            </div>
            <div className="flex">
              <p className="bg-black/10 px-2 py-1 text-sm rounded-3xl flex items-center">
                <FaStar className="mr-1" />
                별점
              </p>
              <p className="ml-2">{post.rating}.0</p>
            </div>
          </div>
          {/* 지도 */}
          <div className="w-full max-w-[40rem] border-[1px] rounded-3xl overflow-hidden mt-4 md:hidden">
            <div>
              <Map // 지도를 표시할 Container
                center={{
                  // 지도의 중심좌표
                  lat: parseFloat(post.address.location_y),
                  lng: parseFloat(post.address.location_x),
                }}
                style={{
                  // 지도의 크기
                  width: "100%",
                  height: "200px",
                }}
                level={3} // 지도의 확대 레벨
              >
                <MapMarker
                  position={{
                    lat: parseFloat(post.address.location_y),
                    lng: parseFloat(post.address.location_x),
                  }}
                />
              </Map>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <p>{post.address.place_name}</p>
                <p className="text-black/50 text-sm ml-2">
                  {post.address.category}
                </p>
              </div>
              <p className="text-black/50">{post.address.address_name}</p>
            </div>
          </div>
          {/* 글 내용 */}
          <div className="my-4">{post.content}</div>
          {/* 이미지 */}
          <div className="w-full max-w-[40rem] aspect-square relative flex justify-center">
            <Image
              src={post.imageUri}
              alt="image"
              fill
              sizes="100%"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPost;
