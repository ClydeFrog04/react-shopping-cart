import React, {useContext} from 'react';

// Components
import Item from './ShoppingCartItem';
import {CartContext} from "../contexts/CartContext";
import {NavLink} from "react-router-dom";

const ShoppingCart = () => {
    const {cart} = useContext(CartContext);
    const getCartTotal = () => {
        return cart.reduce((acc, value) => {
            return acc + value.price;
        }, 0).toFixed(2);
    };

    return (
        <div className="shopping-cart">
            {cart.map(item => (
                <Item key={item.id} {...item} itemId={item.id}/>
            ))}

            <div className="shopping-cart__checkout">
                <p>Total: ${getCartTotal()}</p>
                <NavLink to="/checkout">
                    <button>Checkout</button>
                </NavLink>
            </div>
        </div>
    );
};

export default ShoppingCart;
