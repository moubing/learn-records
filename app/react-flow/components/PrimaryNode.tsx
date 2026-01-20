import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { Eye, Trash2 } from "lucide-react";
import { memo, useCallback, useContext } from "react";
import { customNode } from "../types";
import { SetCurrentNodeDataContext } from "./CurrentNodeDataProvider";
import { MultiHandle } from "./CustomHandle";

export const PrimaryNode = memo(function PrimaryNode({
  id,
  data,
  position,
  type,
}: customNode) {
  const setCurrentNodeData = useContext(SetCurrentNodeDataContext);

  const showCurrentNodeData = useCallback(() => {
    setCurrentNodeData({ id, data, position, type });
  }, [data, id, position, setCurrentNodeData, type]);

  const reactFlowInstance = useReactFlow();
  const deleteNode = useCallback(() => {
    reactFlowInstance.setNodes((nodes) =>
      nodes.filter((node) => node.id !== id),
    );

    reactFlowInstance.setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id),
    );
  }, [id, reactFlowInstance]);

  return (
    <div className="relative py-2.5 w-28 h-16 leading-[33px] text-[24px] rounded-[11px] flex items-center justify-center shadow bg-linear-to-r from-[#1911B5] to-[#1957EA] text-white outline-4 outline-[#1890FF30] group">
      <div className="group-hover:opacity-100 opacity-0 transition flex items-center gap-1 absolute -top-12 right-0 text-pink-500 z-50 cursor-default">
        <Button variant={"outline"} size={"icon"} onClick={showCurrentNodeData}>
          <Eye />
        </Button>
        <Button variant={"outline"} size={"icon"} onClick={deleteNode}>
          <Trash2 />
        </Button>
      </div>
      <div className="">{id}</div>
      <MultiHandle data={data} />
    </div>
  );
});
