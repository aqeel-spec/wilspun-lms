import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:8000/api/v1/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data.user;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is a valid string
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly cast this to the correct type
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Ensure this is a valid string
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        avatar: token.avatar as any,
        role: token.role as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// console.log(process.env.GOOGLE_CLIENT_ID,'red');
// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || '',
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID || '',
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//         })
//     ],
//   secret: process.env.SECRET,
// }

// export default NextAuth(authOptions);