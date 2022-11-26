import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterProductsThunk, filterTitleThunk, getProductsThunk } from "../store/slices/products.slice";


const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [ categoriesList, setCategoriesList ] = useState([]);
  const [ inputSearch, setInputSearch ] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategoriesList(res.data.data.categories))
  }, [])

  console.log(categoriesList);

  return (
    <div>
      <h1>Home component</h1>
      {
        categoriesList.map(category => (
          <Button 
          key={category.id} 
          onClick={() => dispatch(filterProductsThunk(category.id))}>
            {category.name}
          </Button>
        ))
      }

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(filterTitleThunk(inputSearch))}
        >
          Search
        </Button>
      </InputGroup>

      {products.map(product => (
        <li key={product.id}>
          <Link to={`/product/${product.id}`}>
            {product.title}
            <img src={product.productImgs[0]} alt="" />
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Home;