import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

const Navigation = () => {
  const { getTotalItems } = useShoppingCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="top-header">
      <div className="header-top">
        <Link to="/" className="logo">
          FOOTLILY
        </Link>
        
        <form className="search-container" onSubmit={handleSearch}>
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        
        <Link 
          to="/cart" 
          className="cart-link"
        >
          <i className="bi bi-cart-fill cart-icon"></i>
          {getTotalItems() > 0 && (
            <span className="cart-count">{getTotalItems()}</span>
          )}
        </Link>
      </div>
      
      <nav className="category-nav">
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          TODOS LOS PRODUCTOS
        </Link>
        
        <Link 
          to="/category/boots" 
          className={`nav-link ${isActive('/category/boots') ? 'active' : ''}`}
        >
          BOTAS
        </Link>
        
        <Link 
          to="/category/sneakers" 
          className={`nav-link ${isActive('/category/sneakers') ? 'active' : ''}`}
        >
          ZAPATILLAS
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
