"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import DragableCom from "./components/DragableCom";
import DroppableCom from "./components/DroppableCom";
import { draggableItemType, droppableContainerType } from "./types";
import { CustomContainer } from "@/components/custom/CustomContainer";

const DndkitPage = () => {
  const [droppableContainers, setDroppableContainers] = useState<
    droppableContainerType[]
  >([
    {
      id: "A",
      children: [],
    },
    {
      id: "B",
      children: [],
    },
    {
      id: "C",
      children: [],
    },
  ]);
  const [draggableItems, setDraggableItems] = useState([
    {
      id: "1",
      parentId: "",
    },
    {
      id: "2",
      parentId: "",
    },
    {
      id: "3",
      parentId: "",
    },
  ]);

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e, "event");
    const { over, active } = e;
    const activeTarget = active.data.current as draggableItemType;

    if (over) {
      const overIndex = droppableContainers.findIndex(
        (item) => item.id === over.id
      );
      const overTarget = droppableContainers[overIndex];

      setDraggableItems((pre) => {
        activeTarget.parentId = overTarget.id;
        return pre.filter((item) => item.id !== activeTarget.id);
      });
      setDroppableContainers((pre) => {
        const parentIndex = pre.findIndex(
          (item) => item.id === activeTarget.parentId
        );
        console.log(parentIndex, "parent index");
        return pre.map((item, index) => {
          if (index === overIndex) {
            console.log(activeTarget, "active target");
            return { ...item, children: [...item.children, activeTarget] };
          }
          if (parentIndex !== -1 && parentIndex === index) {
            console.log(item, "item");
            return {
              ...item,
              children: item.children.filter(
                (item) => item.id !== activeTarget.id
              ),
            };
          }
          return item;
        });
      });
    } else {
      if (activeTarget.parentId) {
        setDraggableItems((pre) => [...pre, { ...activeTarget, parentId: "" }]);
        setDroppableContainers((pre) => {
          return pre.map((item) => {
            if (item.id === activeTarget.parentId) {
              return {
                ...item,
                children: item.children.filter(
                  (item) => activeTarget.id !== item.id
                ),
              };
            }
            return item;
          });
        });
      }
    }
  };

  return (
    <CustomContainer>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            {draggableItems.map((item) => (
              <DragableCom key={item.id} id={item.id} data={item} />
            ))}
          </div>
          <div className="flex items-center gap-5">
            {droppableContainers.map((item) => (
              <DroppableCom
                key={item.id}
                id={item.id}
                draggableIds={item.children}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </CustomContainer>
  );
};

export default DndkitPage;
