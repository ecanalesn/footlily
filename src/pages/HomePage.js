import ProductList from '../components/ProductList';
import { productsData } from '../data/products';

const HomePage = () => (
  <ProductList 
    products={productsData} 
    title="Todos los productos" 
  />
);

export default HomePage;
