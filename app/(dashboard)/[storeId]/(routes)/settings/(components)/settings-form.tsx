"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(2),
});

type settingsFormValue = z.infer<typeof formSchema>;

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<settingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const params = useParams();

  const onSubmit = async (data: settingsFormValue) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/stores/${params.storeId}`, data);

      console.log(response.data);
      console.log(data);
      toast.success("Updated Store successfully");
    } catch (error) {
      console.log("Error updating data in client side", error);
      toast.error("Error updating store");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      console.log(`/api/stores/${params.storeId}`);

      await axios.delete(`/api/stores/${params.storeId}`);
      router.push("/");

      toast.success("Store has been deleted successfully");
    } catch (error) {
      console.log("Error deleting store", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={"Settings"} description={"Change Store Preprences"} />
        <Button
          disabled={isLoading}
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Trash className="w-3 h-3" />
        </Button>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {" "}
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingForm;
