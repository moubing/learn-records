"use client";

import { CustomContainer } from "@/components/custom/CustomContainer";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useCallback, useState } from "react";

const SortablePage = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<number | string | null>(null);

  const handleDrageStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id);
  }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((pre) => {
        const activeIndex = pre.indexOf(active.id as number);
        const overIndex = pre.indexOf(over.id as number);

        return arrayMove(pre, activeIndex, overIndex);
      });
      setActiveId(null);
    }
  }, []);

  return (
    <CustomContainer>
      <DndContext
        sensors={sensors}
        onDragStart={handleDrageStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4 w-96">
            {items.map((item) => (
              <SortableItem key={item} id={item} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>{activeId && <ShowItem id={activeId} />}</DragOverlay>
      </DndContext>
    </CustomContainer>
  );
};

export default SortablePage;

const SortableItem = ({ id }: { id: number | string }) => {
  const {
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn({
        "opacity-30": isDragging,
      })}
    >
      <ShowItem id={id} />
    </div>
  );
};

const ShowItem = ({ id }: { id: number | string }) => {
  return <div className="p-4 bg-red-200 rounded-lg">sortable item: {id}</div>;
};
