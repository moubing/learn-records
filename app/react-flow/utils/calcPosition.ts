import { Node } from "@xyflow/react";
import { log } from "console";

interface Position {
  x: number;
  y: number;
}

interface ChildrenConfig {
  connectType: string;
  gap: number;
  parentGap: number;
}

interface NodeData {
  enableHandle: {
    top: boolean;
    right: boolean;
    left: boolean;
    bottom: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  };
  type?: "primaryNode" | "secondaryNode" | "basicNode";
  childrenConfig?: ChildrenConfig;
  children?: Node[];
  [key: string]: unknown;
}

interface ExtendedNode extends Node {
  data: NodeData;
  width?: number;
  height?: number;
}

// 根据节点类型返回对应的尺寸
function getNodeSize(node: ExtendedNode): { width: number; height: number } {
  // 从节点的 data.type 获取节点类型
  const nodeType = node.type || "basicNode"; // 如果没有指定类型，默认使用 basicNode

  switch (nodeType) {
    case "primaryNode":
      return {
        width: 112,
        height: 64,
      };

    case "secondaryNode":
      return {
        width: 160,
        height: 48,
      };

    case "basicNode":
    default:
      return {
        width: 125,
        height: 37,
      };
  }
}

// 计算子节点位置
function calculateChildrenPositions(
  parentNode: ExtendedNode,
  children: ExtendedNode[],
): ExtendedNode[] {
  if (!children.length || !parentNode.data.childrenConfig) {
    return children;
  }

  const { connectType, gap, parentGap } = parentNode.data.childrenConfig;
  const parentSize = getNodeSize(parentNode);
  const parentPosition = parentNode.position;
  console.log(parentNode, "parent node");

  // 获取第一个子节点的尺寸（假设所有子节点尺寸相同）
  const firstChild = children[0];
  const childSize = getNodeSize(firstChild);

  const result: ExtendedNode[] = [];

  switch (connectType) {
    case "bottom-center-->top-center": {
      // 垂直布局，父节点在顶部，子节点在底部
      const totalWidth =
        children.length * childSize.width + (children.length - 1) * gap;
      const startX = parentPosition.x + parentSize.width / 2 - totalWidth / 2;
      console.log(startX, "start x");
      const y = parentPosition.y + parentSize.height + parentGap;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x: startX + index * (childSize.width + gap),
            y,
          },
        });
      });
      break;
    }

    case "top-center-->bottom-center": {
      // 垂直布局，父节点在底部，子节点在顶部
      const totalWidth =
        children.length * childSize.width + (children.length - 1) * gap;
      const startX = parentPosition.x - totalWidth / 2 + childSize.width / 2;
      const y =
        parentPosition.y -
        parentSize.height / 2 -
        childSize.height / 2 -
        parentGap;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x: startX + index * (childSize.width + gap),
            y,
          },
        });
      });
      break;
    }

    case "right-center-->left-center": {
      // 水平布局，父节点在左侧，子节点在右侧
      const totalHeight =
        children.length * childSize.height + (children.length - 1) * gap;
      const startY = parentPosition.y + parentSize.height / 2 - totalHeight / 2;
      const x = parentPosition.x + parentSize.width + parentGap;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x,
            y: startY + index * (childSize.height + gap),
          },
        });
      });
      break;
    }

    case "left-center-->right-center": {
      // 水平布局，父节点在右侧，子节点在左侧
      const totalHeight =
        children.length * childSize.height + (children.length - 1) * gap;
      const startY = parentPosition.y + parentSize.height / 2 - totalHeight / 2;
      const x = parentPosition.x - childSize.width - parentGap;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x,
            y: startY + index * (childSize.height + gap),
          },
        });
      });
      break;
    }

    case "bottom-left-->left-center": {
      // 特殊布局：从父节点底部左侧连接到子节点左侧中间
      const startY = parentPosition.y + parentSize.height + parentGap;
      const x = parentPosition.x + parentSize.width - childSize.width;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x,
            y: startY + index * (childSize.height + gap),
          },
        });
      });
      break;
    }

    case "bottom-right-->left-center": {
      // 特殊布局：从父节点底部右侧连接到子节点左侧中间
      const totalHeight =
        children.length * childSize.height + (children.length - 1) * gap;
      const startY = parentPosition.y - totalHeight / 2 + childSize.height / 2;
      const x =
        parentPosition.x +
        parentSize.width / 2 +
        childSize.width / 2 +
        parentGap;

      children.forEach((child, index) => {
        result.push({
          ...child,
          position: {
            x,
            y: startY + index * (childSize.height + gap),
          },
        });
      });
      break;
    }

    default:
      console.warn(`Unsupported connectType: ${connectType}`);
      return children;
  }

  return result;
}

// 递归计算节点位置
function calculateNodePositionsRecursive(
  node: ExtendedNode,
  startPosition?: Position,
): ExtendedNode {
  // 创建副本以避免修改原对象
  const processedNode = { ...node };

  // 如果有起始位置，则设置该节点的位置
  if (startPosition) {
    processedNode.position = { ...startPosition };
  }

  // 处理子节点
  if (processedNode.data.children && processedNode.data.children.length > 0) {
    const children = processedNode.data.children as ExtendedNode[];

    // 先递归计算子节点（假设它们已经有了基本位置）
    const processedChildren = children.map((child) =>
      calculateNodePositionsRecursive(child, child.position),
    );

    // 然后根据布局规则重新计算子节点的位置
    const positionedChildren = calculateChildrenPositions(
      processedNode,
      processedChildren,
    );

    // 递归处理孙子节点
    const finalChildren = positionedChildren.map((child) => {
      // 如果有子节点，继续递归计算
      if (child.data.children && child.data.children.length > 0) {
        return calculateNodePositionsRecursive(child, child.position);
      }
      return child;
    });

    // 更新节点
    processedNode.data.children = finalChildren;
  }

  return processedNode;
}

// 主函数：计算所有节点的位置
export function calculateNodePositions(nodes: Node[]): Node[] {
  if (!nodes.length) return [];

  const result: Node[] = [];

  // 处理根节点（可能有多个根节点）
  nodes.forEach((node) => {
    const extendedNode = node as ExtendedNode;

    // 设置根节点的起始位置
    const startX = node.position.x;
    const startY = node.position.y;

    const processedNode = calculateNodePositionsRecursive(extendedNode, {
      x: startX,
      y: startY,
    });
    result.push(processedNode);
  });

  return flattenNodeTree(result);
}

// 将嵌套的节点树展平为数组
function flattenNodeTree(nodes: Node[]): Node[] {
  const result: Node[] = [];

  function traverse(node: Node) {
    result.push(node);

    if ((node as ExtendedNode).data.children) {
      (node as ExtendedNode).data.children?.forEach((child) => {
        traverse(child);
      });
    }
  }

  nodes.forEach(traverse);
  return result;
}
