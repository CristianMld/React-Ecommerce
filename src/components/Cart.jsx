import { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { checkoutCartThunk, deleteProductThunk, getCartThunk } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  const cart = useSelector(state => state.cart);

  let total = 0
  cart.map(item => (
    total += item.price * item.productsInCart.quantity
  ))

  const purchase = () => {
    if (cart) {
      Swal.fire(
        'Purchased!',
        'Thank you for your buy!',
        'success'
      )
    }
    dispatch(checkoutCartThunk())
  }

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><h2><i className="fa-solid fa-cart-shopping"></i></h2></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cart.map(item => (
            <li key={item.id}>
              {item.title} {'  $'}
              {item.price} {' x'}
              {item.productsInCart.quantity}
              <div className="total-and-delete-btn">
                <p>Sub total: ${item.price * item.productsInCart.quantity}</p>
                <button className="delete-btn" onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteProductThunk(item.id))
                      Swal.fire(
                        'Deleted!',
                        'The product has been removed from the cart.',
                        'success'
                      )
                    }
                  })
                }}><i className="fa-sharp fa-solid fa-trash"></i></button>
              </div>
            </li>
          ))
        }
        {total !== 0 && <h2>Total ${total}</h2>}
        {total !== 0 && <Button onClick={purchase}>Checkout</Button>}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;