import React, { useEffect, useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { GlobalContext } from "../context/GlobalContext";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import avatar from "../../public/assests/avatar.png";

// Dynamic imports for modal components
const CustomModal = dynamic(() => import("../utils/CustomModal"), { ssr: false });
const Login = dynamic(() => import("../components/Auth/Login"), { ssr: false });
const SignUp = dynamic(() => import("../components/Auth/SignUp"), { ssr: false });
const Verification = dynamic(() => import("../components/Auth/Verification"), { ssr: false });
const HeadingSkeleton = dynamic(() => import("./ui/headerSkel"), { ssr: false });

const Header: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { open, setOpen, activeItem, route, setRoute } = globalContext;
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data: session, status } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {
    skip: status !== 'authenticated', // Only fetch user data if authenticated
  });
  const [socialAuth] = useSocialAuthMutation();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const handleScroll = useCallback(() => {
    setActive(window.scrollY > 85);
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      try {
        if (!isLoading && !userData) {
          socialAuth({
            email: session.user.email!,
            name: session.user.name!,
            avatar: session.user.image!,
          });
          refetch();
        }

        if (session && !hasLoggedIn) {
          toast.success("Login Successfully");
          setHasLoggedIn(true);
        }
      } catch (error) {
        toast.error("An error occurred while processing login.");
        console.error("Error during login processing:", error);
      }
    }
  }, [session, userData, isLoading, refetch, socialAuth, hasLoggedIn, status]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      {isLoading ? (
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
                <Link href="/" className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                  Wilpsun LMS
                </Link>
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
                  {userData ? (
                    <Link href="/profile">
                      <Image
                        src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={() => {
                        setOpen(true);
                        setRoute("Login"); // Ensure route is set for opening Login modal
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Mobile sidebar */}
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {userData?.user ? (
                    <Link href="/profile">
                      <Image
                        src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                        alt="User Avatar"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={() => {
                        setOpen(true);
                        setRoute("Login"); // Ensure route is set for opening Login modal
                      }}
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

          {/* Dynamic modals based on the route */}
          {route === "Login" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}

          {route === "Sign-Up" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}

          {route === "Verification" && open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
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

// "use client";
// import React, { useEffect, useState, useContext, useCallback } from "react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import Image from "next/image";
// import { toast } from "react-hot-toast";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
// import { GlobalContext } from "../context/GlobalContext";
// import NavItems from "../utils/NavItems";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";
// import avatar from "../../public/assests/avatar.png";
// import Loader from "../components/Loader/Loader";

// // Dynamic imports for modal components
// const CustomModal = dynamic(() => import("../utils/CustomModal"), { ssr: false });
// const Login = dynamic(() => import("../components/Auth/Login"), { ssr: false });
// const SignUp = dynamic(() => import("../components/Auth/SignUp"), { ssr: false });
// const Verification = dynamic(() => import("../components/Auth/Verification"), { ssr: false });
// const HeadingSkeleton = dynamic(() => import("./ui/headerSkel"), { ssr: false });

// const Header: React.FC = () => {
//   const globalContext = useContext(GlobalContext);

//   if (!globalContext) {
//     throw new Error("GlobalContext must be used within a GlobalProvider");
//   }

//   const { open, setOpen, activeItem, route, setRoute } = globalContext;
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const { data: session, status } = useSession();
//   const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {
//     skip: status !== 'authenticated', // Only fetch user data if authenticated
//   });
//   const [socialAuth] = useSocialAuthMutation();
//   const [hasLoggedIn, setHasLoggedIn] = useState(false);

//   // Memoize handleScroll function
//   const handleScroll = useCallback(() => {
//     setActive(window.scrollY > 85);
//   }, []);

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user) {
//       try {
//         if (!isLoading && !userData) {
//           socialAuth({
//             email: session.user.email!,
//             name: session.user.name!,
//             avatar: session.user.image!,
//           });
//           refetch();
//         }

//         if (session && !hasLoggedIn) {
//           toast.success("Login Successfully");
//           setHasLoggedIn(true);
//         }
//       } catch (error) {
//         toast.error("An error occurred while processing login.");
//         console.error("Error during login processing:", error);
//       }
//     }
//   }, [session, userData, isLoading, refetch, socialAuth, hasLoggedIn, status]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]);

//   const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget.id === "screen") {
//       setOpenSidebar(false);
//     }
//   };

//   return (
//     <>
//     {isLoading ? (
//       <HeadingSkeleton />
//     ) : (
//       <div className="w-full relative">
//         <div
//           className={`${
//             active
//               ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
//               : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
//           }`}
//         >
//           <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
//             <div className="w-full h-[80px] flex items-center justify-between p-3">
//               <Link href="/" className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
//                 Wilpsun LMS
//               </Link>
//               <div className="flex items-center">
//                 <NavItems activeItem={activeItem} isMobile={false} />
//                 <ThemeSwitcher />
//                 <div className="800px:hidden">
//                   <HiOutlineMenuAlt3
//                     size={25}
//                     className="cursor-pointer dark:text-white text-black"
//                     onClick={() => setOpenSidebar(true)}
//                   />
//                 </div>
//                 {userData ? (
//                   <Link href="/profile">
//                     <Image
//                       src={userData?.user.avatar ? userData.user.avatar.url : avatar}
//                       alt="User Avatar"
//                       width={30}
//                       height={30}
//                       className="w-[30px] h-[30px] rounded-full cursor-pointer"
//                       style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
//                     />
//                   </Link>
//                 ) : (
//                   <HiOutlineUserCircle
//                     size={25}
//                     className="hidden 800px:block cursor-pointer dark:text-white text-black"
//                     onClick={() => setOpen(true)}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile sidebar */}
//           {openSidebar && (
//             <div
//               className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
//               onClick={handleClose}
//               id="screen"
//             >
//               <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
//                 <NavItems activeItem={activeItem} isMobile={true} />
//                 {userData?.user ? (
//                   <Link href="/profile">
//                     <Image
//                       src={userData?.user.avatar ? userData.user.avatar.url : avatar}
//                       alt="User Avatar"
//                       width={30}
//                       height={30}
//                       className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
//                       style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
//                     />
//                   </Link>
//                 ) : (
//                   <HiOutlineUserCircle
//                     size={25}
//                     className="hidden 800px:block cursor-pointer dark:text-white text-black"
//                     onClick={() => setOpen(true)}
//                   />
//                 )}
//                 <br />
//                 <br />
//                 <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
//                   Copyright © 2023 ELearning
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Dynamic modals based on the route */}
//         {route === "Login" && open && (
//           <CustomModal
//             open={open}
//             setOpen={setOpen}
//             setRoute={setRoute}
//             activeItem={activeItem}
//             component={Login}
//             refetch={refetch}
//           />
//         )}

//         {route === "Sign-Up" && open && (
//           <CustomModal
//             open={open}
//             setOpen={setOpen}
//             setRoute={setRoute}
//             activeItem={activeItem}
//             component={SignUp}
//           />
//         )}

//         {route === "Verification" && open && (
//           <CustomModal
//             open={open}
//             setOpen={setOpen}
//             setRoute={setRoute}
//             activeItem={activeItem}
//             component={Verification}
//           />
//         )}
//       </div>
//     )}
//   </>
//   );
// };

// export default Header;

