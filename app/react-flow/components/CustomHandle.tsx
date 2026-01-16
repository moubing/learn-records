import { Handle, Position } from "@xyflow/react";

export function CustomHandle({ type = Position.Left }: { type: Position }) {
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
