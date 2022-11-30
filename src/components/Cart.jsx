import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartThunk } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartThunk())
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
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;