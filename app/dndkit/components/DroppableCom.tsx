"use client";
import { useDroppable } from "@dnd-kit/core";
import DragableCom from "./DragableCom";
import { draggableItemType } from "../types";
import { useMemo } from "react";

const DroppableCom = ({
  id,
  draggableIds,
}: {
  id: string;
  draggableIds: draggableItemType[];
}) => {
  const { isOver, setNodeRef, over } = useDroppable({ id });
  console.log(over, "over");
  console.log(id, "id");

  const color = useMemo(() => {
    if (!isOver || !over) return "gray";
    if (over.id === "A") {
      return "red";
    } else if (over.id === "B") {
      return "blue";
    } else if (over.id === "C") {
      return "green";
    }
  }, [isOver, over]);

  const style = { color };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="size-52 bg-pink-200 rounded-md p-5 flex flex-col gap-5 items-center justify-center text-white"
    >
      DroppableCom {id}
      {draggableIds.map((item) => (
        <DragableCom key={item.id} id={item.id} data={item} />
      ))}
    </div>
  );
};

export default DroppableCom;
