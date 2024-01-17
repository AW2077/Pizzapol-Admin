import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(<App />);