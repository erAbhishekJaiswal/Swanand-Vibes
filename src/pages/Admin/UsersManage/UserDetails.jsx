import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {getUserById} from '../../../utills/apicall';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(id);
        // axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to load user details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <h1>User Details</h1>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

    </div>
  )
}

export default UserDetails