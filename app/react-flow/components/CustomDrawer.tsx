import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { memo, useContext, useMemo } from "react";
import {
  CurrentNodeDataContext,
  SetCurrentNodeDataContext,
} from "./CurrentNodeDataProvider";

export const CustomeDrawer = memo(() => {
  const currentNodeData = useContext(CurrentNodeDataContext);
  const setCurrentNodeData = useContext(SetCurrentNodeDataContext);
  console.log("rerender");
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
          <div>dfksfldskjfl</div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant={"secondary"}>close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
