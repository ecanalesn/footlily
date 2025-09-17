# FootLily - Tienda de Calzado React

> Aplicación web desarrollada con React para tienda de calzado con carrito de compras.

---

## 📋 Descripción del Proyecto

**FootLily** es una tienda de calzado moderna que permite a los usuarios navegar por diferentes categorías de productos (botas y zapatillas), añadir productos al carrito y simular una compra completa.

### ✨ Características Principales

- **Interfaz responsive** adaptada a todos los dispositivos
- **Catálogo de productos** con filtrado por categorías
- **Carrito de compras funcional** con persistencia
- **Simulación de pasarela de pago** para portfolio
- **Búsqueda inteligente** de productos
- **Navegación fluida** entre páginas

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, React Router
- **Estilos**: CSS3 con diseño responsive
- **Despliegue**: Netlify

## 📦 Requisitos Previos

- Node.js 18+
- npm o yarn
- Git

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd footlily
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm start
```

### 4. Construir para producción
```bash
npm run build
```

### 5. Probar build localmente
```bash
npx serve -s build -l 3002
```

## 🌐 Despliegue en Netlify

El proyecto está configurado para despliegue automático en Netlify:

1. **Conectar repositorio** a Netlify
2. **Configuración automática**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18
3. **Despliegue automático** en cada push a main

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navigation.js    # Barra de navegación
│   ├── ProductCard.js   # Tarjeta de producto
│   ├── ProductList.js   # Lista de productos
│   └── ShoppingCart.js  # Carrito de compras
├── contexts/            # Contextos de React
│   └── ShoppingCartContext.js # Contexto del carrito
├── pages/               # Páginas principales
│   ├── HomePage.js      # Página de inicio
│   ├── CategoryPage.js  # Página de categoría
│   ├── CartPage.js      # Página del carrito
│   └── SearchPage.js    # Página de búsqueda
├── data/                # Datos estáticos
│   └── products.js      # Datos de productos
├── assets/              # Recursos estáticos
│   └── images/          # Imágenes de productos
└── utils/               # Utilidades
    └── notifications.js # Sistema de notificaciones
```

## 🔧 Configuración

- **React Router**: Rutas configuradas para SPA
- **Responsive Design**: Breakpoints optimizados para móviles y desktop
- **Local Storage**: Persistencia del carrito entre sesiones

---

**Desarrollado por**: Estefanía Canales  
**Fecha**: 16/09/2025