import { getServerSession } from "next-auth/next";
import { auhtOptions } from "@/utils/authOptions";

export const getSessionUser= async()=>{
    try{
        const session=await getServerSession(auhtOptions);
        if(!session ||!session.user){
            return null;
        }

        return {
            user:session.user,
            userId: session.user.id,
        };
    }
    catch(error){
        console.log(error);
        return null;
    }
};