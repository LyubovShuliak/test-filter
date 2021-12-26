import React, { useEffect, useLayoutEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectProducts,
  fetchProducts,
  setSortProducts,
} from "../../redux/shop/shopSlice";

import MenuItem from "@mui/material/MenuItem";
import { QuotationProps } from "../rating-filter/Rating.component";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./sort.component.scss";
const SortComponent = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortProducts(event.target.value));
  };

  return (
    <div className="sort">
      <FormControl
        sx={{ m: 0, width: 300, backgroundColor: "white", height: 56 }}
      >
        <Select
          value={"3"}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={1}> Price from high to low</MenuItem>
          <MenuItem value={2}>Price from low to high</MenuItem>
          <MenuItem value={3}>Ratings </MenuItem>
          <MenuItem value={4}>Popularity</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default SortComponent;
