import { title } from "process";
import React, { useEffect, useState } from "react";
import MediaCard from "../card/Card.component";
import CategoryFilter from "../category-filter/CategoryFilter.component";
import "./collection.component.scss";

import Ratings from "../rating-filter/Rating.component";
interface QuotationProps {
  id: number;
  category: string;
  image: string;
  price: number;
  rating: {
    count: any;
    rate: any;
  };
  title: string;
  description: string;
}

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setfiltredProducts] = useState(products);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const catalog = json;
        setProducts(json);
        setfiltredProducts(json);
      });
  }, []);

  console.log("products: ", products);

  return (
    <div className="collection">
      <div className="filters">
        <CategoryFilter
          products={products}
          filtredProducts={filtredProducts}
          setfiltredProducts={setfiltredProducts}
        />
        <Ratings
          products={products}
          filtredProducts={filtredProducts}
          setfiltredProducts={setfiltredProducts}
        />
      </div>

      <div className="catalog">
        {" "}
        {filtredProducts.map((el: QuotationProps) => {
          const price = el.price.toFixed(2);

          return (
            <MediaCard
              price={price}
              key={el.id}
              image={el.image}
              description={el.description}
              title={el.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
