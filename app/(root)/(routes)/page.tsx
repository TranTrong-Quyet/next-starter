"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";

import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";
import { icons } from "lucide-react";
import { useEffect } from "react";

export default function SetUpPage() {
  const { isOpen, onClose, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
