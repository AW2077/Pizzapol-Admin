import React, { useEffect, useState, useCallback } from 'react';
import './Makeline.css';
import { useSharedData } from './SharedDataProvider';

const Makeline = () => {
  const [ordersInPreparation, setOrdersInPreparation] = useState([]);
  const { storeName } = useSharedData();

  const fetchOrders = useCallback(async () => {
    try {
      const xhr = new XMLHttpRequest();
      const body = { status: 'preparation', district: storeName };
      xhr.open('POST', 'https://fetchorders-ovvvjoo5mq-uc.a.run.app');
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://fetchorders-ovvvjoo5mq-uc.a.run.app');
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type');
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 201) {
          const ordersData = JSON.parse(xhr.responseText);
          setOrdersInPreparation(ordersData);
        } else {
          console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
        }
      };
      xhr.send(JSON.stringify(body));
    } catch (error) {
      console.log('error fetching orders');
    }
  }, [storeName]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateFirestore = async (orderId) => {
    const body = [
      {
        district: storeName,
        orderId: orderId,
        newStatus: 'cooking',
        driver: ''
      }
    ];

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://changeorderstatus-ovvvjoo5mq-uc.a.run.app');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://changeorderstatus-ovvvjoo5mq-uc.a.run.app');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 201) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
      }
    };
    xhr.send(JSON.stringify(body));
  };

  const onOrderReady = (orderId) => {
    const updatedOrdersInPreparation = ordersInPreparation.filter((order) => order.orderId !== orderId);

    setOrdersInPreparation(updatedOrdersInPreparation);
    updateFirestore(orderId);
  };

console.log(ordersInPreparation)

  return (
    <div className='center'>
      {ordersInPreparation.length === 0 ? (
        <div >
        <h5>No orders in preparation.</h5>
        </div>
      ) : (
        ordersInPreparation.map((order, index) => (
          <div key={index}>
            <h3>Order {order.orderId}</h3>
            <p>
              Address: {order.address.street} {order.address.number}
            </p>
            <p>Customer phone number: {order.address.phone}</p>
            <table className='center'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {order.content.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => onOrderReady(order.orderId)}>✓</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Makeline;
