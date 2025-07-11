import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB  from "../../../config/db.js";
import User from "../../../model/user.js";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("❌ Incorrect password");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ message: "Login successful", user });

  // Set token as httpOnly cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}