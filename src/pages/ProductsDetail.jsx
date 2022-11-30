import { useEffect } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
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
    productsItem.category.id === product.category.id
    && productsItem.id !== product.id)

  // console.log(relatedProducts);

  return (
    <div>
      <h1>{product?.title}</h1>
      <div>
        <Button>Add</Button>
      </div>
      <Row>
        {/* Product's description */}
        <Col lg={9}>
          <img src={product?.productImgs[0]} alt="" className="img-fluid" />
          <p>{product?.description}</p>
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