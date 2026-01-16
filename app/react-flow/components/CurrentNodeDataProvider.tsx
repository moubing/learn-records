import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";
import { nodeDataType } from "../types";

export const CurrentNodeDataContext = createContext<nodeDataType | null>(null);
export const SetCurrentNodeDataContext = createContext<
  Dispatch<SetStateAction<nodeDataType | null>>
>(() => {});

export function CurrentNodeDataProvider({ children }: { children: ReactNode }) {
  const [currentNodeData, CurrentNodeData] = useState<nodeDataType | null>(
    null
  );
  return (
    <CurrentNodeDataContext value={currentNodeData}>
      <SetCurrentNodeDataContext value={CurrentNodeData}>
        {children}
      </SetCurrentNodeDataContext>
    </CurrentNodeDataContext>
  );
}
