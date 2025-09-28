import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt"
import connectDB from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || ""

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDB()
  const { username, password } = await req.json();
  try {
    if (!username || !password) {
      return NextResponse.json({ message: "You fucked up" }, { status: 400 });
    }
    console.log("Username", username);
    
    const existingUsername = await User.find({username});
    if (!existingUsername) {
      return NextResponse.json(
        { message: "Tu toh hai hi ni" },
        { status: 404 }
      );
    }
    const existingPass = await User.findOne({username});
    if (!existingPass?.password) {
      return NextResponse.json(
        { message: "Password not found for user" },
        { status: 404 }
      );
    }
    const checkPassword = await bcrypt.compare(password, existingPass.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    console.log("usernmae jaan hai", username);
    
     jwt.sign({username, password}, JWT_SECRET, {expiresIn:"1d"})
     return NextResponse.json(
        { message: "Haan meri jaan", data: { username } },
        { status: 200 }
      );

  } catch (error) {
    console.log(error);
  }
};
