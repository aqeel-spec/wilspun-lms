import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Category = {
  _id: string;
  title: string;
};

const EditCategories: React.FC = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<Category[]>([]);
  const prevSuccessRef = useRef(layoutSuccess);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  useEffect(() => {
    if (prevSuccessRef.current !== layoutSuccess && layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    prevSuccessRef.current = layoutSuccess;

    if (error && "data" in error) {
      toast.error(
        (error as any)?.data?.message || "Failed to update categories"
      );
    }
  }, [layoutSuccess, error, refetch]);

  const handleCategoryChange = (id: string, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const addNewCategory = () => {
    if (
      categories.length === 0 ||
      categories[categories.length - 1].title.trim()
    ) {
      setCategories([...categories, { _id: `${Date.now()}`, title: "" }]);
    } else {
      toast.error("Category title cannot be empty");
    }
  };

  const areCategoriesUnchanged = () =>
    JSON.stringify(data?.layout?.categories || []) ===
    JSON.stringify(categories);

  const isAnyCategoryTitleEmpty = () =>
    categories.some((category) => category.title.trim() === "");

  const handleSaveCategories = async () => {
    if (!areCategoriesUnchanged() && !isAnyCategoryTitleEmpty()) {
      try {
        await editLayout({ type: "Categories", categories }).unwrap();
      } catch {
        toast.error("Failed to update categories");
      }
    }
  };

  return (
    <div className="mt-[75px] sm:max-w-[50%] md:max-w-[90%] lg:max-w-[95%] mx-auto flex flex-col text-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="  space-y-4">
          <h1 className={`${styles.title}  text-start`}>All Categories</h1>
          {/* Scrollable list of existing categories */}
          <div className="max-h-[400px] overflow-y-auto w-full">
            {categories.map((item, index) => (
              <div className="pl-8 pt-1" key={item._id}>
                <div className="flex items-center space-x-4">
                  <input
                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoryChange(item._id, e.target.value)
                    }
                    placeholder="Enter category title..."
                  />
                  <AiOutlineDelete
                    className="text-black dark:text-white text-[18px] cursor-pointer ml-2"
                    onClick={() =>
                      setCategories((prevCategories) =>
                        prevCategories.filter(
                          (category) => category._id !== item._id
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex space-y-4 max-w-[40%] items-center justify-start ml-8">
        <div className="flex  items-center pt-6 item-start ">
          <div className="w-fit mr-10 flex justify-center ">
            <IoMdAddCircleOutline
              className="text-black dark:text-white text-[25px] cursor-pointer"
              onClick={addNewCategory}
            />
          </div>
          <button
            className={`${
              styles.button
            } !w-[100px] ml-20 !h-[40px] !min-h-[40px] !rounded
              ${
                areCategoriesUnchanged() || isAnyCategoryTitleEmpty()
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }
              `}
            onClick={handleSaveCategories}
            disabled={areCategoriesUnchanged() || isAnyCategoryTitleEmpty()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;

// import React, { useEffect, useState, useRef } from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast } from "react-hot-toast";
// import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";

// type Category = {
//   _id: string;
//   title: string;
// };

// type Props = {};

// const EditCategories: React.FC<Props> = () => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
//     refetchOnMountOrArgChange: true,
//   });
//   const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const prevSuccessRef = useRef(layoutSuccess);
//   useEffect(() => {
//     if (data?.layout?.categories) {
//       setCategories(data.layout.categories);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (prevSuccessRef.current !== layoutSuccess && layoutSuccess) {
//       refetch();
//       toast.success("Categories updated successfully");
//     }
//     prevSuccessRef.current = layoutSuccess;

//     if (error && "data" in error) {
//       const errorData = error as any;
//       toast.error(errorData?.data?.message || "Failed to update categories");
//     }
//   }, [layoutSuccess, error, refetch]);

//   const handleCategoriesAdd = (id: string, value: string) => {
//     setCategories((prevCategory) =>
//       prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };

//   const newCategoriesHandler = () => {
//     try {
//       if (categories.length > 0 && categories[categories.length - 1].title === "") {
//         toast.error("Category title cannot be empty");
//       } else {
//         setCategories((prevCategory) => [
//           ...prevCategory,
//           { _id: `${Date.now()}`, title: "" },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error adding new category:", error);
//       toast.error("An error occurred while adding a new category. Please try again.");
//     }
//   };

//   const areCategoriesUnchanged = (originalCategories: Category[], newCategories: Category[]) => {
//     return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
//   };

//   const isAnyCategoryTitleEmpty = (categories: Category[]) => {
//     return categories.some((category) => category.title.trim() === "");
//   };

//   const editCategoriesHandler = async () => {
//     console.log("Attempting to edit categories:", categories); // Debugging
//     if (
//       !areCategoriesUnchanged(data?.layout?.categories || [], categories) &&
//       !isAnyCategoryTitleEmpty(categories)
//     ) {
//       try {
//         const result = await editLayout({
//           type: "Categories",
//           categories,
//         }).unwrap();
//       } catch (err) {
//         console.error("Failed to update categories:", err);
//         toast.error("Failed to update categories");
//       }
//     } else {
//       console.log("No changes made or a category title is empty"); // Debugging
//     }
//   };

//   return (

//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[120px] text-center">
//           <h1 className={`${styles.title}`}>All Categories</h1>
//           {categories.map((item, index) => (
//             <div className="p-3" key={index}>
//               <div className="flex items-center w-full justify-center">
//                 <input
//                   className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
//                   value={item.title}
//                   onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
//                   placeholder="Enter category title..."
//                 />
//                 <AiOutlineDelete
//                   className="dark:text-white text-black text-[18px] cursor-pointer"
//                   onClick={() =>
//                     setCategories((prevCategory) =>
//                       prevCategory.filter((i) => i._id !== item._id)
//                     )
//                   }
//                 />
//               </div>
//             </div>
//           ))}
//           <br />
//           <br />
//           <div className="w-full flex justify-center">
//             <IoMdAddCircleOutline
//               className="dark:text-white text-black text-[25px] cursor-pointer"
//               onClick={newCategoriesHandler}
//             />
//           </div>
//           <div
//             className={`${
//               styles.button
//             } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
//             ${
//               areCategoriesUnchanged(data?.layout?.categories || [], categories) ||
//               isAnyCategoryTitleEmpty(categories)
//                 ? "!cursor-not-allowed"
//                 : "!cursor-pointer !bg-[#42d383]"
//             }
//             !rounded absolute bottom-12 right-12`}
//             onClick={
//               areCategoriesUnchanged(data?.layout?.categories || [], categories) ||
//               isAnyCategoryTitleEmpty(categories)
//                 ? () => null
//                 : editCategoriesHandler
//             }
//           >
//             Save
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditCategories;
