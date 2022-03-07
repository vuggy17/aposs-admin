import React, {useContext} from 'react'

import {StorageContext} from './ProductTable';

export const columnsProduct = [
  {
    title: 'Product',
    dataIndex: 'info',
    key: 'info',
    render: product => {
      return (<div className="flex info__product">
        <img src={product.img} className="w-20 h-20" />
        <div>
          <p className='font-semibold'>{product.name}</p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
        </div>
      </div>)
    }
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: amount => {
      const storage=useContext(StorageContext)
      return <>
        <span>{amount}</span><span style={{color: '#bfbfbf'}}>/{storage}</span>
      </>

    }
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];