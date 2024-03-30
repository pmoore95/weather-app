import { LoadingOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import {debounce, DebouncedFunc } from 'lodash';
import { PlaceLite } from '@/types';
import { getLocationsBySearchString } from '@/frontend/api/location/location';

interface SearchSelectLocationProps {
    isLoading?: boolean;
    onSearch?: (value: string) => void;
    onChange?: (value: PlaceLite) => void;
    searchValueOverride?: string
}

const queryClient = new QueryClient();
let debouncedFn: DebouncedFunc<any>;

const SearchSelectLocation = ({isLoading: isLoadingProp, onChange: onChangeProp, searchValueOverride, onSearch: onSearchProp}: SearchSelectLocationProps) => {
    const [searchValue, setSearchValue] = useState<string|undefined>(undefined);
    const [selectedValue, setSelectedValue] = useState<string|undefined>(undefined);
    const shouldShowNotFoundContent = searchValue && queryClient.getQueryData(['location', searchValue]) === undefined;

    const onSearch = (searchValue: string) => {
        onSearchProp?.(searchValue);
        if(!searchValue) return;
        if(debouncedFn) debouncedFn.cancel();
        debouncedFn = debounce(() => {
            setSearchValue(searchValue);
        }, 500);

        debouncedFn();
    };

    const onChange = (value: string) => {
        setSelectedValue(value);
        const place = query.data?.find((place: PlaceLite) => place.place_id === value)
        onChangeProp?.(place!);
    }

    const query = useQuery(['location', searchValue], () => getLocationsBySearchString(searchValue!), {
        enabled: !!searchValue,
        refetchOnWindowFocus: false,
    });

    const isLoading = isLoadingProp || query.isLoading;

    return (
        <Select
            showSearch
            value={searchValueOverride || selectedValue}
            placeholder={'Search for city'}
            defaultActiveFirstOption={false}
            suffixIcon={isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : null}
            filterOption={false}
            onSearch={onSearch}
            onChange={onChange}
            notFoundContent={shouldShowNotFoundContent && (isLoading ? 'Loading...' : 'no results') || null}
            options={query.data ? query.data.map(place => {
                return {
                    value: place.place_id,
                    label: place.display_name,
                }
            }) : []}
            style={{ width: 200}}
            loading={isLoading}
        />
    );
};

export default SearchSelectLocation;