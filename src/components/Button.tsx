import React from 'react';
import { Button as AntButton, ButtonProps as AdButtonProps } from 'antd';

interface ButtonProps extends AdButtonProps{
    // Add any additional props you need for your Button component
}

export const Button: React.FC<ButtonProps> = (props) => {
    return <AntButton {...props} />;
};

export default Button;