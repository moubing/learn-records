"use client";
import { CustomContainer } from "@/components/custom/CustomContainer";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  PanelPosition,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { v4 } from "uuid";
import { BasicNode } from "./components/BasicNode";
import { CurrentNodeDataProvider } from "./components/CurrentNodeDataProvider";
import { CustomeDrawer } from "./components/CustomDrawer";
import { PrimaryNode } from "./components/PrimaryNode";
import { SecondaryNode } from "./components/SecondaryNode";
import { nodesWithPositions } from "./constants";
import { nodeDataType } from "./types";

const initialEdges: Edge[] = [
  // {
  //   id: "n1->n2",
  //   type: "step",
  //   source: "n1",
  //   target: "n2",
  //   label: "hello world",
  // },
];

const defaultEdgeOptions = {
  style: {
    stroke: "#94A3C0",
    strokeWidth: 1,
  },
  type: "smoothstep",
  interactionWidth: 20,
  deletable: true,
  focusable: true,
  selectable: true,
};

const nodeTypes = {
  primaryNode: PrimaryNode,
  secondaryNode: SecondaryNode,
  basicNode: BasicNode,
} as const;

const panelPosition: PanelPosition = "top-left";
const ReactFlowPage = () => {
  const [nodes, setNodes] = useState<Node[]>(nodesWithPositions);
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
    if (node.type === "primaryNode") return "#1911B5";
    if (node.type === "secondaryNode") return "#3B85ED";
    if (node.type === "basicNode") return "#E8F4FF";
    return "#ffffff";
  }, []);

  const [type, setType] = useState("primaryNode");
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal",
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
      <CurrentNodeDataProvider>
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
          {/* <Panel position={panelPosition}>
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

              <div className="flex items-center gap-2">
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
          </Panel> */}
        </ReactFlow>
        <CustomeDrawer />
      </CurrentNodeDataProvider>
    </CustomContainer>
  );
};

export default ReactFlowPage;
