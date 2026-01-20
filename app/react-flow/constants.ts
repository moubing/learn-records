import { Node } from "@xyflow/react";
import { calculateNodePositions } from "./utils/calcPosition";
import { customNode } from "./types";

const exampleNodes: customNode[] = [
  {
    id: "CEO",
    position: { x: 0, y: 0 },
    type: "primaryNode",
    data: {
      name: "CEO",
      primaryLeader: "张明",
      secondaryLeader: "李华",
      address: "总部大楼A座顶层",
      contact: "ceo@company.com",
      createTime: "2015-03-15",
      introduction: "公司最高决策者，负责整体战略规划",
      employ: "张明, 李华, 王磊, 赵婷",
      // 以上的都是属性字段

      enableHandle: {
        // 这个节点要开启那些handle
        top: false,
        right: false,
        left: false,
        bottom: true,
        bottomLeft: false,
        bottomRight: false,
      },
      childrenConfig: {
        connectType: "bottom-center-->top-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
        gap: 47, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
        parentGap: 10, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
      },
      children: [
        {
          id: "CEO办",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "CEO办",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: true,
              left: true,
              bottom: false,
              bottomLeft: true,
              bottomRight: false,
            },
            // 没有children就不会有childrenConfig
            childrenConfig: {
              connectType: "left-center-->right-center",
              gap: 10,
              parentGap: 50,
            },
            children: [
              {
                id: "政企业务组",
                position: { x: 0, y: 0 },
                type: "basicNode",

                data: {
                  name: "政企业务组",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: true,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "行政组",
                position: { x: 0, y: 0 },
                type: "basicNode",

                data: {
                  name: "行政组",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: true,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },

        {
          id: "COO办",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "COO办",
            primaryLeader: "王建国",
            secondaryLeader: "杨晓红",
            address: "总部大楼A座28层",
            contact: "coo-office@company.com",
            createTime: "2017-05-10",
            introduction: "首席运营官办公室，负责日常运营管理",
            employ: "王建国, 杨晓红, 郑强, 马丽, 宋军",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: true,
              left: false,
              bottom: false,
              bottomLeft: true,
              bottomRight: false,
            },
            // 没有children就不会有childrenConfig
            childrenConfig: {
              connectType: "right-center-->left-center",
              gap: 10,
              parentGap: 50,
            },
            children: [
              {
                id: "选址拓展部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "选址拓展部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: true,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "审计监察部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "审计监察部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: true,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: "九机综合办",
    position: { x: 0, y: 170 },
    type: "secondaryNode",
    data: {
      name: "九机综合办",
      primaryLeader: "张明",
      secondaryLeader: "李华",
      address: "总部大楼A座顶层",
      contact: "ceo@company.com",
      createTime: "2015-03-15",
      introduction: "公司最高决策者，负责整体战略规划",
      employ: "张明, 李华, 王磊, 赵婷",
      // 以上的都是属性字段

      enableHandle: {
        // 这个节点要开启那些handle
        top: false,
        right: false,
        left: false,
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
      },
      childrenConfig: {
        connectType: "bottom-center-->top-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
        gap: 20, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
        parentGap: 39, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
      },
      children: [
        {
          id: "苹果小米事业部",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "苹果小米事业部",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: false,
              left: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
            },
            // 没有children就不会有childrenConfig
            childrenConfig: {
              connectType: "bottom-left-->left-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
              gap: 11, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
              parentGap: 13, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
            },
            children: [
              {
                id: "大件产品运营部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "大件产品运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "站外销售部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "站外销售部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "智能部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "智能部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "营销部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "营销部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "线上运营运营部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "线上运营运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
        {
          id: "华为荣耀事业部",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "华为荣耀事业部",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: false,
              left: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
            },
            // 没有children就不会有childrenConfig
            childrenConfig: {
              connectType: "bottom-left-->left-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
              gap: 11, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
              parentGap: 13, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
            },
            children: [
              {
                id: "售后支撑部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "售后支撑部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "售后运营部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "售后运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "大疆售后项目组",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "大疆售后项目组",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
        {
          id: "运营中心",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "运营中心",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: false,
              left: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
            },
            // 没有children就不会有childrenConfig
            childrenConfig: {
              connectType: "bottom-left-->left-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
              gap: 11, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
              parentGap: 13, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
            },
            children: [
              {
                id: "小件产品运营部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "小件产品运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "配件部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "配件部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "采销部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "采销部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "政企销售部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "政企销售部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "贵州采销部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "贵州采销部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
        {
          id: "售后中心",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "华为荣耀事售后中心业部",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: false,
              left: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
            },
            childrenConfig: {
              connectType: "bottom-left-->left-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
              gap: 11, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
              parentGap: 13, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
            },
            children: [
              {
                id: "市场部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "小件产品市场部运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "运营部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "运营部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "呼叫中心",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "呼叫中心",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "靓机部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "靓机部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
        {
          id: "物流中心",
          position: { x: 0, y: 0 },
          type: "secondaryNode",
          data: {
            name: "物流中心",
            primaryLeader: "陈静",
            secondaryLeader: "刘伟",
            address: "总部大楼A座30层",
            contact: "ceo-office@company.com",
            createTime: "2016-08-20",
            introduction: "CEO直属办公室，负责行政与政企业务",
            employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
            enableHandle: {
              // 这个节点要开启那些handle
              top: false,
              right: false,
              left: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
            },
            childrenConfig: {
              connectType: "bottom-left-->left-center", // 父子节点的handle连接方式，bottom-center-->top-center表示从父节点的底部中间位置的节点连接到子节点的顶部中间的位置，我们现在还涉及的连接方式还有left-center-->right-center,right-center->left-center,bottom-left->left-center，目前就涉及这四种，其他咱们先不考虑了，后面在对其他的方式进行实现，所以等会写的代码可拓展性要高，
              gap: 11, // 表示子节点之间有10像素的间距，要根据connectType来决定这个gap是垂直间距还是水平间距
              parentGap: 13, // 表示父节点与子节点的间距， 要根据connectType来决定这个它是垂直间距还是水平间距
            },
            children: [
              {
                id: "仓储部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "仓储部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
              {
                id: "快送部",
                position: { x: 0, y: 0 },
                type: "basicNode",
                data: {
                  name: "快送部",
                  primaryLeader: "陈静",
                  secondaryLeader: "刘伟",
                  address: "总部大楼A座30层",
                  contact: "ceo-office@company.com",
                  createTime: "2016-08-20",
                  introduction: "CEO直属办公室，负责行政与政企业务",
                  employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
                  enableHandle: {
                    // 这个节点要开启那些handle
                    top: false,
                    right: false,
                    left: false,
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: false,
                  },
                  children: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

export const nodesWithPositions = calculateNodePositions(exampleNodes);
console.log(nodesWithPositions, "nodes with postions");

export const initialNodes: Node[] = [
  // CEO - Primary Node (深蓝色)
  {
    id: "CEO",
    position: { x: 400, y: 50 },
    data: {
      name: "CEO",
      primaryLeader: "张明",
      secondaryLeader: "李华",
      address: "总部大楼A座顶层",
      contact: "ceo@company.com",
      createTime: "2015-03-15",
      introduction: "公司最高决策者，负责整体战略规划",
      employ: "张明, 李华, 王磊, 赵婷",
    },
    type: "primaryNode",
  },

  // CEO办 - Secondary Node (稍浅蓝色)
  {
    id: "CEO_Office",
    position: { x: 200, y: 150 },
    data: {
      name: "CEO办",
      primaryLeader: "陈静",
      secondaryLeader: "刘伟",
      address: "总部大楼A座30层",
      contact: "ceo-office@company.com",
      createTime: "2016-08-20",
      introduction: "CEO直属办公室，负责行政与政企业务",
      employ: "陈静, 刘伟, 孙悦, 周涛, 吴芳",
    },
    type: "secondaryNode",
  },

  // COO办 - Secondary Node
  {
    id: "COO_Office",
    position: { x: 400, y: 150 },
    data: {
      name: "COO办",
      primaryLeader: "王建国",
      secondaryLeader: "杨晓红",
      address: "总部大楼A座28层",
      contact: "coo-office@company.com",
      createTime: "2017-05-10",
      introduction: "首席运营官办公室，负责日常运营管理",
      employ: "王建国, 杨晓红, 郑强, 马丽, 宋军",
    },
    type: "secondaryNode",
  },

  // 九机综合办 - Secondary Node
  {
    id: "NineG_Comprehensive_Office",
    position: { x: 600, y: 150 },
    data: {
      name: "九机综合办",
      primaryLeader: "周建国",
      secondaryLeader: "吴美丽",
      address: "总部大楼B座25层",
      contact: "nineg-office@company.com",
      createTime: "2018-02-28",
      introduction: "九机业务综合管理部门",
      employ: "周建国, 吴美丽, 林峰, 韩雪, 秦刚",
    },
    type: "secondaryNode",
  },

  // CEO办下属 - Basic Nodes (最浅色)
  {
    id: "Gov_Business_Group",
    position: { x: 150, y: 250 },
    data: {
      name: "政企业务组",
      primaryLeader: "孙涛",
      secondaryLeader: "李晓芳",
      address: "总部大楼A座29层",
      contact: "gov-business@company.com",
      createTime: "2019-01-15",
      introduction: "负责政府与企业级客户的业务拓展",
      employ: "孙涛, 李晓芳, 赵明, 陈悦, 刘洋",
    },
    type: "basicNode",
  },
  {
    id: "Admin_Group",
    position: { x: 250, y: 250 },
    data: {
      name: "行政组",
      primaryLeader: "钱伟",
      secondaryLeader: "朱琳",
      address: "总部大楼A座30层东区",
      contact: "admin-group@company.com",
      createTime: "2016-11-10",
      introduction: "负责公司日常行政事务管理",
      employ: "钱伟, 朱琳, 黄杰, 高敏, 徐辉",
    },
    type: "basicNode",
  },

  // COO办下属 - Basic Nodes
  {
    id: "Site_Expansion_Department",
    position: { x: 350, y: 250 },
    data: {
      name: "选址拓展部",
      primaryLeader: "郑成功",
      secondaryLeader: "王艳丽",
      address: "总部大楼A座27层",
      contact: "site-expansion@company.com",
      createTime: "2018-07-22",
      introduction: "负责公司业务选址与市场拓展",
      employ: "郑成功, 王艳丽, 周杰, 马晓梅, 刘强",
    },
    type: "basicNode",
  },
  {
    id: "Audit_Supervision_Department",
    position: { x: 450, y: 250 },
    data: {
      name: "审计监察部",
      primaryLeader: "李建国",
      secondaryLeader: "张美丽",
      address: "总部大楼A座26层",
      contact: "audit@company.com",
      createTime: "2017-09-05",
      introduction: "负责公司内部审计与合规监察",
      employ: "李建国, 张美丽, 王刚, 陈燕, 刘飞",
    },
    type: "basicNode",
  },

  // 九机综合办下属 - Basic Nodes (主要部门)
  {
    id: "Apple_Xiaomi_Business_Division",
    position: { x: 550, y: 250 },
    data: {
      name: "苹果小米事业部",
      primaryLeader: "杨明",
      secondaryLeader: "周晓红",
      address: "总部大楼B座24层",
      contact: "apple-xiaomi@company.com",
      createTime: "2019-03-18",
      introduction: "负责苹果与小米产品的业务运营",
      employ: "杨明, 周晓红, 郑涛, 马丽娜, 王军",
    },
    type: "basicNode",
  },
  {
    id: "Huawei_Honor_Business_Division",
    position: { x: 650, y: 250 },
    data: {
      name: "华为荣耀事业部",
      primaryLeader: "赵伟",
      secondaryLeader: "刘芳",
      address: "总部大楼B座23层",
      contact: "huawei-honor@company.com",
      createTime: "2020-05-12",
      introduction: "负责华为与荣耀品牌的产品运营",
      employ: "赵伟, 刘芳, 陈刚, 孙悦, 李强",
    },
    type: "basicNode",
  },

  // 运营中心下属 - Basic Nodes
  {
    id: "Marketing_Department",
    position: { x: 300, y: 350 },
    data: {
      name: "市场部",
      primaryLeader: "孙晓明",
      secondaryLeader: "吴燕",
      address: "总部大楼C座20层",
      contact: "marketing@company.com",
      createTime: "2018-04-10",
      introduction: "负责市场推广与品牌建设",
      employ: "孙晓明, 吴燕, 王磊, 张芳, 刘洋",
    },
    type: "basicNode",
  },
  {
    id: "Operations_Department",
    position: { x: 400, y: 350 },
    data: {
      name: "运营部",
      primaryLeader: "周涛",
      secondaryLeader: "李晓燕",
      address: "总部大楼C座19层",
      contact: "operations@company.com",
      createTime: "2019-06-15",
      introduction: "负责日常业务运营与管理",
      employ: "周涛, 李晓燕, 马强, 赵敏, 陈伟",
    },
    type: "basicNode",
  },

  // 物流中心下属 - Basic Nodes
  {
    id: "Warehouse_Department",
    position: { x: 500, y: 350 },
    data: {
      name: "仓储部",
      primaryLeader: "李刚",
      secondaryLeader: "王美丽",
      address: "物流园区A区",
      contact: "warehouse@company.com",
      createTime: "2017-11-30",
      introduction: "负责货物仓储与库存管理",
      employ: "李刚, 王美丽, 张强, 刘燕, 陈杰",
    },
    type: "basicNode",
  },
  {
    id: "Express_Department",
    position: { x: 600, y: 350 },
    data: {
      name: "快送部",
      primaryLeader: "郑明",
      secondaryLeader: "周芳",
      address: "物流园区B区",
      contact: "express@company.com",
      createTime: "2020-01-20",
      introduction: "负责快速配送与物流服务",
      employ: "郑明, 周芳, 马军, 赵燕, 王强",
    },
    type: "basicNode",
  },

  // 工程资产中心 - Secondary Node
  {
    id: "Engineering_Assets_Center",
    position: { x: 200, y: 450 },
    data: {
      name: "工程资产中心",
      primaryLeader: "陈建国",
      secondaryLeader: "刘美丽",
      address: "总部大楼D座15层",
      contact: "engineering-assets@company.com",
      createTime: "2016-12-05",
      introduction: "负责工程项目建设与资产管理",
      employ: "陈建国, 刘美丽, 张伟, 马燕, 周强",
    },
    type: "secondaryNode",
  },

  // 财务中心 - Secondary Node
  {
    id: "Finance_Center",
    position: { x: 400, y: 450 },
    data: {
      name: "财务中心",
      primaryLeader: "王会计",
      secondaryLeader: "李出纳",
      address: "总部大楼E座10层",
      contact: "finance@company.com",
      createTime: "2015-10-08",
      introduction: "负责公司财务管理与资金运作",
      employ: "王会计, 李出纳, 赵审核, 陈税务, 刘预算",
    },
    type: "secondaryNode",
  },

  // 人力资源中心 - Secondary Node
  {
    id: "HR_Center",
    position: { x: 600, y: 450 },
    data: {
      name: "人力资源中心",
      primaryLeader: "孙人事",
      secondaryLeader: "周招聘",
      address: "总部大楼F座8层",
      contact: "hr@company.com",
      createTime: "2017-03-25",
      introduction: "负责人才招聘、培养与管理",
      employ: "孙人事, 周招聘, 郑薪酬, 马培训, 王绩效",
    },
    type: "secondaryNode",
  },

  // 工程资产中心下属 - Basic Nodes
  {
    id: "Assets_Department",
    position: { x: 150, y: 550 },
    data: {
      name: "资产部",
      primaryLeader: "郑国栋",
      secondaryLeader: "王秀英",
      address: "总部大楼D座14层",
      contact: "assets@company.com",
      createTime: "2019-08-14",
      introduction: "负责公司固定资产管理与维护",
      employ: "郑国栋, 王秀英, 李强, 张敏, 陈伟",
    },
    type: "basicNode",
  },

  // 财务中心下属 - Basic Nodes
  {
    id: "Accounting_Management_Department",
    position: { x: 350, y: 550 },
    data: {
      name: "核算管理部",
      primaryLeader: "周算盘",
      secondaryLeader: "吴账本",
      address: "总部大楼E座9层",
      contact: "accounting@company.com",
      createTime: "2018-09-12",
      introduction: "负责公司财务核算与账务管理",
      employ: "周算盘, 吴账本, 赵审计, 陈报表, 刘复核",
    },
    type: "basicNode",
  },
  {
    id: "Tax_Management_Department",
    position: { x: 450, y: 550 },
    data: {
      name: "税务管理部",
      primaryLeader: "李税官",
      secondaryLeader: "张税员",
      address: "总部大楼E座8层",
      contact: "tax@company.com",
      createTime: "2019-04-20",
      introduction: "负责公司税务筹划与合规申报",
      employ: "李税官, 张税员, 王合规, 陈筹划, 刘申报",
    },
    type: "basicNode",
  },

  // 人力资源中心下属 - Basic Nodes
  {
    id: "Talent_Management_Department",
    position: { x: 550, y: 550 },
    data: {
      name: "人才管理部",
      primaryLeader: "马伯乐",
      secondaryLeader: "钟子期",
      address: "总部大楼F座7层",
      contact: "talent@company.com",
      createTime: "2020-02-18",
      introduction: "负责人才梯队建设与发展规划",
      employ: "马伯乐, 钟子期, 陈猎头, 刘培训, 王发展",
    },
    type: "basicNode",
  },
  {
    id: "Headhunting_Department",
    position: { x: 650, y: 550 },
    data: {
      name: "猎聘部",
      primaryLeader: "雷猎头",
      secondaryLeader: "温推荐",
      address: "总部大楼F座6层",
      contact: "headhunting@company.com",
      createTime: "2019-11-05",
      introduction: "负责高端人才猎聘与引进",
      employ: "雷猎头, 温推荐, 张搜索, 王面试, 陈签约",
    },
    type: "basicNode",
  },
];
