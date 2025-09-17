import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(/\s+/);
      const filteredProducts = productsData.filter(product => {
        const productName = product.name.toLowerCase();
        return searchTerms.every(term => productName.includes(term));
      });
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  if (!query.trim()) {
    return (
      <main className="main-content">
        <h2 className="main-title">Búsqueda</h2>
        <p className="main-description">Ingresa un término de búsqueda para encontrar productos.</p>
      </main>
    );
  }

  if (searchResults.length === 0) {
    return (
      <main className="main-content">
        <h2 className="main-title" style={{fontSize: '1rem', textTransform: 'none'}}>No se han encontrado resultados para "{query}"</h2>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h2 className="main-title" style={{fontSize: '1rem', textTransform: 'none'}}>Resultados para "{query}"</h2>
      <div className="products-container">
        {searchResults.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
