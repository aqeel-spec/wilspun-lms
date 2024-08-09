'use client';

import dynamic from 'next/dynamic';
import React, { FC, useCallback, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/features/reduxHooks';
import { setOpen, setRoute } from '@/redux/features/globalSlice';
import { toast } from 'react-hot-toast';
import { RootState } from '@/redux/features/store';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// import { Router } from 'next/router';

// Dynamic import of the Ratings component
const Ratings = dynamic(() => import('@/app/utils/Ratings'), { ssr: false });

type Props = {
  item: {
    _id: string;
    name: string;
    shortDescription?: string;
    thumbnail: { url: string };
    ratings: number;
    ratingsCount: number;
    courseData?: Array<any>;
    price: number;
    estimatedPrice?: number | any;
  };
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { route } = useAppSelector((state: RootState) => state.global);
  const [notificationShown, setNotificationShown] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle course click
  const handleCourseClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!user) {
        e.preventDefault();
        const searchParamsString = searchParams ? `?${searchParams.toString()}` : '';
        const fullPath = `${pathname}${searchParamsString}`;
        dispatch(setRoute(fullPath));
        dispatch(setOpen(true));
        dispatch(setRoute("Login"));
        if (!notificationShown) {
          toast.error("Please log in to continue.", {
            position: "top-right",
          });
          setNotificationShown(true);
        }
      }
    },
    
    [dispatch, user, pathname, searchParams, notificationShown, route]
  );


  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
      onClick={handleCourseClick}
    >
      <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-transform transform hover:scale-105">
        <div className="w-full h-[200px] overflow-hidden">
          <Image
            src={item.thumbnail.url}
            width={500}
            height={300}
            objectFit="cover"
            className="w-full h-full object-cover"
            alt={item.name}
          />
        </div>
        <div className="p-8 md:p-6 lg:p-[12px]">
          <h5
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
            title={item.name}
          >
            {item.name}
          </h5>
          <p className="mb-3 text-gray-700 dark:text-gray-400 text-sm">
            {item.shortDescription || "No description available"}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Ratings rating={item.ratings} />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                ({item.ratingsCount || 0})
              </span>
            </div>
            <div className="flex items-center">
              <AiOutlineUnorderedList size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {item.courseData?.length} {item.courseData?.length === 1 ? "Lecture" : "Lectures"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.price === 0 ? "Free" : `${item.price}$`}
              </h3>
              {item.estimatedPrice > 0 && (
                <span className="pl-3 text-sm line-through text-gray-500 dark:text-gray-400">
                  {item.estimatedPrice}$
                </span>
              )}
            </div>
            <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <FiExternalLink className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;









// import Ratings from "@/app/utils/Ratings";
// import Image from "next/image";
// import Link from "next/link";
// import React, { FC, useCallback, useEffect } from "react";
// import { AiOutlineUnorderedList } from "react-icons/ai";
// import { FiExternalLink } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "@/redux/features/reduxHooks";
// import { setOpen, setRoute } from "@/redux/features/globalSlice";
// import { toast } from "react-hot-toast";
// import { RootState } from "@/redux/features/store";
// import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
// import { useRouter } from "next/navigation";

// type Props = {
//   item: any;
//   isProfile?: boolean;
// };

// const CourseCard: FC<Props> = ({ item, isProfile }) => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state: RootState) => state.auth);
//   const {refresh} = useRouter();

//   // Fetch course details using the provided course ID
//   const { refetch } = useGetCourseDetailsQuery(item._id, {
//     skip: !user, // Skip query if the user is not logged in
//   });

//   // Handle course click
//   const handleCourseClick = useCallback(
//     (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//       if (!user) {
//         e.preventDefault(); // Prevent the default link action
//         dispatch(setRoute("Login"));
//         dispatch(setOpen(true));
//         toast.error("Please log in to continue.", {
//           position: "top-right",
//         });
//       } else {
//         // Refetch course details when the user is logged in
//         refetch();
//       }
//     },
//     [dispatch, user, refetch]
//   );

//   // Refetch course details if the user logs in
//   useEffect(() => {
//     if (user) {
//       refresh()
//       refetch();
//     }
//   }, [user, refetch]);

//   return (
//     <Link
//       href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
//       onClick={handleCourseClick}
//     >
//       <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-transform transform hover:scale-105">
//         <div className="w-full h-[200px] overflow-hidden">
//           <Image
//             src={item.thumbnail.url}
//             width={500}
//             height={300}
//             objectFit="cover"
//             className="w-full h-full object-cover"
//             alt={item?.name}
//           />
//         </div>
//         <div className="p-8 md:p-6 lg:p-[12px]">
//           <h5
//             className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
//             title={item?.name}
//           >
//             {item.name}
//           </h5>
//           <p className="mb-3 text-gray-700 dark:text-gray-400 text-sm">
//             {item.shortDescription || "No description available"}
//           </p>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <Ratings rating={item.ratings} />
//               <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                 ({item.ratingsCount || 0})
//               </span>
//             </div>
//             <div className="flex items-center">
//               <AiOutlineUnorderedList size={20} className="text-gray-700 dark:text-gray-300" />
//               <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                 {item.courseData?.length} {item.courseData?.length === 1 ? "Lecture" : "Lectures"}
//               </span>
//             </div>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {item.price === 0 ? "Free" : `${item.price}$`}
//               </h3>
//               {item.estimatedPrice > 0 && (
//                 <span className="pl-3 text-sm line-through text-gray-500 dark:text-gray-400">
//                   {item.estimatedPrice}$
//                 </span>
//               )}
//             </div>
//             <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//               Read more
//               <FiExternalLink className="w-4 h-4 ml-2" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CourseCard;
