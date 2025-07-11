import connectDB from "../../../config/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../model/user.js";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role, phone, designation, area } = await req.json();

    // Simple role check without auth (for testing only)
    const allowedRoles = ['dsm', 'sm'];
    if (!allowedRoles.includes(role)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid role' }), { status: 403 });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (omit superUserId for now)
    const newUser = await User.create({
      name,
      email,
      designation,
      area,
      phone,
      password: hashedPassword,
      role,
    });

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
