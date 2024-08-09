"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";

const Loader2 = dynamic(() => import("@/app/components/Loader/Loader2"), {
  loading: () => <div className="flex justify-center items-center h-screen"><Loader2 /></div>,
});
const CourseContent = dynamic(() => import("@/app/components/Course/CourseContent"), {
  loading: () => <Loader2 />,
});

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
