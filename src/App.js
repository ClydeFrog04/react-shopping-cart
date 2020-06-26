import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import {ProductContext} from "./contexts/ProductContext";
import {CartContext} from "./contexts/CartContext";
import Checkout from "./components/Checkout";

function App() {
    const [products] = useState(data);
    const [cart, setCart] = useState([]);

    //shopping cart persisting on refresh now :] <3
    useEffect(() =>{
        //set initial cart base on localStoreage here
        setCart(JSON.parse(localStorage.getItem("shoppingCart")));
    },[]);

    useEffect(() =>{
        //set local storeage here
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    },[cart]);

    const addItem = item => {
        // add the given item to the cart
        setCart([...cart, item]);
    };
    const removeItem = itemId =>{
        const removedItemCart = cart.filter(item =>{
            if(item.id !== itemId) return item;
        });
        setCart(removedItemCart);
    }

    return (
        <div className="App">
            <ProductContext.Provider value={{products, addItem}}>
                <CartContext.Provider value={{cart, removeItem}}>
                    <Navigation/>

                    {/* Routes */}
                    <Route exact path="/">
                        <Products/>
                    </Route>

                    <Route path="/cart">
                        <ShoppingCart/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout/>
                    </Route>
                </CartContext.Provider>
            </ProductContext.Provider>
        </div>
    );
}

export default App;
