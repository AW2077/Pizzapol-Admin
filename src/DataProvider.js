import React, {createContext, useState, useEffect} from "react";

const DataContext = createContext();

const DataProvider = ({children}) => {
    const [ordersStatus, setOrdersStatus] = useState({
        preparation: [],
        cooking: [],
        delivery: [],
        finished: []
    });

    const fetchOrders = async () =>{
        try {
            const ordersResponse = await fetch('https://fetchorders-ovvvjoo5mq-uc.a.run.app');
            const ordersData = await ordersResponse.json();

            setOrdersStatus(ordersData);
            localStorage.removeItem('orderStatus');
            localStorage.setItem('ordersStatus', JSON.stringify(ordersData));

        } catch (error) {
            console.log('error fetching orders', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return(
        <DataContext.Provider value={{ordersStatus}}>
            {children}
        </DataContext.Provider>
    );
}

export { DataProvider, DataContext };