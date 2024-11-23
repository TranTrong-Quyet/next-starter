import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingForm from "./(components)/settings-form";

interface SettingPageProps {
  params: { storeId: string };
}

const SettingPage: React.FC<SettingPageProps> = async ({ params }) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="px-4 lg:px-8 xl:px-10 py-4 xl:py-6">
      <SettingForm initialData={store} />
    </div>
  );
};

export default SettingPage;
