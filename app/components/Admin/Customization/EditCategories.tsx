import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Loader2 from "../../Loader/Loader2";
import { styles } from "@/app/styles/style";

// Dynamically imported Loader component
const Loader = dynamic(() => import("../../Loader/Loader"), {
  ssr: false,
  loading: () => <Loader2 />,
});

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
        <div className="space-y-4">
          <h1 className={`${styles.title} text-start`}>All Categories</h1>
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
