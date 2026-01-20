export type nodeDataType = {
  name: string;
  primaryLeader: string;
  secondaryLeader: string;
  address: string;
  contact: string;
  createTime: string;
  introduction: string;
  employ: string;
  enableHandle?: {
    top: boolean;
    right: boolean;
    left: boolean;
    bottom: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  };
  childrenConfig?: {
    connectType: string;
    gap: number;
    parentGap: number;
  };
  children?: customNode[];
};

export type customNode = {
  id: string;
  data: nodeDataType;
  position: { x: number; y: number };
  type: "primaryNode" | "secondaryNode" | "basicNode";
};
