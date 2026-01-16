"use client";
import { CustomContainer } from "@/components/custom/CustomContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionLineType,
  ConnectionMode,
  Controls,
  Edge,
  EdgeChange,
  Handle,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  PanelPosition,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 } from "uuid";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "primaryNode",
  },
  {
    id: "2",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "secondaryNode",
  },
  {
    id: "3",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "basicNode",
  },
];

const initialEdges: Edge[] = [
  // {
  //   id: "n1->n2",
  //   type: "step",
  //   source: "n1",
  //   target: "n2",
  //   label: "hello world",
  // },
  // {
  //   id: "test1",
  //   type: "step",
  //   source: "n1",
  //   target: "n5",
  //   targetHandle: "left",
  //   label: "hello 33432",
  // },
  // {
  //   id: "test3",
  //   type: "step",
  //   source: "n3",
  //   target: "n4",
  //   label: "hello world",
  // },
];

const defaultEdgeOptions = {
  style: {
    stroke: "#ea4899", // 线条颜色
    strokeWidth: 2, // 线条宽度
  },
  type: "smoothstep", // 边类型：default、straight、step、smoothstep
  // 其他配置
  interactionWidth: 20, // 交互区域宽度
  deletable: true, // 是否可删除
  focusable: true, // 是否可聚焦
  selectable: true, // 是否可选择
};

const nodeTypes = {
  primaryNode: PrimaryNode,
  secondaryNode: SecondaryNode,
  basicNode: BasicNode,
} as const;

const panelPosition: PanelPosition = "top-left";
const ReactFlowPage = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const handleNodesChagne = useCallback((changes: NodeChange[]) => {
    setNodes((pre) => applyNodeChanges(changes, pre));
  }, []);

  const handleEdgesChagne = useCallback((changes: EdgeChange[]) => {
    setEdges((pre) => applyEdgeChanges(changes, pre));
  }, []);

  const handleConnect = useCallback((connection: Connection) => {
    setEdges((pre) => addEdge(connection, pre));
  }, []);

  const nodeColor = useCallback((node: Node) => {
    if (node.type === "primaryNode") return "#ea4899";
    if (node.type === "secondaryNode") return "#cefafe";
    if (node.type === "basicNode") return "#6a7282";
    return "#ffffff";
  }, []);

  const [type, setType] = useState("primaryNode");
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [gapX, setGapX] = useState(40);
  const [gapY, setGapY] = useState(20);

  const [enableLfetHandle, setEnableLfetHandle] = useState<
    boolean | "indeterminate"
  >(false);
  const [enableRightHandle, setEnableRightHandle] = useState<
    boolean | "indeterminate"
  >(false);
  const [enableBottomhandle, setenableBottomhandle] = useState<
    boolean | "indeterminate"
  >(false);

  const generateNodes = useCallback(() => {
    const newNodeArr = [] as Node[];
    const startX = -300;
    const startY = -300;

    for (let i = 0; i < count; i++) {
      newNodeArr.push({
        id: v4(),
        position: {
          x: direction === "vertical" ? startX : startX + i * (140 + gapX),
          y: direction === "horizontal" ? startY : startY + i * (60 + gapY),
        },
        data: {
          enableHandle: {
            left: enableLfetHandle,
            right: enableRightHandle,
            bottom: enableBottomhandle,
          },
        } as nodeDataType,
        type,
      } as Node);
    }
    setNodes((pre) => {
      return [...pre, ...newNodeArr];
    });
  }, [
    count,
    direction,
    enableBottomhandle,
    enableLfetHandle,
    enableRightHandle,
    gapX,
    gapY,
    type,
  ]);

  return (
    <CustomContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChagne}
        onEdgesChange={handleEdgesChagne}
        onConnect={handleConnect}
        fitView
        panOnScroll
        connectionMode={ConnectionMode.Loose}
        selectNodesOnDrag
        panOnDrag={false}
        // snapToGrid={true}
        // snapGrid={[25, 25]}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background color="skyblue" variant={BackgroundVariant.Cross} />
        <Controls />
        <MiniMap nodeColor={nodeColor} zoomable pannable />
        <Panel position={panelPosition}>
          <div className="p-6 pt-2 rounded-2xl flex flex-col gap-4 bg-slate-100 text-sky-500 border-2 border-pink-500 border-dashed shadow-lg">
            <div className="font-bold text-pink-500 text-xl">
              Generate data quickly
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-15">type:</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>node type</SelectLabel>
                    <SelectItem value="primaryNode">primary node</SelectItem>
                    <SelectItem value="secondaryNode">
                      secondary node
                    </SelectItem>
                    <SelectItem value="basicNode">basic node</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-15">gap x:</Label>
              <Input
                type="number"
                className="w-[180px]"
                value={gapX}
                onChange={(e) => setGapX(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-15">gap y:</Label>
              <Input
                type="number"
                className="w-[180px]"
                value={gapY}
                onChange={(e) => setGapY(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-15">count:</Label>
              <Input
                type="number"
                className="w-[180px]"
                max={10}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-15">direction:</Label>
              <Select
                value={direction}
                onValueChange={setDirection as () => void}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>direction</SelectLabel>
                    <SelectItem value="horizontal">horizontal</SelectItem>
                    <SelectItem value="vertical">vertical</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator />

            <div className="flex items-center gap-4">
              <Label className="w-15">handle:</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="left"
                  checked={enableLfetHandle}
                  onCheckedChange={setEnableLfetHandle}
                />
                <Label htmlFor="left">left</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="right"
                  checked={enableRightHandle}
                  onCheckedChange={setEnableRightHandle}
                />
                <Label htmlFor="right">right</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="bottom"
                  checked={enableBottomhandle}
                  onCheckedChange={setenableBottomhandle}
                />
                <Label htmlFor="bottom">bottom</Label>
              </div>
            </div>
            <Button onClick={generateNodes}>generate</Button>
          </div>
        </Panel>
      </ReactFlow>
    </CustomContainer>
  );
};

export default ReactFlowPage;

type nodeDataType = {
  enableHandle: {
    right: boolean;
    left: boolean;
    bottom: boolean;
  };
};
function PrimaryNode({ data }: { data: nodeDataType }) {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("default name");

  return (
    <div className="p-2 rounded-lg w-40 flex items-center justify-center shadow bg-pink-100 text-pink-500">
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
            className="px-3 py-1 focus:border-none absolute top-0 left-0 w-full h-full focus-visible:ring-2 focus-visible:ring-pink-500"
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
}

function SecondaryNode({
  data,
}: {
  data: {
    enableHandle: {
      right: boolean;
      left: boolean;
      bottom: boolean;
    };
  };
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("default name");

  return (
    <div className="p-2 rounded-lg w-40 flex items-center justify-center shadow bg-cyan-100 text-cyan-500">
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
            className="px-3 py-1 focus:border-none absolute top-0 left-0 w-full h-full focus-visible:ring-2 focus-visible:ring-cyan-500"
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
}
function BasicNode({
  data,
}: {
  data: {
    enableHandle: {
      right: boolean;
      left: boolean;
      bottom: boolean;
    };
  };
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("default name");

  return (
    <div className="p-2 rounded-lg w-40 flex items-center justify-center shadow bg-gray-100 text-gray-500">
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
}

function CustomHandle({
  type = Position.Left,
}: {
  type: Position.Left | Position.Right | Position.Bottom;
}) {
  return (
    <Handle
      type="source"
      position={type}
      id={type}
      style={{
        background: "none",
        border: "none",
        width: "1em",
        height: "1em",
      }}
    >
      <div
        className={cn(
          "absolute text-lg pointer-events-none size-2 rounded-full",
          {
            "bg-red-500  top-1 left-1": type === Position.Left,
            "bg-indigo-500  bottom-1 left-1": type === Position.Bottom,
            "bg-yellow-500  top-1 right-1": type === Position.Right,
          }
        )}
      ></div>
    </Handle>
  );
}
