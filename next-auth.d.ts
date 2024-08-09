// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatar: {
        public_id: string;
        url: string;
      };
      role: string;
    };
  }

  interface User {
    _id: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
  }
}
