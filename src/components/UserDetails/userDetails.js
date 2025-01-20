import React, { useState, useEffect, useContext } from 'react';
import { useParams} from 'react-router-dom';
import './userDetails.css';  // Import the CSS file
import { ThemeContext } from '../../context/ThemeContext';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUserData=async ()=>{
        try{
          const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          const data= await response.json();
          console.log(data);
          setUser(data);
        setLoading(false);
    
          console.log(user);
        }
        catch(e){
            setError(e);
            setLoading(false);
        }
     }
     fetchUserData();
 /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
        <div className="toggle-switch" onClick={toggleTheme}>
          <div className={`toggle-knob ${theme === 'light' ? 'light' : 'dark'}`}>
            {theme === 'light' ? (
              <img src={`./sun-icon.svg`} alt="Sun" />
            ) : (
              <img src={`moon-icon.svg`} alt="Moon" />
            )}
          </div>
        </div>
        <button className="back-button" onClick={() => window.history.back()}>
            Go Back
        </button>
        <div className='user-details-container'>
            <img src="./usertemp.jpg" className='' alt="user icon" />
            {/* <h1 className="title">{user?.name}</h1> */}
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Company:</strong> {user?.company.name}</p>
            <p><strong>Website:</strong> {user?.website}</p>

        </div>
      
    
    </div>
  );
};

export default UserDetails;