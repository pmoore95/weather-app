import { Input, InputProps as AdInputProps } from 'antd';
import React from 'react';

interface InputProps extends AdInputProps {

}

export const TextField: React.FC<InputProps> = (props) => {
    return (
        <Input {...props} />
    );
};
