import prismadb from "@/lib/prismadb";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  const storeId = params.storeId;

  try {
    const body = await req.json();
    const { name } = body;

    const updatedStore = await prismadb.store.update({
      where: {
        id: storeId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    return new NextResponse("Error updating store preferences", {
      status: 404,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  const storeId = params.storeId;
  const { userId } = getAuth(req as NextRequest);

  if (!userId) {
    return new NextResponse("You are not authenticated");
  }
  try {
    await prismadb.store.delete({
      where: {
        id: storeId,
      },
    });
    return NextResponse.json({
      message: "Store deleted successfully",
    });
  } catch (error) {
    return new NextResponse("Error when deleting store", {
      status: 404,
    });
  }
};
