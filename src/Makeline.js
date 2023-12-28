import React, { useRef, useContext, useEffect, useState} from 'react';
import './Makeline.css'
import { json } from 'react-router-dom';

const Makeline = () =>{
  const [ordersInPreparation, setOrdersInPreparation] = useState([]);
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () =>{
    // try {
    //     const ordersResponse = await fetch('https://fetchorders-ovvvjoo5mq-uc.a.run.app');
    //     const ordersData = await ordersResponse.json();

    //     setOrdersInPreparation(ordersData.preparation);
    // } catch (error) {
    //     console.log('error fetching orders', error);
    // }

    try{
      const xhr = new XMLHttpRequest();
      const body = {status: "preparation"};
          xhr.open("POST", "https://fetchorders-ovvvjoo5mq-uc.a.run.app");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "https://fetchorders-ovvvjoo5mq-uc.a.run.app");
          xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
          xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
          xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
          
          xhr.onload = () => {
              if (xhr.readyState === 4 && xhr.status === 201) {
                  const ordersData = JSON.parse(xhr.responseText);
                  setOrdersInPreparation(ordersData);
              } else {
                  console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
              }
          };
          xhr.send(JSON.stringify(body));
      
      } catch (error){
        console.log('error fetching orders');
      }
  };



  const updateFirestore = async (orderId) =>{
    const body = [{
        district: "Ochota",
        orderId: orderId,
        newStatus: "cooking",
        driver: ""
    }];

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

    // console.log(updatedOrdersStatus);
    // localStorage.removeItem('ordersStatus');
    setOrdersInPreparation(updatedOrdersInPreparation);
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
