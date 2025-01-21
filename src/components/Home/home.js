import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './home.css';  // Import the CSS file
import { ThemeContext } from '../../context/ThemeContext';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

      if(users.length===0){
        fetchData();
      }
     /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="toggle-switch" onClick={toggleTheme}>
        <div className={`toggle-knob ${theme === 'light' ? 'light' : 'dark'}`}>
          {theme === 'light' ? (
            <img src={`sun-icon.svg`} alt="Sun" />
          ) : (
            <img src={`moon-icon.svg`} alt="Moon" />
          )}
        </div>
      </div>
      <div className='home-title'>
        <img src="userlogo.png" alt="User Logo" className='' />
        <h1 className="title">User Explorer</h1>
      </div>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <button onClick={handleSort} className="sort-button">
        Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>
      <ul className="user-list">
        {currentUsers.map(user => (
          <Link to={`/${user.id}`} className="user-link">
          <li key={user.id} className="user-item">
              {user.name} - {user.email} - {user.address.city}
          </li>
          </Link>
        ))}
      </ul>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;