import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { PRODUCT_MANAGEMENT } from 'routes/route.config';

import { StorageContext } from './ProductTable';

export const columnsProduct = [
  {
    title: 'Product',
    dataIndex: 'info',
    key: 'info',
    render: product => {
      return (<div className="flex info__product">
        <img src={product.imageUrl} className="w-20 h-20" />
        <div>
          <p className='font-semibold'>
            <Link
              to={`/${PRODUCT_MANAGEMENT}/${product?.name}`}
              state={{ id: product?.setId }}
            >{product.name}</Link>
          </p>
          <p>{product.color}</p>
          <p>{product.size}</p>
        </div>
      </div>)
    }
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: quantity => {
      return <>
        <span>{quantity}</span><span style={{ color: '#bfbfbf' }}>/100</span>
      </>

    }
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];