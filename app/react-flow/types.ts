export type nodeDataType = {
  name: string;
  primaryLeader: string;
  secondaryLeader: string;
  address: string;
  contact: string;
  createTime: string;
  introduction: string;
  employ: string;
  enableHandle: {
    top: boolean;
    right: boolean;
    left: boolean;
    bottom: boolean;
  };
};
