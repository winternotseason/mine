import { auth } from "@/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getUser, getUserPosts } from "../_lib/api-handler/User";
import UserInfo from "./_component/UserInfo";
import MainBanner from "../_component/MainBanner";
import Header from "@/app/_component/Header";

const Profile = async ({ params }: { params: { userid: string } }) => {
  const { userid } = params;
  const session = await auth();
  // session.user = { name : '황서연', id: 'xitseo' }
  // data.user.id를 가지고 user의 데이터 불러오는 useQuery
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", userid],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", userid],
    queryFn: getUserPosts,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <Header />
        <div className="mt-10 md:mt-0">
          <UserInfo userid={userid} session={session} />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default Profile;
