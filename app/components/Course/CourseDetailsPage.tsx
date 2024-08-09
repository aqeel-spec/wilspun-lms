'use client';

import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
// import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/reduxHooks";
import { setRoute, setOpen } from "@/redux/features/globalSlice";
import { toast } from "react-hot-toast";
import Loader2 from "../Loader/Loader2"; // Suspense fallback loader
import { RootState } from "@/redux/features/store";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { route } = useAppSelector((state: RootState) => state.global);
  const { data, isLoading, refetch } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const { data: userData, isError } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishablekey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data && userData?.user) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, userData, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  const handleSetRoute = (newRoute: string) => {
    dispatch(setRoute(newRoute));
  };

  const handleSetOpen = (isOpen: boolean) => {
    dispatch(setOpen(isOpen));
  };

  // Refetch course details when the route changes
  useEffect(() => {
    if (route === "specific-condition") {
      refetch();
    }
  }, [route, refetch]);

  return (
    <>
      <Suspense fallback={<Loader2 />}>
        <Heading
          title={data?.course?.name + " - ELearning"}
          description={
            "ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"
          }
          keywords={data?.course?.tags}
        />
        {stripePromise && data && userData?.user && (
          <CourseDetails
            data={data.course}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            setRoute={handleSetRoute}
            setOpen={handleSetOpen}
          />
        )}
      </Suspense>
    </>
  );
};

export default CourseDetailsPage;




// import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../Loader/Loader";
// import Heading from "@/app/utils/Heading";
// import Header from "../Header";
// import Footer from "../Footer";
// import CourseDetails from "./CourseDetails";
// import {
//   useCreatePaymentIntentMutation,
//   useGetStripePublishablekeyQuery,
// } from "@/redux/features/orders/ordersApi";
// import { loadStripe } from "@stripe/stripe-js";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

// type Props = {
//   id: string;
// };

// const CourseDetailsPage = ({ id }: Props) => {
//   const [route, setRoute] = useState("Login");
//   const [open, setOpen] = useState(false);
//   const { data, isLoading } = useGetCourseDetailsQuery(id);
//   const { data: config } = useGetStripePublishablekeyQuery({});
//   const [createPaymentIntent, { data: paymentIntentData }] =
//     useCreatePaymentIntentMutation();
//   const { data: userData } = useLoadUserQuery(undefined, {});
//   const [stripePromise, setStripePromise] = useState<any>(null);
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     if (config) {
//       const publishablekey = config?.publishablekey;
//       setStripePromise(loadStripe(publishablekey));
//     }
//     if (data && userData?.user) {
//       const amount = Math.round(data.course.price * 100);
//       createPaymentIntent(amount);
//     }
//   }, [config, data, userData]);

//   useEffect(() => {
//     if (paymentIntentData) {
//       setClientSecret(paymentIntentData?.client_secret);
//     }
//   }, [paymentIntentData]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <Heading
//             title={data.course.name + " - ELearning"}
//             description={
//               "ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"
//             }
//             keywords={data?.course?.tags}
//           />
//           {stripePromise && (
//             <CourseDetails
//               data={data.course}
//               stripePromise={stripePromise}
//               clientSecret={clientSecret}
//               setRoute={setRoute}
//               setOpen={setOpen}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseDetailsPage;
