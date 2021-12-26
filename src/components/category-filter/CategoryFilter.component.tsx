import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useAppDispatch } from "../../app/hooks";

import { filterBy, filterBySelector } from "../../redux/shop/shopSlice";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const names = [
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

const CategoryFilter = () => {
  const theme = useTheme();

  const filteredByCategories = useSelector(filterBySelector);
  const dispatch = useAppDispatch();
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let selectedCategories =
      typeof value === "string" ? value.split(",") : value;

    dispatch(
      filterBy({
        byPrice: filteredByCategories.byPrice,
        byRating: filteredByCategories.byRating,
        byCategory: selectedCategories,
      })
    );
  };
  function getStyles(name: string, filter: readonly string[], theme: Theme) {
    return {
      fontWeight:
        filter.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filteredByCategories.byCategory}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Category"
              placeholder="Select categories..."
            />
          }
          renderValue={(selected) => {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, filteredByCategories.byCategory, theme)}
              sx={[
                {
                  "&.active": {
                    color: "red",
                  },
                },
              ]}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default CategoryFilter;
