import { AimOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import React from 'react';

interface GeolocationAutoDetectButtonProps extends ButtonProps {
    onGeolocationDetected: (geolocation: GeolocationPosition) => void;
    onClick?: () => void;
}

function showPosition(position: any) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude: " + latitude + "\nLongitude: " + longitude);
}

function showError(error: any) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

const GeolocationAutoDetectButton = ({onClick: onClickProp, onGeolocationDetected, className, ...buttonProps}: GeolocationAutoDetectButtonProps) => {
    
    const onClick = () => {
        onClickProp?.();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onGeolocationDetected, showError);
        }
    }

    return (
        <Button onClick={onClick} className={`flex items-center ${className}`} {...buttonProps}>
            Use location
            <AimOutlined />
        </Button>
    );
};

export default GeolocationAutoDetectButton;