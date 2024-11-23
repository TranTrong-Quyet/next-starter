import prismadb from "@/lib/prismadb";
import React from "react";

export interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <>
      <div>this is your sotre name: {store?.name}</div>;
    </>
  );
};

export default DashboardPage;
