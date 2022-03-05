import React from 'react'

export const columnsProduct = [
    {
      title: 'Product',
      dataIndex: 'info',
      key: 'info',
      render: product => {
        return (<div className="info__product">
          <img src={product.img} className="img__product" />
          <div>
            <p className="name__product">{product.name}</p>
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
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];