import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';


const root = document.getElementById('root');
const rootElement = createRoot(root); // Use createRoot instead of ReactDOM.render
rootElement.render(<App />);