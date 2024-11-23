import React from "react";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex min-h-screen item-center justify-center align-middle px-4 py-12 xl:py-32 m-auto m-y-auto mb-6 bg-slate-200">
        {children}
      </div>
    </>
  );
};
export default Layout;
