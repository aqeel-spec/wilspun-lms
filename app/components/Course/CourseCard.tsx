import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  // Function to truncate the course name and add tooltip
  const truncateName = (name: string, length: number) => {
    if (name.length > length) {
      return name.slice(0, length) + "...";
    }
    return name;
  };

  return (
    <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`} passHref>
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
        <div className=" p-8 md:p-6 lg:p-[12px]  ">
          <h5
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
            title={item.name}
          >
            {truncateName(item.name, 50)}
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
            <Link
              href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
              passHref
            >
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <FiExternalLink className="w-4 h-4 ml-2" />
              </div>
            </Link>
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
// import React, { FC } from "react";
// import { AiOutlineUnorderedList } from "react-icons/ai";

// type Props = {
//   item: any;
//   isProfile?: boolean;
// };

// const CourseCard: FC<Props> = ({ item, isProfile }) => {
//   // Function to truncate the course name and add tooltip
//   const truncateName = (name: string, length: number) => {
//     if (name.length > length) {
//       return name.slice(0, length) + "...";
//     }
//     return name;
//   };

//   return (
//     <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
//       <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-transform transform hover:scale-105">
//         <div className="w-full h-[200px] overflow-hidden">
//           <Image
//             src={item.thumbnail.url}
//             width={500}
//             height={300}
//             objectFit="cover"
//             className="w-full h-full object-cover"
//             alt={item.name}
//           />
//         </div>
//         <div className="p-5">
//           <h5
//             className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white truncate"
//             title={item.name}
//           >
//             {truncateName(item.name, 70)}
//           </h5>
//           <div className="mb-3 text-gray-700 dark:text-gray-400 text-sm">
//             {item.shortDescription || "No description available"}
//           </div>
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center">
//               <Ratings rating={item.ratings} />
//               <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                 ({item.ratingsCount || 0})
//               </span>
//             </div>
//             <div className="flex items-center">
//               <AiOutlineUnorderedList size={20} fill="#fff" />
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
//             <Link
//               href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
//               className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Read more
//               <svg
//                 className="w-3.5 h-3.5 ml-2"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 10"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 5h12m0 0L9 1m4 4L9 9"
//                 />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CourseCard;
