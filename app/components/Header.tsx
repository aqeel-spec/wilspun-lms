"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { FC, useEffect, useState, useCallback } from "react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/features/reduxHooks";
import { setOpen, setRoute } from "@/redux/features/globalSlice";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import avatar from "../../public/assests/avatar.png";
import HeadingSkeleton from "./ui/headerSkel";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";

// Import the type of the avatar image
import type { StaticImageData } from "next/image";
import { RootState } from "@/redux/features/store";
// import type { RootState } from "@/redux/store";

// Dynamically imported components
const NavItems = dynamic(() => import("../utils/NavItems"), { ssr: false });
const CustomModal = dynamic(() => import("../utils/CustomModal"), { ssr: false });
const Login = dynamic(() => import("../components/Auth/Login"), { ssr: false });
const SignUp = dynamic(() => import("../components/Auth/SignUp"), { ssr: false });
const Verification = dynamic(() => import("../components/Auth/Verification"), { ssr: false });

const Header: FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { open, activeItem, route } = useAppSelector((state: RootState) => state.global);
  const { status, data: sessionData } = useSession();
  const [socialAuth] = useSocialAuthMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);

  // Avoid re-authenticating if the user is already logged in
  useEffect(() => {
    if (status === "authenticated" && sessionData?.user && !user) {
      // Map the session user data to your application's user structure
      const userFromSession = {
        email: sessionData.user.email,
        name: sessionData.user.name,
        avatar: {
          url: (sessionData.user as { image?: string }).image || "",  // Safely accessing the `image` property
          public_id: "", // Default public_id if not available
        },
      };
      

      socialAuth(userFromSession)
        .unwrap()
        .then((result) => {
          dispatch(
            userLoggedIn({
              accessToken: result.accessToken,
              user: result.user,
            })
          );
          toast.success("Login Successfully");
        })
        .catch((error) => {
          console.error("Social Auth failed:", error);
        });
    }
  }, [status, sessionData, socialAuth, dispatch, user]);

  // Handle logout or session expiration
  useEffect(() => {
    if (status === "unauthenticated" && user) {
      dispatch(userLoggedOut());
      toast.error("Session expired. Please log in again.");
      signOut(); // Ensure to log out completely
    }
  }, [status, dispatch, user]);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target instanceof HTMLDivElement && e.target.id === "screen") {
        setOpenSidebar(false);
      }
    },
    [setOpenSidebar]
  );

  const handleOpenModal = useCallback(() => {
    dispatch(setOpen(true));
    dispatch(setRoute("Login"));
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? (
        <HeadingSkeleton />
      ) : (
        <div className="w-full relative">
          <div
            className={`${
              active
                ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
            }`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                <div>
                  <Link
                    href="/"
                    className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                  >
                    Wilpsun LMS
                  </Link>
                </div>
                <div className="flex items-center">
                  <NavItems activeItem={activeItem} isMobile={false} />
                  <ThemeSwitcher />
                  <div className="800px:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>
                  {user ? (
                    <Link href="/profile">
                      <Image
                        src={(user.avatar?.url as string) || (avatar as StaticImageData)}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border: activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={handleOpenModal}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* mobile sidebar */}
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {user ? (
                    <Link href="/profile">
                      <Image
                        src={(user.avatar?.url as string) || (avatar as StaticImageData)}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{
                          border: activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={handleOpenModal}
                    />
                  )}
                  <br />
                  <br />
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    Copyright © 2023 ELearning
                  </p>
                </div>
              </div>
            )}
          </div>
          {route === "Login" && open && (
            <CustomModal
              open={open}
              setOpen={(value) => dispatch(setOpen(value))}
              setRoute={(value) => dispatch(setRoute(value))}
              activeItem={activeItem}
              component={Login}
            />
          )}
          {route === "Sign-Up" && open && (
            <CustomModal
              open={open}
              setOpen={(value) => dispatch(setOpen(value))}
              setRoute={(value) => dispatch(setRoute(value))}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
          {route === "Verification" && open && (
            <CustomModal
              open={open}
              setOpen={(value) => dispatch(setOpen(value))}
              setRoute={(value) => dispatch(setRoute(value))}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;




// 'use client';

// import dynamic from "next/dynamic";
// import Link from "next/link";
// import React, { FC, useEffect, useState } from "react";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
// import { toast } from "react-hot-toast";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { useAppSelector, useAppDispatch } from "@/redux/features/reduxHooks";
// import { setOpen, setRoute } from "@/redux/features/globalSlice";
// import avatar from "../../public/assests/avatar.png";
// import HeadingSkeleton from "./ui/headerSkel";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";

// // Dynamically imported components
// const NavItems = dynamic(() => import("../utils/NavItems"), { ssr: false });
// const CustomModal = dynamic(() => import("../utils/CustomModal"), { ssr: false });
// const Login = dynamic(() => import("../components/Auth/Login"), { ssr: false });
// const SignUp = dynamic(() => import("../components/Auth/SignUp"), { ssr: false });
// const Verification = dynamic(() => import("../components/Auth/Verification"), { ssr: false });

// const Header: FC = () => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const dispatch = useAppDispatch();
//   const { token, user } = useAppSelector((state) => state.auth);
//   const { open, activeItem, route } = useAppSelector((state) => state.global);

//   const shouldLoadUser = !!token && !!user;

//   const { data: userData, isLoading, refetch, isUninitialized } = useLoadUserQuery(undefined, {
//     skip: !shouldLoadUser,
//   });

//   const { data: sessionData } = useSession();
//   const [socialAuth, { isSuccess }] = useSocialAuthMutation();
//   const [logout, setLogout] = useState(false);
//   const {} = useLogOutQuery(undefined, {
//     skip: !logout,
//   });

//   useEffect(() => {
//     if (!isLoading && sessionData && !userData) {
//       socialAuth({
//         email: sessionData?.user?.email,
//         name: sessionData?.user?.name,
//         avatar: sessionData?.user?.image,
//       });
//     }
//   }, [sessionData, userData, isLoading, socialAuth]);

//   useEffect(() => {
//     if (sessionData === null && !isLoading && !userData) {
//       setLogout(true);
//     }
//     if (isSuccess && sessionData) {
//       toast.success("Login Successfully");
//       if (!isUninitialized && refetch) {
//         refetch(); // Refetch user data when login is successful
//       }
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setActive(window.scrollY > 85);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleClose = (e: any) => {
//     if (e.target.id === "screen") {
//       setOpenSidebar(false);
//     }
//   };

//   const handleOpenModal = () => {
//     dispatch(setOpen(true));
//     dispatch(setRoute("Login"));
//   };

//   return (
//     <>
//       {isLoading ? (
//         <HeadingSkeleton />
//       ) : (
//         <div className="w-full relative">
//           <div
//             className={`${
//               active
//                 ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
//                 : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
//             }`}
//           >
//             <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
//               <div className="w-full h-[80px] flex items-center justify-between p-3">
//                 <div>
//                   <Link
//                     href="/"
//                     className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
//                   >
//                     Wilpsun LMS
//                   </Link>
//                 </div>
//                 <div className="flex items-center">
//                   <NavItems activeItem={activeItem} isMobile={false} />
//                   <ThemeSwitcher />
//                   {/* only for mobile */}
//                   <div className="800px:hidden">
//                     <HiOutlineMenuAlt3
//                       size={25}
//                       className="cursor-pointer dark:text-white text-black"
//                       onClick={() => setOpenSidebar(true)}
//                     />
//                   </div>
//                   {userData ? (
//                     <Link href="/profile">
//                       <Image
//                         src={userData?.user.avatar ? userData.user.avatar.url : avatar}
//                         alt=""
//                         width={30}
//                         height={30}
//                         className="w-[30px] h-[30px] rounded-full cursor-pointer"
//                         style={{
//                           border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                         }}
//                       />
//                     </Link>
//                   ) : (
//                     <HiOutlineUserCircle
//                       size={25}
//                       className="hidden 800px:block cursor-pointer dark:text-white text-black"
//                       onClick={handleOpenModal}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* mobile sidebar */}
//             {openSidebar && (
//               <div
//                 className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
//                 onClick={handleClose}
//                 id="screen"
//               >
//                 <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
//                   <NavItems activeItem={activeItem} isMobile={true} />
//                   {userData?.user ? (
//                     <Link href="/profile">
//                       <Image
//                         src={userData?.user.avatar ? userData.user.avatar.url : avatar}
//                         alt=""
//                         width={30}
//                         height={30}
//                         className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
//                         style={{
//                           border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                         }}
//                       />
//                     </Link>
//                   ) : (
//                     <HiOutlineUserCircle
//                       size={25}
//                       className="hidden 800px:block cursor-pointer dark:text-white text-black"
//                       onClick={handleOpenModal}
//                     />
//                   )}
//                   <br />
//                   <br />
//                   <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
//                     Copyright © 2023 ELearning
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//           {route === "Login" && open && (
//             <CustomModal
//               open={open}
//               setOpen={(value) => dispatch(setOpen(value))}
//               setRoute={(value) => dispatch(setRoute(value))}
//               activeItem={activeItem}
//               component={Login}
//             />
//           )}
//           {route === "Sign-Up" && open && (
//             <CustomModal
//               open={open}
//               setOpen={(value) => dispatch(setOpen(value))}
//               setRoute={(value) => dispatch(setRoute(value))}
//               activeItem={activeItem}
//               component={SignUp}
//             />
//           )}
//           {route === "Verification" && open && (
//             <CustomModal
//               open={open}
//               setOpen={(value) => dispatch(setOpen(value))}
//               setRoute={(value) => dispatch(setRoute(value))}
//               activeItem={activeItem}
//               component={Verification}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;