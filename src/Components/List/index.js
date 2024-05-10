import React, { useState, useEffect } from 'react';
 

import './List.css';

const List = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleClickOpen = (itemId) => {
        setOpen(true);
        setSelectedItemId(itemId);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItemId(null);
    };

    useEffect(() => {
        axios.get('https://dummy-api2.onrender.com/path/to/celebrities.json')
          .then(response => {
             setData(response.data.ListView);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const handleDelete = () => {
        const updatedData = data.filter(item => item.id !== selectedItemId);
        setData(updatedData);
        handleClose();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="search-input"
            />
            <ul className="list">
                {filteredData.map(item => (
                    <li key={item.id} className="list-item">
                        <div className="accordion">
                            <div className="accordion-summary">
                                <div className="avatar">
                                    <img src={item.picture} alt="Avatar" />
                                </div>
                                <span>{item.first} {item.last}</span>
                            </div>
                            <div className="accordion-details">
                                <div className="info">
                                    <div>
                                        <span>Age:</span>
                                        <span>{item.dob}</span>
                                    </div>
                                    <div>
                                        <span>Gender:</span>
                                        <span>{item.gender}</span>
                                    </div>
                                    <div>
                                        <span>Country:</span>
                                        <span>{item.country}</span>
                                    </div>
                                </div>
                                <p>{item.description}</p>
                                <button className="delete-btn" onClick={() => handleClickOpen(item.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={open ? "dialog-overlay open" : "dialog-overlay"} onClick={handleClose}></div>
            {open && (
                <div className="dialog">
                    <div className="dialog-content">
                        <p>Are you sure you want to delete this item?</p>
                        <div className="dialog-buttons">
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
