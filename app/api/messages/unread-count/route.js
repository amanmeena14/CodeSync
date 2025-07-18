import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic='force-dynamic';

//GET/api/message/unread-count
export const GET =async(request)=>{
    try {
        await connectDB();

        const sessionUser=await getSessionUser();
        if(!sessionUser || !sessionUser.user){
           return new Response(JSON.stringify({message:'User id is required'}),{status: 401})
        }
        
        const {userId}=sessionUser;
        
        const count=await Message.countDocuments({
            recipient: userId,
            read: false
        });

        return new Response(JSON.stringify({count}),{status:200});
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong',{status:500});
    }
}
