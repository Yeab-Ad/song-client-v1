import { Flex, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

export const SongFilters = ({ filters, onChange }: any) => {
  const [selectedFilter, setSelectedFilter] = useState("title");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // this is to reset the unselected value to empty string or ""
    const updatedFilters = {
      ...Object.keys(filters).reduce((acc, key) => {
        acc[key] = key === selectedFilter ? value : "";
        return acc;
      }, {} as { [key: string]: string }),
    };

    onChange(updatedFilters);
  };

  return (
    <Flex alignItems="center">
      <Input
        placeholder={`Search by ${selectedFilter}`}
        value={filters[selectedFilter]}
        onChange={handleFilterChange}
        borderRight={0}
        borderRightRadius={0}
        width={"full"}
      />
      <Select
        width="150px"
        ml={"-0px"}
        borderLeft={0}
        borderLeftRadius={0}
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
      </Select>
    </Flex>
  );
};
