import { useEffect, useState } from "react";
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

  const product = productsList.find(products => products.id === Number(id));
  const categoryProduct = productsList.filter(products => 
    products.category.id === product.category.id)

  // console.log(categoryProduct);

  return (
    <div>
      <h1>{product?.title}</h1>
      <img src={product?.productImgs[0]} alt="" />
      {categoryProduct.map(productItemCategory => (
        <li key={productItemCategory.id}>
          <Link to={`/product/${productItemCategory.id}`}>
            {productItemCategory.title}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default ProductsDetail;