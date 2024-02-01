import React, { useEffect, useState } from 'react';
import '../styles/EmptyCard.css';

const EmptyCard = ({ country, branch, bench, type, product }) => {
  const [data, setData] = useState({ result: { product: '', subProduct: [] } });

  useEffect(() => {
    const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetProductStatic?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}`;

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error fetching API:', error));
  }, [country, branch, bench, type, product]);

  // Check if data.result is defined before accessing its properties
  const productTitle = data.result ? data.result.product : '';
  const subProducts = data.result ? data.result.subProduct : [];

  return (
    
    <div className="card" id="emptyCard">
      <div className="card-title">{productTitle}</div>
      <ul className="text-list">
        {subProducts.map((subProduct, index) => (
          <li key={index}>
            <div className="hover-container"></div>
            {subProduct}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmptyCard;
