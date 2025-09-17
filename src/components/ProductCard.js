import { useShoppingCart } from '../contexts/ShoppingCartContext';

const formatPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

const ProductCard = ({ product }) => {
  const { addToCart } = useShoppingCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img 
        className="product-image" 
        src={product.image} 
        alt={product.name}
      />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)} €</p>
        <button 
          className="product-add-button"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
