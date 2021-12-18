import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface QuotationProps {
  filtredProducts: any;
  setfiltredProducts: any;
  products: any;
}
export default function Ratings({
  setfiltredProducts,
  products,
}: QuotationProps) {
  const [value, setValue] = React.useState<number | null>(1);

  return (
    <Box
      sx={{
        "& > legend": { mt: 1 },
      }}
    >
      <Typography component="legend">Filter by rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
          setfiltredProducts(
            products.filter(
              (el: any) => newValue !== null && el.rating.rate < newValue
            )
          );
        }}
      />
    </Box>
  );
}
