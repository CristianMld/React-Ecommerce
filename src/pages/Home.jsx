import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterProductsThunk, filterTitleThunk, getProductsThunk } from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [categoriesList, setCategoriesList] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategoriesList(res.data.data.categories))
  }, [])

  // console.log(categoriesList);
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <Row>
        {/* Categories */}
        <Col lg={3}>
          <ListGroup>
            {
              categoriesList.map(category => (
                <ListGroup.Item
                  key={category.id}
                  onClick={() => dispatch(filterProductsThunk(category.id))}
                  style={{ cursor: 'pointer' }}>
                  {category.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>

        {/* Products */}
        <Col lg={9}>
          <h1>Welcome!</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="look for a product..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(capitalizeFirstLetter(e.target.value))}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterTitleThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <Card>
                  <Link 
                    to={`/product/${product.id}`}
                    style={{textDecoration: 'none'}}>
                    <Card.Img
                      variant="top"
                      src={product.productImgs[0]}
                      style={{ height: 200, objectFit: 'contain' }} />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        {product.description}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default Home;