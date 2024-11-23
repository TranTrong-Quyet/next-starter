import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwicher from "./store.swicher";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

type Props = {};
const NavBar = async (props: Props) => {
  const { userId } = await auth();
  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex px-4 xl:px-8 items-center py-2 min-h-16">
        <StoreSwicher items={stores} />
        <div className="px-2 flex items-center">
          <MainNav className="bg-yellow-300" />
        </div>
        <div className="flex ml-auto items-center space-x-4">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
