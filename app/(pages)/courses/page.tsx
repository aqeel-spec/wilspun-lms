"use client"
import React, { FC, useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
// import Loader from "../components/Loader/Loader";
// import CourseCard from "../components/Course/CourseCard";
import { useAppSelector, useAppDispatch } from "@/redux/features/reduxHooks";
import { setRoute, setActiveItem } from "@/redux/features/globalSlice";
import Loader from "@/app/components/Loader/Loader";
import CourseCard from "@/app/components/Course/CourseCard";

const CoursesPage: FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const search = searchParams?.get("title") || "";
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    dispatch(setRoute("Courses"));
    dispatch(setActiveItem(1)); // Assuming '1' corresponds to the "Courses" item

    if (category === "All") {
      setCourses(data?.courses || []);
    } else {
      setCourses(data?.courses.filter((item: any) => item.categories.includes(category)));
    }

    if (search) {
      setCourses(data?.courses.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }, [data, category, search, dispatch]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-grow w-[95%] 800px:w-[85%] mx-auto py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">All Courses</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our extensive collection of courses in various categories.
            </p>
          </div>
          <div className="flex items-center flex-wrap mb-6">
            <div
              className={`cursor-pointer px-4 py-2 rounded-full ${
                category === "All" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              } m-2`}
              onClick={() => setCategory("All")}
            >
              All
            </div>
            {categories &&
              categories.map((item: any, index: number) => (
                <div key={index} className="m-2">
                  <div
                    className={`cursor-pointer px-4 py-2 rounded-full ${
                      category === item.title ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                    }`}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
          </div>
          {courses && courses.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              {search
                ? "No courses found matching your search."
                : "No courses found in this category. Please try another one!"}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses &&
                courses.map((item: any, index: number) => (
                  <div key={index} className="w-full ">
                    <CourseCard item={item} />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;


// "use client";
// import React, { useEffect, useState, useContext } from "react";
// import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import { useSearchParams } from "next/navigation";
// import Loader from "../components/Loader/Loader";
// import CourseCard from "../components/Course/CourseCard";
// import { GlobalContext } from "../context/Gprovider";

// const CoursesPage = () => {
//   const globalContext = useContext(GlobalContext);

//   if (!globalContext) {
//     throw new Error("GlobalContext must be used within a GlobalProvider");
//   }

//   const { setRoute, setActiveItem } = globalContext;

//   const searchParams = useSearchParams();
//   const search = searchParams?.get("title") || "";
//   const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
//   const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
//   const [courses, setCourses] = useState([]);
//   const [category, setCategory] = useState("All");

//   useEffect(() => {
//     setRoute("Courses");
//     setActiveItem(1); // Assuming '1' corresponds to the "Courses" item

//     if (category === "All") {
//       setCourses(data?.courses || []);
//     } else {
//       setCourses(data?.courses.filter((item: any) => item.categories.includes(category)));
//     }

//     if (search) {
//       setCourses(data?.courses.filter((item: any) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       ));
//     }
//   }, [data, category, search, setRoute, setActiveItem]);

//   const categories = categoriesData?.layout?.categories;

//   return (
//     <div className="min-h-screen flex flex-col">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="flex-grow w-[95%] 800px:w-[85%] mx-auto py-8">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold mb-2">All Courses</h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               Explore our extensive collection of courses in various categories.
//             </p>
//           </div>
//           <div className="flex items-center flex-wrap mb-6">
//             <div
//               className={`cursor-pointer px-4 py-2 rounded-full ${
//                 category === "All" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//               } m-2`}
//               onClick={() => setCategory("All")}
//             >
//               All
//             </div>
//             {categories &&
//               categories.map((item: any, index: number) => (
//                 <div key={index} className="m-2">
//                   <div
//                     className={`cursor-pointer px-4 py-2 rounded-full ${
//                       category === item.title ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//                     }`}
//                     onClick={() => setCategory(item.title)}
//                   >
//                     {item.title}
//                   </div>
//                 </div>
//               ))}
//           </div>
//           {courses && courses.length === 0 ? (
//             <p className="text-center text-gray-600 dark:text-gray-300">
//               {search
//                 ? "No courses found matching your search."
//                 : "No courses found in this category. Please try another one!"}
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))'}}>
//               {courses &&
//                 courses.map((item: any, index: number) => (
//                   <div key={index} className="w-full">
//                     <CourseCard item={item} />
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;
