import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";


const Purchases = () => {

  const dispatch = useDispatch();

  const purchases = useSelector(state => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  const getFormatedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <h1>Purchases</h1>
      {
        purchases.map(purchase => (
          <li key={purchase.id}>
            <h4><b>Date:</b> {getFormatedDate(purchase.cart.createdAt)}</h4>
            {purchase.cart.products.map(item => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <p>{item.title} ${item.price} x{item.productsInCart.quantity} 
                {' | '}Total ${item.price * item.productsInCart.quantity}</p>
              </Link>
            ))}
          </li>
        ))
      }
    </div>
  );
};

export default Purchases;