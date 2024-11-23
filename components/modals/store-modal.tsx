"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import toast, { Toaster } from "react-hot-toast";
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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "My E-commerce Store",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", values);

      if (response) {
        toast.success("Create store successfully");
      }
      console.log(response.data);
    } catch (error) {
      toast.error("Error creating store");
      console.log("error posting data from create store form", error);
    } finally {
      setIsLoading(false);
    }
    // create Store
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
                        <Input
                          disabled={isLoading}
                          placeholder="Your store"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-x-2 pt-6 flex items-center justify-end w-full">
                  <Button
                    disabled={isLoading}
                    variant={"ghost"}
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">
                    Continue
                  </Button>
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
