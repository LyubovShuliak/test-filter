import { title } from "process";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MediaCard from "../../components/card/Card.component";
import CategoryFilter from "../../components/category-filter/CategoryFilter.component";
import "./collection.component.scss";
import SortComponent from "../../components/sorting/Sort.component";
import Ratings from "../../components/rating-filter/Rating.component";
import Spinner from "../../components/with-spinner/with-spinner.component";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectProducts,
  fetchProducts,
  loading,
  filteredProducts,
} from "../../redux/shop/shopSlice";
import PriceFilter from "../../components/price-filter/PriceFilter.component";

export interface QuotationProps {
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

const CollectionComponent = () => {
  const isLoading = useAppSelector(loading);
  const products = useAppSelector(filteredProducts);
  const dispatch = useAppDispatch();

  const [range, setRange] = useState<any[]>([0, 0]);
  useEffect(() => {
    console.log("dispatch");

    dispatch(fetchProducts());
  }, []);

  return (
    <div className="collection">
      <div className="filters">
        <CategoryFilter />
        <Ratings />
        <PriceFilter  />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="catalog">
          <SortComponent />

          {products.map((el: QuotationProps) => {
            const price = el.price.toFixed(2);

            return (
              <div key={el.id}>
                <MediaCard
                  price={price}
                  image={el.image}
                  description={el.description}
                  title={el.title}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Collection = CollectionComponent;

export default Collection;

// export default Collection;
