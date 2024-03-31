import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { debounce, DebouncedFunc } from "lodash";
import { PlaceLite } from "@/types";
import { getLocationsBySearchString } from "@/frontend/api/location/location";

interface SearchSelectLocationProps {
  isLoading?: boolean;
  onSearch?: (value: string) => void;
  onChange?: (value: PlaceLite) => void;
  onError?: (error: string) => void;
  searchValueOverride?: string;
}

let debouncedFn: DebouncedFunc<any>;

const SearchSelectLocation = ({
  isLoading: isLoadingProp,
  onChange: onChangeProp,
  searchValueOverride,
  onSearch: onSearchProp,
  onError,
}: SearchSelectLocationProps) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );

  const onSearch = (searchValue: string) => {
    onSearchProp?.(searchValue);
    if (!searchValue) return;
    if (debouncedFn) debouncedFn.cancel();
    debouncedFn = debounce(() => {
      setSearchValue(searchValue);
    }, 500);

    debouncedFn();
  };

  const onChange = (value: string) => {
    setSelectedValue(value);
    const place = query.data?.find(
      (place: PlaceLite) => place.place_id === value,
    );
    onChangeProp?.(place!);
  };

  const query = useQuery(
    ["location", searchValue],
    () => getLocationsBySearchString(searchValue!),
    {
      enabled: !!searchValue,
      refetchOnWindowFocus: false,
      retry: false,
      onError: onError,
    },
  );

  const isLoading = isLoadingProp || query.isLoading;
  const shouldShowNotFoundContent =
    searchValue && query.data && query.data.length === 0 && !query.error;

  return (
    <>
      <Select
        showSearch
        value={searchValueOverride || selectedValue}
        placeholder={"Search for a city"}
        defaultActiveFirstOption={false}
        suffixIcon={
          isLoading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : null
        }
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        notFoundContent={shouldShowNotFoundContent ? "no results" : null}
        options={
          query.data
            ? query.data.map((place) => {
                return {
                  value: place.place_id,
                  label: place.display_name,
                };
              })
            : []
        }
        style={{ width: 200 }}
        loading={isLoading}
      />
    </>
  );
};

export default SearchSelectLocation;
