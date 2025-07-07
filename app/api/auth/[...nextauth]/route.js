import { auhtOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

const handler= NextAuth(auhtOptions);

export {handler as GET,handler as POST};