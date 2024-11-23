"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";

import { Store } from "@prisma/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwicherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwicher = ({ className, items = [] }: StoreSwicherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[200px] justify-start", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] py-1 px-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store" />
              <CommandEmpty>No Store Found</CommandEmpty>
              <CommandGroup heading="Stores">
                {formatedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                  >
                    {store.label}
                    <Check
                      className={cn(
                        "w-3 h-3 ml-auto",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                >
                  <CirclePlus className="w-4 h-4" />
                  <span>Create new store</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default StoreSwicher;
