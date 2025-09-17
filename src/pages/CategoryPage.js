import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { productsData } from '../data/products';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  const categoryProducts = productsData.filter(
    product => product.category.id === categoryId
  );
  
  const categoryName = categoryProducts.length > 0 
    ? categoryProducts[0].category.name 
    : 'Categoría';

  return (
    <ProductList 
      products={categoryProducts} 
      title={categoryName} 
    />
  );
};

export default CategoryPage;