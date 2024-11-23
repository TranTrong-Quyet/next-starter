import { Button } from "@/components/ui/button";
import { Delete, Trash } from "lucide-react";
import { Separator } from "./separator";

type HeadingProps = {
  title: string;
  description?: String;
};
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <div className="flex justify-between w-full items-center min-h-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 pb-2">{title}</h2>
          <p className="text-slate-700">{description}</p>
        </div>
      </div>
    </>
  );
};
export { Heading };
