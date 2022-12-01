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

  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            cart.map(item => (
              <li key={item.id}>{item.title}</li>
            ))
          }
          <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;