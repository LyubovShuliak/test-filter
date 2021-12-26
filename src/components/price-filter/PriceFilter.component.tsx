import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import "./price-filter.component.scss";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { filterBy, filterBySelector } from "../../redux/shop/shopSlice";

function valuetext(value: number, rangeValue: number) {
  const price = (value * rangeValue) / 100;
  return price.toFixed();
}

export default function PriceFilter() {
  const selectValue = useAppSelector(filterBySelector);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([0, 1000]);
  const [priceFiltered, setPriceFiltered] = React.useState<any[]>([]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (value[0] < value[1]) {
      dispatch(
        filterBy({
          byPrice: value,
          byRating: selectValue.byRating,
          byCategory: selectValue.byCategory,
        })
      );
    }
  };

  return (
    <div className="price_filter">
      <p className="filter_name">Price</p>
      <div className="price_inputs">
        {" "}
        <input
          type="text"
          className="max-price"
          value={String(value[0])}
          onChange={(e) => {
            if (+e.target.value > value[1]) {
              e.target.classList.add("not_valid");
            } else {
              e.target.classList.remove("not_valid");
              dispatch(
                filterBy({
                  byPrice: [+e.target.value, selectValue.byPrice[1]],
                  byRating: selectValue.byRating,
                  byCategory: selectValue.byCategory,
                })
              );
            }
            setValue([+e.target.value, value[1]]);
          }}
        />
        <input
          type="text"
          className="max-price"
          value={String(value[1])}
          onChange={(e) => {
            if (+e.target.value < value[0]) {
              e.target.classList.add("not_valid");
            } else {
              e.target.classList.remove("not_valid");
              dispatch(
                filterBy({
                  byPrice: [selectValue.byPrice[0], +e.target.value],
                  byRating: selectValue.byRating,
                  byCategory: selectValue.byCategory,
                })
              );
            }
            setValue([value[0], +e.target.value]);
          }}
        />
      </div>
      <Box sx={{ width: 170, margin: "auto" }}>
        <Slider
          getAriaLabel={() => "Price-range"}
          value={value}
          onChange={handleChange}
          min={0}
          max={1000}
        />
      </Box>
    </div>
  );
}
