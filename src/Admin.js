import React, { useState }  from 'react';
import Modal from 'react-modal';
import { useSharedData } from './SharedDataProvider';

const Admin = () => {
  const { storeName } = useSharedData();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    setValidationError('');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setValidationError('');
  };

  const handleSave = () => {
    if (!validateTimeFormat(startTime) || !validateTimeFormat(endTime)) {
      setValidationError('Invalid time format. Please use "HH:mm".');
      return;
    }
    setLoading(true);

    console.log("Request Data:", { storeName, startTime, endTime });

    uploadTimeToFirestore(storeName, startTime, endTime)
      .then(() => {
        console.log('Timings updated successfully');
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        console.error('Error updating timings:', error);
        setLoading(false);
      });
  };

  const validateTimeFormat = (time) => {
    // Validate the time format
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const uploadTimeToFirestore = async (storeName, start, end) => {
    return new Promise((resolve, reject) => {
      const body = {
        district: storeName,
        newStartH: start,
        newCloseH: end
      };
  
      console.log('store', storeName);
      console.log('Start Time:', start);
      console.log('End Time:', end);
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://changedistricttimings-ovvvjoo5mq-uc.a.run.app");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "https://changedistricttimings-ovvvjoo5mq-uc.a.run.app");
      xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
      xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              console.log(response.message); // Log success message
              resolve();
            } else {
              console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
              reject(new Error(`Error: ${xhr.status}, Details: ${xhr.responseText}`));
            }
          } else {
            console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
            reject(new Error(`Error: ${xhr.status}, Details: ${xhr.responseText}`));
          }
        }
      };
  
      xhr.onerror = () => {
        console.error('Network error during the XMLHttpRequest');
        reject(new Error('Network error during the XMLHttpRequest'));
      };
  
      xhr.send(JSON.stringify(body));
    });
  };
  

  return (
    <div className="flex-container">
      <button onClick={openModal}>Zmień godziny otwarcia</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Choose Opening and Closing Hours"
        className={'modal'}
      >
        <h2>Choose Opening and Closing Hours</h2>
        <label>Start Time:</label>
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="HH:mm"
        />

        <label>End Time:</label>
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="HH:mm"
        />

        {validationError && <p className="error-message">{validationError}</p>}

        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={closeModal} disabled={loading}>
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default Admin;
