"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMointed] = useState(false);

  useEffect(() => {
    setIsMointed(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="Are you sure"
        description={"This action can not be redo"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex space-x-2 flex items-center w-full">
          <Button variant={"outline"} disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={loading}
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { AlertModal };
