import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { QuotationProps } from "../rating-filter/Rating.component";
import "./price-filter.component.scss";
function valuetext(value: number) {
  return `${value * 10}`;
}

export default function PriceFilter({
  setFilteredProducts,
  products,
  filteredProducts,
  range,
}: QuotationProps) {
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [priceFiltered, setPriceFiltered] = React.useState<any[]>([]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    const maxVal = +value[1] * (range[1] / 100);

    setValue(newValue as number[]);
    let newFiltered;
    newFiltered = filteredProducts.filter((el: any) => {
      if (el.price <= maxVal) return true;
      return false;
    });

    console.log("newFiltered: ", newFiltered);
    
    // if (priceFiltered.length > filteredProducts.length) {
    //   newFiltered = priceFiltered.filter(
    //     (el: any) =>
    //       el.price >= +value[0] * (range[1] / 100) &&
    //       el.price <= +value[1] * (range[1] / 100)
    //   );
    //   //   console.log(priceFiltered);
    // } else {
    //   console.log("priceFiltered: ", priceFiltered);
    //   console.log("filteredProducts: ", filteredProducts);

    //   newFiltered = filteredProducts.filter(
    //     (el: any) =>
    //       el.price >= +value[0] * (range[1] / 100) &&
    //       el.price <= +value[1] * (range[1] / 100)
    //   );
    // }

    setFilteredProducts(newFiltered);
  };
  useEffect(() => {
    setPriceFiltered(filteredProducts);
  });

  return (
    <div className="price_filter">
      <div>
        {" "}
        <p>{+value[0] * (range[1] / 100)}$</p>
        <p>{+value[1] * (range[1] / 100)}$</p>
      </div>

      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}
