import React, { useState, useEffect } from 'react';

import { fetchUsers, fetchFilteredUsers } from './utils/API/Api';
import { columns } from './utils/Columns/Columns';
import './App.css'
import THeader from './components/THeader/THeader';
import TRow from './components/TRow/TRow';
import Modal from './components/Modal/Modal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error:', error);
        setError('Ошибка запроса!');
      }
    };

    loadUsers();
  }, []);

  const handleFilterChange = async (key, value) => {

    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));

    try {
      let users;
      if (value) {
        users = await fetchFilteredUsers(key, value);
      } else {
        users = await fetchUsers();
      }
      setUsers(users);
    } catch (error) {
      console.error('Error:', error);
      setError('Ошибка фильтрации!');
    }
  };

  const handleSort = (key) => {
    setSortConfig(prevSortConfig => {
      let direction = 'asc';
      if (prevSortConfig.key === key && prevSortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (prevSortConfig.key === key && prevSortConfig.direction === 'desc') {
        direction = '';
      }
      return { key, direction };
    });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.direction === '') return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const renderRow = (user) => {
    return (
        <TRow
            key={user.id}
            user={user}
            columns={columns}
            onClick={() => setSelectedUser(user)}
        />
    );
  };

  return (
      <div className='table-container'>
        <h1>Таблица пользователей</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className='table'>
          <thead>
          <THeader columns={columns} onSort={handleSort} sortConfig={sortConfig} onFilter={handleFilterChange} filters={filters} filter />
          </thead>
          <tbody>
          {sortedUsers.map(user => renderRow(user))}
          </tbody>
        </table>
        {selectedUser && (
            <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </div>
  );
};

export default App;