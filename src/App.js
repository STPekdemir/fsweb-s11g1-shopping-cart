import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./context/ProductContext";
import { CartContext } from "./context/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    if (cart.includes(item)) {
      setCart(cart);
    } else {
      setCart([...cart, item]);
    }
  };
  const removeItem = (id) => {
    const newItems = cart.filter((book) => id !== book.id);
    setCart(newItems);
  };

  return (
    <CartContext.Provider value={{ cart, removeItem }}>
      <ProductContext.Provider value={{ products, addItem }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </ProductContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
