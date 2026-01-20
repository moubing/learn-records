import { Handle, Position } from "@xyflow/react";
import { nodeDataType } from "../types";

export function CustomHandle({
  type = Position.Left,
  bottomOffset,
}: {
  type: Position;
  bottomOffset?: "left" | "right";
}) {
  const getStyle = () => {
    switch (type) {
      case Position.Left:
        return {
          left: "-4px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case Position.Right:
        return {
          right: "-4px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case Position.Top:
        return {
          top: "-4px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case Position.Bottom:
        if (bottomOffset === "left") {
          return {
            bottom: "-4px",
            left: "5%",
            transform: "translateX(-50%)",
          };
        }
        if (bottomOffset === "right") {
          return {
            bottom: "-4px",
            right: "5%",
            transform: "translateX(-50%)",
          };
        }
        return {
          bottom: "-4px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      default:
        return {};
    }
  };

  return (
    <Handle
      type="source"
      position={type}
      id={String(type)}
      style={{
        background: "none",
        border: "none",
        width: "1em",
        height: "1em",
        ...getStyle(), // 应用计算后的样式
      }}
    />
  );
}

export function MultiHandle({ data }: { data: nodeDataType }) {
  return (
    <>
      {data?.enableHandle?.top && <CustomHandle type={Position.Top} />}
      {data?.enableHandle?.bottom && <CustomHandle type={Position.Bottom} />}
      {data?.enableHandle?.right && <CustomHandle type={Position.Right} />}
      {data?.enableHandle?.left && <CustomHandle type={Position.Left} />}
      {data?.enableHandle?.bottomLeft && (
        <CustomHandle type={Position.Left} bottomOffset="left" />
      )}
      {data?.enableHandle?.bottomRight && (
        <CustomHandle type={Position.Left} bottomOffset="right" />
      )}
    </>
  );
}
