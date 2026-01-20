import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";
import { customNode } from "../types";

export const CurrentNodeDataContext = createContext<customNode | null>(null);
export const SetCurrentNodeDataContext = createContext<
  Dispatch<SetStateAction<customNode | null>>
>(() => {});

export function CurrentNodeDataProvider({ children }: { children: ReactNode }) {
  const [currentNodeData, CurrentNodeData] = useState<customNode | null>(null);
  return (
    <CurrentNodeDataContext value={currentNodeData}>
      <SetCurrentNodeDataContext value={CurrentNodeData}>
        {children}
      </SetCurrentNodeDataContext>
    </CurrentNodeDataContext>
  );
}
