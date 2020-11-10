import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FakestoreService } from '../../services';
import ProductListItem from '../product-list-item';

import styles from './product-list.module.css';

const fakestoreService = new FakestoreService();

const ProductList = ({ action }) => {

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action(fakestoreService));
  }, [dispatch, action]);

  if (loading) {
    return (
      <div className={styles.productList}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className={styles.productList}>Error</div>
    );
  }
  
  const list = products.map((item) => {
    return (
      <ProductListItem 
        key={item.id} 
        id={item.id}
        title={item.title} 
        price={item.price} 
        category={item.category}
        description={item.description}
        image={item.image}
      /> 
    );
  });

  return (
    <div className={styles.productList}>
      { list }
    </div>
  );
};

export default ProductList;

