import { Card } from "antd";
import { LoadingPlaceholder } from "../../../../../components/LoadingPlaceholder";

export const LoadingCardPlaceholder = () => {
  return (
    <Card className="overflow-hidden w-[162px] h-[149px]">
      <LoadingPlaceholder />
    </Card>
  );
};
