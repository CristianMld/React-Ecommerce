import { useEffect, useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createProductThunk } from "../store/slices/cart.slice";
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
    productsItem.category.id === product.category.id
    && productsItem.id !== product.id)

  // console.log(relatedProducts);

  const [ number, setNumber ] = useState(1);

  const decrease = () => {
    if (number > 1) {
      setNumber(number-1)
    }
  }

  const addToCart = () => {
    const newProduct = {
      id: product.id,
      quantity: number
    }
    // console.log(newProduct)
    dispatch(createProductThunk(newProduct))
  }

  return (
    <div>
      <h1>{product?.title}</h1>
      <Row>
        {/* Product's description */}
        <Col lg={9}>
          <img src={product?.productImgs[0]} alt="" className="img-fluid" />
          <p>{product?.description}</p>
          <div style={{display: 'flex', gap: '3px'}}>
            <h3 onClick={decrease}><i className="fa-sharp fa-solid fa-square-minus"></i></h3>
            <h3>{number}</h3>
            <h3 onClick={() => setNumber(number+1)}><i className="fa-solid fa-square-plus"></i></h3>
            <h3>${number * product?.price}</h3>
          </div>
          {/* <input required type="text" value={number} onChange={(e) => setNumber(e.target.value)}/> */}
          <Button onClick={addToCart}>Add to cart</Button>
        </Col>

        {/* Related products */}
        <Col lg={3}>
          <h3>Related products:</h3>
          <ListGroup variant="flush">
            {relatedProducts.map(productsItem => (
              <ListGroup.Item key={productsItem.id}>
                <Link to={`/product/${productsItem.id}`}>
                  {productsItem.title}
                  <img src={productsItem?.productImgs[0]} alt="" className="img-fluid" />                
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>

        </Col>
      </Row>
    </div>
  );
};

export default ProductsDetail;