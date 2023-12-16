import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Student from "../../../models/student";
import Faculty from "../../../models/faculty";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
    session: { strategy: "jwt" },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.userRole = user.userRole;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.userRole = token.userRole;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, _req) {
                dbConnect();

                const { email, password, userRole } = credentials;
                let user = null;

                if (userRole === "faculty") {
                    user = await Faculty.findOne({ email });
                } else if (userRole === "student") {
                    user = await Student.findOne({ email });
                }

                if (!user) {
                    throw new Error("Invalid Email!");
                }

                const isPasswordMatched = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordMatched) {
                    throw new Error("Invalid Password!");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
