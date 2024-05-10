 
import React, { useState, useEffect } from "react";
import axios from "axios";

function CelebList() {
    const [celebritiesData, setCelebritiesData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedCeleb, setEditedCeleb] = useState({});
    const [dropdownData, setDropdownData] = useState({
        gender: ["Male", "Female", "Other"],
        country: ["India", "USA", "UK", "Other"]
    });

    useEffect(() => {
        axios.get('https://dummy-api2.onrender.com/path/to/celebrities.json')
          .then(response => {
             setCelebritiesData(response.data.ListView);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (id) => {
        const celebToEdit = celebritiesData.find(celeb => celeb.id === id);
        setEditedCeleb(celebToEdit);
        setEditMode(true);
    };

    const handleSave = () => {
        const updatedCelebs = celebritiesData.map(celeb => {
            if (celeb.id === editedCeleb.id) {
                return { ...celeb, ...editedCeleb };
            } else {
                return celeb;
            }
        });
        setCelebritiesData(updatedCelebs);
        setEditMode(false);
    };

    const handleChange = (e) => {
        setEditedCeleb({ ...editedCeleb, [e.target.name]: e.target.value });
    };

    return (
        <div className="celeb-list">
            {celebritiesData.map(celeb => (
                <div key={celeb.id} className="celeb">
                    <div className="celeb-details">
                        <p>Name: {celeb.name}</p>
                        {editMode && celeb.id === editedCeleb.id ? (
                            <>
                                <input
                                    type="text"
                                    name="age"
                                    value={editedCeleb.age}
                                    onChange={handleChange}
                                />
                                <select
                                    name="gender"
                                    value={editedCeleb.gender}
                                    onChange={handleChange}
                                >
                                    {dropdownData.gender.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                                <select
                                    name="country"
                                    value={editedCeleb.country}
                                    onChange={handleChange}
                                >
                                    {dropdownData.country.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <>
                                <p>Age: {celeb.age}</p>
                                <p>Gender: {celeb.gender}</p>
                                <p>Country: {celeb.country}</p>
                            </>
                        )}
                    </div>
                    <div className="actions">
                        {editMode && celeb.id === editedCeleb.id ? (
                            <button onClick={handleSave}>Save</button>
                        ) : (
                            <button onClick={() => handleEdit(celeb.id)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CelebList;
