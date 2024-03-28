import { Select, SelectProps } from 'antd';
import React, { useState } from 'react';

interface SearchInputProps {
    onSearch: (query: string) => void;
}

const SearchInput: React.FC<SelectProps> = ({placeholder, onSearch, onChange, options}) => {
    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();
  
    const handleSearch = (newValue: string) => {
      fetch(newValue, setData);
    };
  
    const handleChange = (newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        notFoundContent={null}
        options={options}
      />
    );
  };

export default SearchInput;