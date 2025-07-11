import connectDB  from "../../../config/db.js";
import Doctor from "../../../model/addDoctor.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      name,
      speciality,
      hospital,
      location,
      status,
      relationship,
      email,
      contact,
      totalValue,
    } = body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return new NextResponse(
        JSON.stringify({ error: "Doctor with this email already exists" }),
        { status: 400 }
      );
    }

    const newDoctor = await Doctor.create({
      name,
      speciality,
      hospital,
      location,
      status,
      relationship,
      email,
      contact,
      totalValue,
    });

    return new NextResponse(JSON.stringify(newDoctor), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
