import Auth0Provider from "next-auth/providers/auth0";
import NextAuth, { NextAuthOptions } from "next-auth"
//import { prisma } from "../../../lib/prisma"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
const clientId: any = process.env.CLIENT_ID
const clientSecret: any = process.env.CLIENT_SECRET
const issuer: any = process.env.ISSUER

const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Auth0Provider({
            clientId,
            clientSecret,
            issuer
        }),

    ],
    theme: {
        colorScheme: "dark",
    },
    callbacks: {
        async session({ session, token, user }) {
            const myUser: any = user
            const myse: any = session
            myse.user.role = myUser.role
            return myse;
        }
    },

}

export default NextAuth(authOptions)



