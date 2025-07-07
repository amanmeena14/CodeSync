import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const auhtOptions ={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks:{
        //Invoked on sucessful signin
        async signIn({profile}){
            //1. connect to database
            await connectDB();
            //check if user exits
            const userExits=await User.findOne({email: profile.email})
            //if not,then add user to database
            if(!userExits){
                const username= profile.name.slice(0,20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            //return true to allow sign in
            return true;
        },
        //modifies the session object
        async session({session}){
            //1. get user from database
            const user =await User.findOne({email: session.user.email}); 
            //2. assign the user id to the session
            session.user.id= user._id.toString();
            //3. return session
            return session;
        }
    }   
}