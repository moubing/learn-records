import { Input } from "@/components/ui/input";
import { Position, useReactFlow } from "@xyflow/react";
import { memo, useCallback, useContext, useState } from "react";
import { nodeDataType } from "../types";
import { CustomHandle } from "./CustomHandle";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { SetCurrentNodeDataContext } from "./CurrentNodeDataProvider";

export const BasicNode = memo(function BasicNode({
  id,
  data,
}: {
  id: string;
  data: nodeDataType;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState(id);

  const setCurrentNodeData = useContext(SetCurrentNodeDataContext);

  const showCurrentNodeData = useCallback(() => {
    setCurrentNodeData(data);
  }, []);

  console.log("basic rerender");
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
    <div className="relative p-2 rounded-lg w-40 flex items-center justify-center shadow bg-gray-100 text-gray-500 group">
      <div className="group-hover:opacity-100 opacity-0 transition flex items-center gap-1 absolute -top-12 right-0 text-pink-500 z-50 cursor-default">
        <Button variant={"outline"} size={"icon"} onClick={showCurrentNodeData}>
          <Eye />
        </Button>
        <Button variant={"outline"} size={"icon"} onClick={deleteNode}>
          <Trash2 />
        </Button>
      </div>
      <Button
        className="w-fit cursor-pointer px-3 py-1 relative "
        onClick={() => setIsClicked(true)}
        variant="ghost"
      >
        {name}
        {isClicked && (
          <Input
            autoFocus
            type="text"
            className="px-3 py-1 focus:border-none absolute top-0 left-0 w-full h-full focus-visible:ring-2 focus-visible:ring-gray-500"
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
