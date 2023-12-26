import { DataContext } from './DataProvider.js';
import React, { useRef, useContext, useEffect, useState} from 'react';
import './Makeline.css'
import { json } from 'react-router-dom';

const Makeline = () =>{
  // const { ordersStatus } = useContext(DataContext);
  // const ordersInPreparation = ordersStatus.preparation;
  var ordersStatus = JSON.parse(localStorage.getItem('ordersStatus'));
  // var ordersInPreparation = ordersStatus.preparation;

  const [ordersInPreparation, setOrdersInPreparation] = useState(ordersStatus.preparation)

  const updateFirestore = async (orderId) =>{
    const body = {
        district: "Ochota",
        orderId: orderId,
        newStatus: "cooking"
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://changeorderstatus-ovvvjoo5mq-uc.a.run.app");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "https://changeorderstatus-ovvvjoo5mq-uc.a.run.app");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(JSON.parse(xhr.responseText));
        } else {
            console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
        }
    };
    xhr.send(JSON.stringify(body));
  }

  const onOrderReady = (orderId) =>{
    const orderToMove = ordersInPreparation.filter(order => order.orderId === orderId);
    const updatedOrdersInPreparation = ordersInPreparation.filter(order => order.orderId !== orderId);

    // console.log(orderToMove);
    // console.log(updatedOrdersInPreparation);

    var updatedOrdersStatus = ordersStatus;
    updatedOrdersStatus.preparation = updatedOrdersInPreparation;
    updatedOrdersStatus.cooking.push(orderToMove[0]);
    // console.log(updatedOrdersStatus);
    // localStorage.removeItem('ordersStatus');
    localStorage.setItem('ordersStatus', JSON.stringify(updatedOrdersStatus));

    ordersStatus = JSON.parse(localStorage.getItem('ordersStatus'));
    setOrdersInPreparation(ordersStatus.preparation);

    updateFirestore(orderId);
  }

    return (
      <div>
      {ordersInPreparation.map((order, index) => (
        <div key={index}>
          <h3>Order {order.orderId}</h3>
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
            </tbody>
          </table>
          <button onClick={() => onOrderReady(order.orderId)}>✓</button>
        </div>
      ))}
    </div>

      );
}
export default Makeline;
