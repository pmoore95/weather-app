import { Card, CardProps } from "antd";

type DataUnavailableCardProps = Pick<CardProps, "title">;

export const DataUnavailableCard = ({ title }: DataUnavailableCardProps) => {
  return (
    <Card title={title} className="bg-slate-200">
      <span>
        Data not <br />
        available yet.
      </span>
    </Card>
  );
};
