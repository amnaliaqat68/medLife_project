import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import  connectDB  from "../../../config/db.js";
import User from "../../../model/user.js";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { name, email, password, role } = body;

  // Optional: Prevent multiple superAdmins
  if (role === "superAdmin") {
    const exists = await User.findOne({ role: "superAdmin" });
    if (exists) {
      return NextResponse.json({ error: "SuperAdmin already exists" }, { status: 403 });
    }
  }

  const user = await User.create({ name, email, password, role });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  const res = NextResponse.json({ user: { role: user.role } });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return res;
}
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectDB } from "../../../config/db.js";
// import User from "../../../model/user.js";

// export async function POST(req) {
//   await connectDB();
//   const { name, email, password, role } = await req.json();

//   const exists = await User.findOne({ email });
//   if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 });

//   const newUser = await User.create({ name, email, password, role });

//   const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return NextResponse.json({
//     message: "Signup successful",
//     token,
//     user: { role: newUser.role },
//   });
// }
