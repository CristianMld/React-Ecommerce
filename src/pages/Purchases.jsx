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

  return (
    <div>
      <h1>Purchases</h1>
      {
        purchases.map(purchase => (
          <li key={purchase.id}>
            <u>Date:</u> {purchase.cart.createdAt}
            {purchase.cart.products.map(item => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <p>
                  {item.title}
                </p>
              </Link>
            ))}
          </li>
        ))
      }
    </div>
  );
};

export default Purchases;