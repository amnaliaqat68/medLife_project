import connectDB from "../../../config/db";
import User from "../../../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!["superAdmin","admin", "dsm"].includes(decoded.role)) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  }

  const { name, email, password, role } = await req.json();

  const exists = await User.findOne({ email });
  if (exists)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role.toLowerCase(),
  });

  return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
}
