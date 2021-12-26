import {QuotationProps} from '../../pages/colection/Colection.component'

const API_URL = "https://fakestoreapi.com/products";

const productsAPI = {
  async fetchAll():Promise<QuotationProps[]> {
    const result = await fetch(`${API_URL}`, { method: "GET" });
    return result.json();
  }
};

export default productsAPI;
