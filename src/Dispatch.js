import React, { useEffect, useState, useCallback } from 'react';
import './Dispatch.css';
import { useSharedData } from './SharedDataProvider';

const Dispatch = () => {
  const { storeName } = useSharedData();

  const [ordersReady, setOrdersReady] = useState([]);
  const [ordersInDelivery, setOrdersInDelivery] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [driver, setDriver] = useState('');

  const [driversOnTheRoad, setDriverOnTheRoad] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);

  const fetchOrders = useCallback(async (status) => {
    try {
      const xhr = new XMLHttpRequest();
      const body = { status: status, district: storeName };
      xhr.open('POST', 'https://fetchorders-ovvvjoo5mq-uc.a.run.app');
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://fetchorders-ovvvjoo5mq-uc.a.run.app');
      xhr.setRequestHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type');
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 201) {
          const ordersData = JSON.parse(xhr.responseText);
          if (status === 'cooking') {
            setOrdersReady(ordersData);
          }
          if (status === 'delivery') {
            setOrdersInDelivery(ordersData);
          }
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
    setAllDrivers(['Adam', 'Marek', 'Staś']);
    setAvailableDrivers(['Adam', 'Marek', 'Staś']);
    setDriver('Adam');
    fetchOrders('cooking');
    fetchOrders('delivery');
  }, [fetchOrders]);

  const updateFirestore = async (orders, status) => {
    const body = [];
    orders.forEach((element) => {
      body.push({
        district: storeName,
        orderId: element.orderId,
        newStatus: status,
        driver: element.driver
      });
      console.log(element);
    });

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

  const handleOrderClick = (order, index) => {
    const updatedSelectedOrders = [...selectedOrders];

    if (selectedOrders.includes(order)) {
      updatedSelectedOrders.splice(index, 1);
    } else {
      updatedSelectedOrders.push(order);
    }

    setSelectedOrders(updatedSelectedOrders);
  };

  const handleDriverChange = (event) => {
    setDriver(event.target.value);
  };

  const dispatchTheDriver = () => {
    const obj = document.getElementById('driverChosen');
    const driverChosen = obj.options[obj.selectedIndex].text;

    if (selectedOrders.length === 0) {
      alert('Select at least one order!');
      return;
    }
    if (driversOnTheRoad.includes(driverChosen)) {
      alert('Driver already on the road!');
      return;
    }

    const updatedSelectedOrders = selectedOrders;
    updatedSelectedOrders.forEach((order) => {
      order.driver = driverChosen;
    });

    const updatedOrdersInDelivery = [...ordersInDelivery, ...updatedSelectedOrders];
    const updatedOrdersReady = ordersReady.filter((order) => !selectedOrders.includes(order));

    const updatedAvailableDrivers = availableDrivers.filter((element) => element !== driverChosen);
    setAvailableDrivers(updatedAvailableDrivers);
    const updatedDriversOnTheRoad = [...driversOnTheRoad, driverChosen];
    setDriverOnTheRoad(updatedDriversOnTheRoad);

    setSelectedOrders([]);
    setOrdersReady(updatedOrdersReady);
    setOrdersInDelivery(updatedOrdersInDelivery);

    updateFirestore(updatedOrdersInDelivery, 'delivery');
    console.log(updatedOrdersInDelivery);
  };

  const returnTheDriver = () => {
    const obj = document.getElementById('driverChosen');
    const driverChosen = obj.options[obj.selectedIndex].text;

    if (availableDrivers.includes(driverChosen)) {
      alert('Driver not on the road!');
    }

    const ordersToMarkFinished = [];
    ordersInDelivery.forEach((order) => {
      if (order.driver === driverChosen) {
        ordersToMarkFinished.push(order);
      }
    });
    const updatedOrdersInDelivery = ordersInDelivery.filter((order) => !ordersToMarkFinished.includes(order));

    console.log(ordersInDelivery);
    console.log(ordersToMarkFinished);
    setOrdersInDelivery(updatedOrdersInDelivery);

    updateFirestore(ordersToMarkFinished, 'finished');
  };

  return (
    <div className='grid-container'>
      <div className='order-list'>
        <h1>Orders</h1>
        {ordersReady.length === 0 ? (
          <p>No orders in preparation</p>
        ) : (
          ordersReady.map((order, index) => (
            <div key={index} onClick={() => handleOrderClick(order, index)} className='order'>
              <h5>Order: {order.orderId}</h5>
              <p>
                Address: {order.address.street} {order.address.number}
              </p>
              <p>Customer phone number: {order.address.phone}</p>
            </div>
          ))
        )}
      </div>

      <div className='assign-orders'>
        <h1>
          <label>Driver </label>
        </h1>
        <select id='driverChosen' onChange={handleDriverChange}>
          {allDrivers.map((driver, index) => (
            <option key={index} value={index}>
              {driver}
            </option>
          ))}
        </select>
        <button onClick={() => dispatchTheDriver(driver)}>Out!</button>
        <button onClick={returnTheDriver}>Return</button>
        {selectedOrders.length > 0 && (
          <div>
            {selectedOrders.map((order, index) => (
              <p key={index}>{order.orderId}</p>
            ))}
          </div>
        )}
      </div>

      <div className='driver-list'>
        <h1>On the road</h1>
        {ordersInDelivery.length === 0 ? (
          <p>No orders on the road</p>
        ) : (
          ordersInDelivery.map((order, index) => (
            <div key={index}>
              <p>Driver {order.driver}</p>
              <p>Order: {order.orderId}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dispatch;
