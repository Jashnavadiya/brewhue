import React, { useState, useEffect } from 'react';

const DatabaseManager = () => {
  const [databases, setDatabases] = useState([]);
  const [shopName, setShopName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the list of databases
  const fetchDatabases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/databases`);
      const data = await response.json();
      setDatabases(data);
    } catch (err) {
      console.error(err);
      setMessage('Error fetching databases');
    }
  };

  // Create a new database
  const createDatabase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/create-database/${shopName}`, {
        method: 'POST',
      });
      const text = await response.text();
      setMessage(text);
      setShopName('');
      fetchDatabases(); // Refresh the list
    } catch (err) {
      console.error(err);
      setMessage('Error creating database');
    }
  };

  // Fetch databases on component mount
  useEffect(() => {
    fetchDatabases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Database Manager</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createDatabase}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Database
          </button>
        </div>

        {message && <p className="text-green-500 mb-4">{message}</p>}

        <h2 className="text-xl font-bold mb-4">Existing Databases</h2>
        <ul className="list-disc pl-6">
          {databases.map((db, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {db}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatabaseManager;
