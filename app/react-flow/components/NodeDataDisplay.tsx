import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Calendar,
  ChevronRight,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { customNode } from "../types";

const NodeDataDisplay = ({ node }: { node: customNode }) => {
  const { type, data } = node;
  const {
    name,
    primaryLeader,
    secondaryLeader,
    address,
    contact,
    createTime,
    introduction,
    employ,
    children = [],
  } = data;

  // 根据节点类型设置不同的标签
  const getNodeTypeBadge = () => {
    if (!type) return null;

    switch (type) {
      case "primaryNode":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            核心部门
          </Badge>
        );
      case "secondaryNode":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            二级部门
          </Badge>
        );
      case "basicNode":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            基础部门
          </Badge>
        );
      default:
        return null;
    }
  };

  // 格式化员工列表
  const formatEmployees = (employ: string) => {
    return employ
      .split(",")
      .map((emp) => emp.trim())
      .filter((emp) => emp);
  };

  return (
    <Card className="w-full shadow-none border-0 h-[80vh] overflow-auto">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {name}
          </CardTitle>
          {getNodeTypeBadge()}
        </div>

        {/* 部门介绍 */}
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{introduction}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 领导信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-700 mb-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">主要负责人</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {primaryLeader}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-700 mb-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">次要负责人</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {secondaryLeader}
            </p>
          </div>
        </div>

        <Separator />

        {/* 基本信息 */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">基本信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">地址</span>
              </div>
              <p className="text-gray-900">{address}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">联系方式</span>
              </div>
              <a
                href={`mailto:${contact}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {contact}
              </a>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">创建时间</span>
              </div>
              <p className="text-gray-900">{createTime}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Building className="h-4 w-4" />
                <span className="text-sm">员工人数</span>
              </div>
              <p className="text-gray-900">
                {formatEmployees(employ).length} 人
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 员工列表 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">员工列表</h3>
            <span className="text-sm text-gray-500">
              {formatEmployees(employ).length} 人
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {formatEmployees(employ).map((employee, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {employee}
              </Badge>
            ))}
          </div>
        </div>

        {/* 子节点 */}
        {children.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 text-gray-500" />
                <h3 className="text-base font-semibold text-gray-900">
                  下属部门
                </h3>
                <Badge variant="outline">{children.length} 个</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {children.map((child, index) => (
                  <div
                    key={child.id || index}
                    className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <p className="font-medium text-gray-900">
                      {child.data?.name || "未命名部门"}
                    </p>
                    {child.type && (
                      <div className="mt-2">
                        {child.type === "secondaryNode" && (
                          <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                            二级部门
                          </span>
                        )}
                        {child.type === "basicNode" && (
                          <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                            基础部门
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NodeDataDisplay;
