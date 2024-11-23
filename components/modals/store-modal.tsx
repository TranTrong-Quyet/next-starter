"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components//ui/button";
import Modal from "@/components/ui/modal";

const formSchema = z.object({
  name: z.string().min(2),
});

const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "My E-commerce Store",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // todo: create Store
    console.log(values);
  };
  return (
    <div>
      <Modal
        title="Create Store"
        description={"Start with the name of your store"}
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div className="">
          <div className="space-y-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your store" {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-x-2 pt-6 flex items-center justify-end w-full">
                  <Button variant={"ghost"} onClick={storeModal.onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StoreModal;
