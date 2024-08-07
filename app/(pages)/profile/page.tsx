// 'use client';

// import React, { FC, useState } from "react";
// import dynamic from 'next/dynamic';
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

// // Dynamic imports for components
// const Protected = dynamic(() => import("../hooks/useProtected"), { ssr: false });
// const Heading = dynamic(() => import("../utils/Heading"), { ssr: false });
// const Profile = dynamic(() => import("../components/Profile/Profile"), { ssr: false });
// type Props = {};

// const Page: FC<Props> = (props) => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(5);
//   const [route, setRoute] = useState("Login");
//   const { user } = useSelector((state: any) => state.auth);

//   return (
//     <div className="min-h-screen">
//       <Protected>
//         <Heading
//           title={`${user?.name} profile - Elearning`}
//           description="ELearning is a platform for students to learn and get help from teachers"
//           keywords="Prograaming, MERN, Redux, Machine Learning"
//         />
//         <Profile user={user} />
//       </Protected>
//     </div>
//   );
// };

// export default Page;
