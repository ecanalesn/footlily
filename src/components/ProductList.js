import ProductCard from './ProductCard';

const ProductList = ({ products, title }) => {
  const getDescription = (title) => {
    switch(title.toLowerCase()) {
      case 'todos los productos':
        return 'Descubre nuestra colección completa de calzado de alta calidad. Desde botas resistentes hasta zapatillas deportivas, encuentra el par perfecto para cada ocasión. Calidad, comodidad y estilo en cada paso.';
      case 'botas':
        return 'Explora nuestra selección de botas diseñadas para resistir cualquier desafío. Desde botas de trabajo hasta elegantes botas casuales, cada par combina durabilidad y estilo. Perfectas para el trabajo, la aventura o el día a día.';
      case 'zapatillas':
        return 'Encuentra las zapatillas perfectas para tu estilo de vida activo. Diseñadas para máxima comodidad y rendimiento, nuestras zapatillas te acompañarán en cada entrenamiento y aventura. Tecnología avanzada y diseño moderno.';
      default:
        return 'Descubre nuestra selección de calzado de alta calidad.';
    }
  };

  return (
    <main className="main-content">
      <h2 className="main-title">{title}</h2>
      {!title.toLowerCase().includes('resultados para') && (
        <p className="main-description">{getDescription(title)}</p>
      )}
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductList;
