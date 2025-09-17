// Toast notification utility
export const showToast = (message, type = 'success') => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add styles
  Object.assign(toast.style, {
    position: 'fixed',
    top: '1rem',
    right: '0.5rem',
    background: 'white',
    color: 'black',
    padding: '1rem 1.5rem',
    borderRadius: '0',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 0px 0px, rgba(12, 12, 14, 0.3) 0px 5px 15px -4px',
    zIndex: '9999',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer'
  });

  // Add to DOM
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  });
};

// Confirmation dialog utility
export const showConfirmation = (title, message, onConfirm) => {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  `;

  dialog.innerHTML = `
    <h3 style="margin-bottom: 1rem; color: #000;">${title}</h3>
    <p style="margin-bottom: 2rem; color: #666;">${message}</p>
    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button id="confirm-btn" style="
        background: #000;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 600;
      ">Sí</button>
      <button id="cancel-btn" style="
        background: #e0e0e0;
        color: #000;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 600;
      ">No</button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const confirmBtn = dialog.querySelector('#confirm-btn');
  const cancelBtn = dialog.querySelector('#cancel-btn');

  const cleanup = () => {
    document.body.removeChild(overlay);
  };

  confirmBtn.addEventListener('click', () => {
    cleanup();
    onConfirm();
  });

  cancelBtn.addEventListener('click', cleanup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cleanup();
  });
};
