import { AimOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface GeolocationAutoDetectButtonProps {
  disabled?: boolean;
  onGeolocationDetected: (geolocation: GeolocationPosition) => void;
  onLoading?: () => void;
  onClick?: () => void;
  onError?: PositionErrorCallback;
}

const GeolocationAutoDetectButton = ({
  onClick: onClickProp,
  onLoading,
  onGeolocationDetected,
  onError,
  disabled,
}: GeolocationAutoDetectButtonProps) => {
  const onClick = () => {
    onClickProp?.();
    if (navigator.geolocation) {
      onLoading?.();
      navigator.geolocation.getCurrentPosition(onGeolocationDetected, onError);
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`flex items-center`}
      disabled={disabled}
    >
      Use location
      <AimOutlined />
    </Button>
  );
};

export default GeolocationAutoDetectButton;
