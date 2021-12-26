import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { filter, filterBy, filterBySelector } from "../../redux/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
export interface QuotationProps {
  filteredProducts: any;
  setFilteredProducts: any;
  products: any;
  range: any;
}
const Ratings = () => {
  const filterSelector = useAppSelector(filterBySelector);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        "& > legend": { mt: 1 },
      }}
    >
      <Typography component="legend">Rating more than</Typography>

      <Rating
        name="simple-controlled"
        value={filterSelector.byRating}
        onChange={(event, newValue) => {
          dispatch(
            filterBy({
              byRating: newValue,
              byCategory: filterSelector.byCategory,
            })
          );
        }}
      />
    </Box>
  );
};
export default Ratings;
