import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { storage } from '../firebase';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';

const refr = collection(db, 'users');

const Users = () => {
  const [imageUrls, setImageUrls] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [data, isLoading] = useCollectionData(refr);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userArray = await getDocs(refr);
        const userData = userArray.docs.reduce((acc, doc) => {
          const user = doc.data();
          acc[user.uid] = user;
          return acc;
        }, {});
        setImageUrls(userData);
        saveToLocalStorage(userData); // Save data to local storage after fetching
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const savedUserData = localStorage.getItem('usersData');

    // Check if data is already in local storage
    if (!savedUserData) {
      fetchData();
    } else {
      setImageUrls(JSON.parse(savedUserData));
    }
  }, []);

  const fetchImage = async (userId, photoPath) => {
    try {
      const imageRef = storageRef(storage, photoPath);
      const url = await getDownloadURL(imageRef);
      setImageUrls((prevImageUrls) => ({
        ...prevImageUrls,
        [userId]: { ...prevImageUrls[userId], imageUrl: url },
      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  

  const saveToLocalStorage = (userData) => {
    localStorage.setItem('usersData', JSON.stringify(userData));
  };

  const handleButtonClick = async (userId, photoPath) => {
    if (!imageUrls[userId] || !imageUrls[userId].imageUrl) {
      await fetchImage(userId, photoPath);
    }

    const isDetailsVisible = imageUrls[userId] && imageUrls[userId].imageUrl;
    if (isDetailsVisible) {
      // Detayları gizle
      setImageUrls((prevImageUrls) => ({
        ...prevImageUrls,
        [userId]: { ...prevImageUrls[userId], imageUrl: null },
      }));
    } else {
      // Detayları göster
      saveToLocalStorage(imageUrls);
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data
    ? data.filter((user) =>
        `${user.name} ${user.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h2 className="text-2xl ml-14">Hastalarım</h2>
      <div className="mt-10 ml-10">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <ul className="list-none p-0 mt-20 ml-10">
        {filteredData.map((user) => (
          <li key={user.uid} className="bg-gray-100 mb-10 p-5 border-2 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="text-lg">
                <p className="text-lg gap-5">{user.name} {user.surname} - {user.email}</p>
              </div>
              <div className="mt-4"> {/* Yeni eklenen div ile biraz boşluk bırakılabilir */}
                <div className="w-52">
                  {imageUrls[user.uid] && imageUrls[user.uid].imageUrl && (
                    <img src={imageUrls[user.uid].imageUrl} alt="Firebase" />
                  )}
                </div>
              </div>
            </div>
            <button
              className={`mt-5 place-self-center cursor-pointer text-white inline-flex items-center px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                imageUrls[user.uid] && imageUrls[user.uid].imageUrl ? 'bg-gray-700' : 'bg-gray-700'
              }`}
              onClick={() => handleButtonClick(user.uid, user.photoPath)}
            >
              {imageUrls[user.uid] && imageUrls[user.uid].imageUrl ? 'Detayları Gizle' : 'Detayları Göster'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
