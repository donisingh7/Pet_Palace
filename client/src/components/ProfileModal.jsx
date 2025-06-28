// File: src/components/ProfileModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileModal({ onClose }) {
  const { user, updateProfile } = useAuth();
  const [page, setPage] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [dob, setDob] = useState(user?.dob ? user.dob.split('T')[0] : '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [petType, setPetType] = useState(user?.pet?.type || '');
  const [petName, setPetName] = useState(user?.pet?.name || '');
  const [petDob, setPetDob] = useState(user?.pet?.dob ? user.pet.dob.split('T')[0] : '');
  const [petBreed, setPetBreed] = useState(user?.pet?.breed || '');
  const [error, setError] = useState('');

  const calculateAge = (birth) => {
    const diff = Date.now() - new Date(birth).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  const handleSubmit = async () => {
    if (!name || !dob || !email) {
      return setError('Please fill all required fields');
    }
    setError('');
    const pet = { type: petType, name: petName, dob: petDob, breed: petBreed };
    try {
      await updateProfile({ name, dob, email, address, photoUrl, pet });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 transform transition-transform duration-300 scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✕</button>
        {page === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setPage(2)}
              className="mt-4 bg-indigo-600 text-white py-2 rounded-lg w-full hover:bg-indigo-700 transition"
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Pet Details</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex space-x-4 mb-3">
              <label className="flex-1 inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="dog"
                  checked={petType === 'dog'}
                  onChange={() => setPetType('dog')}
                  className="mr-2"
                />
                Dog
              </label>
              <label className="flex-1 inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="cat"
                  checked={petType === 'cat'}
                  onChange={() => setPetType('cat')}
                  className="mr-2"
                />
                Cat
              </label>
            </div>
            <input
              type="text"
              placeholder="Pet Name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              placeholder="Pet Date of Birth"
              value={petDob}
              onChange={(e) => setPetDob(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {petDob && (
              <p className="text-gray-600 mb-3">Age: {calculateAge(petDob)} years</p>
            )}
            <input
              type="text"
              placeholder="Breed"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setPage(1)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
