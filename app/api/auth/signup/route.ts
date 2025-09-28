
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt"
import connectDB from "@/lib/db";

export const POST = async(req: NextRequest,res:NextResponse) =>{
    await connectDB()
    console.log("Aaya");
    
    const { username, password } = await req.json();
    console.log("Gaya");
    
    try {
        if(!username || !password){
            return NextResponse.json({ message: "You fucked up" }, { status: 400 });
        }
        console.log(username, "username");
        
        const existingUsername = await User.findOne({username});
        console.log("Idhar", existingUsername);
        
        if(existingUsername){
            return NextResponse.json({message:"Username duplicate"}, {status:403})
        }
        
        const salt = await bcrypt.genSalt(10);
        console.log(salt, "Gandhi");
        
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("Nehru", hashedPassword);
        
        const newUser = await User.create({
            username,
            password: hashedPassword
        })
        if(!newUser){
            return NextResponse.json({message:"Kuch to gadbad hai Daya"}, {status:404})
        }
        await newUser.save()
        return NextResponse.json({message:"Kyun re madarchod, ban gaya na, ab chut la"}, {status:200})
        

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"}, {status:500})
        
    }
}