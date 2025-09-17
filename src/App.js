import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <ShoppingCartProvider>
      <Router>
        <div className="app-wrapper">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </ShoppingCartProvider>
  );
}

export default App;
