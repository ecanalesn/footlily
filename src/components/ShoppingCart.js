import { useState } from 'react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { showConfirmation } from '../utils/notifications';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

const ShoppingCart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useShoppingCart();

  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: ''
  });
  const [paymentStep, setPaymentStep] = useState(1); // 1: datos, 2: procesando, 3: confirmación

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    showConfirmation(
      '¿Estás seguro?',
      `Se van a borrar ${totalItems} productos.`,
      () => {
        clearCart();
      }
    );
  };

  const handlePurchase = () => {
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStep(2);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setPaymentStep(3);
    }, 2000);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    clearCart();
    setPaymentStep(1);
    setPaymentData({
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      address: ''
    });
    // Redirigir al inicio de la tienda
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <main className="main-content">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cesta */}
                <path d="M20 30 L20 80 C20 85 24 90 30 90 L70 90 C76 90 80 85 80 80 L80 30" stroke="#000" strokeWidth="3" fill="none"/>
                <path d="M15 30 L85 30" stroke="#000" strokeWidth="3"/>
                <path d="M25 30 L25 20 C25 15 30 10 35 10 L65 10 C70 10 75 15 75 20 L75 30" stroke="#000" strokeWidth="3" fill="none"/>
                
                {/* Cara triste */}
                <circle cx="35" cy="50" r="3" fill="#dc3545"/>
                <circle cx="65" cy="50" r="3" fill="#dc3545"/>
                <path d="M40 70 Q50 60 60 70" stroke="#dc3545" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h3 className="empty-cart-title">Carrito vacío</h3>
            <p className="empty-cart-message">No tienes ningún artículo en tu carrito.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h2 className="main-title">Carrito</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                className="cart-item-image" 
                src={item.image} 
                alt={item.name}
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <button 
                  className="remove-item-text"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Quitar artículo
                </button>
              </div>
              <div className="cart-item-quantity">
                <small>Cantidad</small>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <small>Precio</small>
                <p>{formatPrice(item.price)} €</p>
              </div>
              <div className="cart-item-subtotal">
                <small>Subtotal</small>
                <p>{formatPrice(item.price * item.quantity)} €</p>
              </div>
              <button 
                className="cart-item-remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="cart-actions">
          <div className="cart-actions-left">
            <button 
              className="clear-cart-button"
              onClick={handleClearCart}
            >
              Vaciar carrito
            </button>
          </div>
          <div className="cart-actions-right">
            <div className="cart-total">
              <p>Total:</p>
              <p>{formatPrice(getTotalPrice())} €</p>
            </div>
            <button 
              className="purchase-button"
              onClick={handlePurchase}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Pago */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            {paymentStep === 1 && (
              <div className="payment-form">
                <h3>Datos de Pago</h3>
                <div className="order-summary">
                  <h4>Resumen del Pedido</h4>
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)} €</span>
                    </div>
                  ))}
                  <div className="order-total">
                    <strong>Total: {formatPrice(getTotalPrice())} €</strong>
                  </div>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={paymentData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={paymentData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Dirección de envío</label>
                    <input
                      type="text"
                      name="address"
                      value={paymentData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de vencimiento</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="payment-actions">
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="pay-button">
                      Proceder al Pago
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {paymentStep === 2 && (
              <div className="payment-processing">
                <div className="loading-spinner"></div>
                <h3>Procesando pago...</h3>
                <p>Por favor, espera mientras procesamos tu pago.</p>
              </div>
            )}
            
            {paymentStep === 3 && (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h3>¡Pago realizado con éxito!</h3>
                <p>Tu pedido ha sido procesado correctamente.</p>
                <p className="demo-notice">
                  <small>Esto es sólo una demostración de un proyecto. En una tienda real, aquí recibirías un email de confirmación.</small>
                </p>
                <button 
                  className="continue-button"
                  onClick={handlePaymentComplete}
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ShoppingCart;
