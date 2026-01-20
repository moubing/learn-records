import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { memo, useContext, useMemo } from "react";
import {
  CurrentNodeDataContext,
  SetCurrentNodeDataContext,
} from "./CurrentNodeDataProvider";
import NodeDataDisplay from "./NodeDataDisplay";

export const CustomeDrawer = memo(function CustomeDrawer() {
  const currentNodeData = useContext(CurrentNodeDataContext);
  const setCurrentNodeData = useContext(SetCurrentNodeDataContext);

  const open = useMemo(() => {
    return !!currentNodeData;
  }, [currentNodeData]);

  return (
    <Drawer
      open={open}
      onOpenChange={() => setCurrentNodeData(null)}
      direction={"right"}
    >
      <DrawerContent className="w-[310px] p-4 m-4 rounded-l-2xl">
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-sky-500 text-2xl">
              Inspect Panel
            </DrawerTitle>
            <DrawerDescription>
              Complete node details are displayed here.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            {currentNodeData && <NodeDataDisplay node={currentNodeData} />}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});
