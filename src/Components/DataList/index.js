


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { CiCircleCheck } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
const DataList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        axios.get('https://dummy-api2.onrender.com/path/to/celebrities.json')
          .then(response => {
             setData(response.data.ListView);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const handleEdit = (id) => {
        setIsEditing(true);
        const editedItem = data.find(item => item.id === id);
        setEditData(editedItem);
    };

    const handleSave = () => {
        const updatedData = data.map(item => (item.id === editData.id ? editData : item));
        setData(updatedData);
        setIsEditing(false);
        setEditData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleCancelSave = () => {
        setIsEditing(false);
        setEditData({});
    };

    const handleDelete = (id) => {
        const confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
    } else {
        setData(data);
    }
        // const updatedData = data.filter(item => item.id !== id);
        // setData(updatedData);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleExpanded = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return 'N/A';
        const birthdate = moment(dateOfBirth, "YYYY-MM-DD").toDate();
        if (isNaN(birthdate.getTime())) return 'Invalid DOB';
        const ageDifMs = Date.now() - birthdate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const filteredData = data.filter(item =>
        item.first.toLowerCase().includes(search.toLowerCase()) ||
        item.last.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="data-list">
            <h1 style={{color:"navy"}}>List View</h1>
            <div className='search-container'> 
              <IoIosSearch />
            <input
                 
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                className="search-input"
            />
            </div>
            {filteredData.map(item => (
                <div key={item.id} className="accordion">
                    <div
                        className={`accordion-summary ${expanded === item.id ? 'expanded' : ''}`}
                        onClick={() => handleExpanded(item.id)}
                    >
                        <div className="avatar">
                            <img src={item.picture} alt="Avatar" />
                        </div>
                        <div className="name">
                            {isEditing && editData.id === item.id ? (
                                <>
                                    <input
                                        className='input'
                                        type="text"
                                        name="first"
                                        value={editData.first}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='input'
                                        type="text"
                                        name="last"
                                        value={editData.last}
                                        onChange={handleChange}
                                    />
                                </>
                            ) : (
                                <span>{item.first} {item.last}</span>
                            )}
                        </div>
                    </div>
                    <div className={`accordion-details ${expanded === item.id ? 'expanded' : ''}`}>
                        <div className="info">
                            <div>
                                {isEditing && editData.id === item.id ? (
                                    <> 
                                        <span className='color'>Age:  </span>
                                        <input
                                            className='input'
                                            name="dob"
                                            value={editData.dob}
                                            onChange={handleChange}
                                        /> 
                                    </>
                                ) : (
                                    <> 
                                        <span className='color'>Age:  </span>
                                        <span>{calculateAge(item.dob)}</span>
                                    </>
                                )}
                            </div>
                            <div>
                                <span className='color'>Gender:  </span>
                                {isEditing && editData.id === item.id ? (
                                    <select
                                        className='input'
                                        name="gender"
                                        value={editData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <>
                                   
                                    <span >{item.gender}</span>
                                    </>
                                )}
                            </div>
                            <div>
                                <span className='color'>Country:  </span>
                                {isEditing && editData.id === item.id ? (
                                    <select
                                        className='input'
                                        name="country"
                                        value={editData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <>
                                    
                                    <span  >{item.country}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="description">
                            {isEditing && editData.id === item.id ? (
                                <>
                                <span className='color'>Description:  </span>
                                <textarea
                                    className='textarea'
                                    name="description"
                                    value={editData.description}
                                    onChange={handleChange}
                                ></textarea>
                                </>
                            ) : (
                                <>
                                <span className='color'>Description:  </span>
                                <span>{item.description}</span>

                                </>
                            )}
                        </div>
                        <div className="actions">
                            {isEditing && editData.id === item.id ? (
                                <div className='contianer-of-button'>
                                    <button style={{color:"red",fontSize:"20px"}} className='button' onClick={handleCancelSave}><RxCross2 /></button>
                                    <button style={{color:"green",fontSize:"20px"}} className='button' onClick={handleSave}><CiCircleCheck /></button>
                                </div>
                            ) : (
                                <div className='contianer-of-button'>
                                    <button style={{color:"blue",fontSize:"20px"}} className='button' onClick={() => handleEdit(item.id)}><GrEdit /></button>
                                    <button style={{color:"red",fontSize:"20px"}} className='button' onClick={() => handleDelete(item.id)}><RiDeleteBin6Line /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DataList;
