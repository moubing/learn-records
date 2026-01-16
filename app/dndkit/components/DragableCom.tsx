"use client";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { draggableItemType } from "../types";

const DragableCom = ({ id, data }: { id: string; data: draggableItemType }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
      data,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "px-4 py-2 rounded-md bg-white text-pink-500 ring-yellow-200",
        {
          "ring-2": isDragging,
          "ring-0": !isDragging,
        }
      )}
    >
      DragableCom {id}
    </div>
  );
};

export default DragableCom;
