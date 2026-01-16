import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Position, useReactFlow } from "@xyflow/react";
import { Eye, Trash2 } from "lucide-react";
import { memo, useCallback, useContext, useState } from "react";
import { nodeDataType } from "../types";
import { SetCurrentNodeDataContext } from "./CurrentNodeDataProvider";
import { CustomHandle } from "./CustomHandle";

export const PrimaryNode = memo(function PrimaryNode({
  id,
  data,
}: {
  id: string;
  data: nodeDataType;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("default name");
  const setCurrentNodeData = useContext(SetCurrentNodeDataContext);
  console.log("primary rerender");

  const showCurrentNodeData = useCallback(() => {
    setCurrentNodeData(data);
  }, []);

  const reactFlowInstance = useReactFlow();
  const deleteNode = useCallback(() => {
    reactFlowInstance.setNodes((nodes) =>
      nodes.filter((node) => node.id !== id)
    );

    reactFlowInstance.setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, [reactFlowInstance]);

  return (
    <div className="relative px-2 py-1 rounded-[11px] flex items-center justify-center shadow bg-linear-to-r from-[#1911B5] to-[#1957EA] text-white outline-4 outline-[#1890FF30] group">
      <div className="group-hover:opacity-100 opacity-0 transition flex items-center gap-1 absolute -top-12 right-0 text-pink-500 z-50 cursor-default">
        <Button variant={"outline"} size={"icon"} onClick={showCurrentNodeData}>
          <Eye />
        </Button>
        <Button variant={"outline"} size={"icon"} onClick={deleteNode}>
          <Trash2 />
        </Button>
      </div>
      <Button
        className="w-fit bg-transparent hover:bg-transparent cursor-pointer px-3 py-1 relative hover:text-white"
        onClick={() => setIsClicked(true)}
      >
        {name}
        {isClicked && (
          <Input
            autoFocus
            type="text"
            className="px-3 py-1 focus:border-none absolute top-0 left-0 w-full h-full text-white focus-visible:ring-2 focus-visible:ring-pink-500 "
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            onBlur={() => setIsClicked(false)}
          />
        )}
      </Button>
      {data?.enableHandle?.bottom && <CustomHandle type={Position.Bottom} />}
      {data?.enableHandle?.right && <CustomHandle type={Position.Right} />}
      {data?.enableHandle?.left && <CustomHandle type={Position.Left} />}
    </div>
  );
});
