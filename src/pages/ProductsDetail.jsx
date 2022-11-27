import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";


const ProductsDetail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const productsList = useSelector(state => state.products);

  const product = productsList.find(productsItem => 
    productsItem.id === Number(id));
  const relatedProducts = productsList.filter(productsItem => 
    productsItem.category.id === product.category.id)

  // console.log(relatedProducts);

  return (
    <div>
      <h1>{product?.title}</h1>
      <img src={product?.productImgs[0]} alt="" />
      <h3>Related products:</h3>
      {relatedProducts.map(productsItem => (
        <li key={productsItem.id}>
          <Link to={`/product/${productsItem.id}`}>
            {productsItem.title}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default ProductsDetail;