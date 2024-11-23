"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";

const formSchema = z.object({
  name: z.string().min(2),
});

const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // todo: create Store
    console.log(values);
  };
  return (
    <div>
      <Modal
        title="store modal titlee"
        description={"description"}
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div>This is the children</div>
      </Modal>
    </div>
  );
};

export default StoreModal;
