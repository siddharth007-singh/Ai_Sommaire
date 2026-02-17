"use client";

import { deleteSummary } from "@/app/actions/upload-action";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: string;
};

const DeleteCardBtn = ({ id }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteSummary(id);
      toast.success("Summary deleted");
      window.location.reload(); // simple refresh
    } catch (error) {
      toast.error("Failed to delete summary");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1 rounded-md hover:bg-red-100 text-red-600"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
};

export default DeleteCardBtn;
