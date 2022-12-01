import { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCartThunk, getCartThunk } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  const cart = useSelector(state => state.cart);

  let total = 0
  cart.map(item => (
    total += item.price * item.productsInCart.quantity     
  ))

  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><i className="fa-solid fa-cart-shopping"></i></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            cart.map(item => (
              <li key={item.id}>
                {item.title} {'  $'}
                {item.price} {' x'}
                {item.productsInCart.quantity}
                <p>Sub total: ${item.price * item.productsInCart.quantity}</p>
              </li>
            ))
          }
          <h2>Total ${total}</h2>
          <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;