export type draggableItemType = { id: string; parentId: string };
export type droppableContainerType = {
  id: string;
  children: draggableItemType[];
};
