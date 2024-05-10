import { useEffect, useState } from 'react'
 
import './App.css'
 

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://dummy-api2.onrender.com/path/to/celebrities.json')
      .then(response => {
         setData(response.data.ListView);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const filter = (e) => {
    const keyword = e.target.value.trim().toLowerCase();

    if (keyword) {
      const results = data.filter((user) => {
        return user.first.toLowerCase().startsWith(keyword);
      });
      setFilteredData(results);
    } else {
      setFilteredData(data);
    }

    setName(keyword);
  };

  const handleDelete = (id) => {
    const updatedData = filteredData.filter(item => item.id !== id);
    setFilteredData(updatedData);
    localStorage.setItem('celebList', JSON.stringify(updatedData));
  };

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div key={item.id} className="accordion">
            <div className="accordion-summary">
              <div className="avatar">
                <img src={item.picture} alt="Avatar" />
              </div>
              <div className="details">
                <p>{item.first} {item.last}</p>
                <div className="info">
                  <p>Age: {item.dob}</p>
                  <p>Gender: {item.gender}</p>
                  <p>Country: {item.country}</p>
                </div>
              </div>
            </div>
            <div className="accordion-details">
              <p>{item.description}</p>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="no-results">No results found!</h1>
      )}
    </div>
  )
}

export default App


