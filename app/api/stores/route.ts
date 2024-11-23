import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[store_post] ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
};
