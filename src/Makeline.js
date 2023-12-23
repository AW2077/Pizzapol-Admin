import { DataContext } from './DataProvider.js';
import React, { useRef, useContext, useEffect, useState} from 'react';
import './Makeline.css'
import { json } from 'react-router-dom';

const Makeline = () =>{
  const { ordersStatus } = useContext(DataContext);
  const ordersInPreparation = ordersStatus.preparation;

    return (
      <div>
      {ordersInPreparation.map((order, index) => (
        <div key={index}>
          <h3>Order {index + 1}</h3>
          <p>Address: {order.address}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.content.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
              <button>✓</button>
            </tbody>
          </table>
        </div>
      ))}
    </div>

      );
}
export default Makeline;
