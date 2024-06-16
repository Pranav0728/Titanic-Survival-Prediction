"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [Age, setAge] = useState('');
  const [Fare, setFare] = useState('');
  const [Sex, setSex] = useState('');
  const [Pclass, setPclass] = useState('');
  const [Prediction, setPrediction] = useState('');

  const handleSubmit = async () => {
    const data = { Age, Fare, Sex, Pclass };
    try {
      const response = await axios.post('http://localhost:8000/predict', data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-10 min-h-screen bg-[url('../../public/bg.jpg')]">
      <div className="text-white flex flex-col p-5 md:p-16 items-center w-full max-w-2xl mx-auto bg-black bg-opacity-40 border-2 rounded-md">
        <h1 className="text-5xl font-mono font-normal mb-10 text-center">Titanic Survival Prediction</h1>
        <div className="w-full">
          <div className="age p-5 w-full flex flex-col md:flex-row justify-between items-center">
            <label htmlFor="Age" className="font-mono font-normal text-3xl mb-2 md:mb-0">Age</label>
            <input
              type="number"
              className="w-full md:w-auto rounded-md border-0 py-1.5 pl-2 md:pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="Fare p-5 w-full flex flex-col md:flex-row justify-between items-center">
            <label htmlFor="Fare" className="font-mono font-normal text-3xl mb-2 md:mb-0">Fare</label>
            <input
              type="number"
              className="w-full md:w-auto rounded-md border-0 py-1.5 pl-2 md:pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={Fare}
              onChange={(e) => setFare(e.target.value)}
            />
          </div>
          <div className="Sex p-5 w-full flex flex-col md:flex-row justify-between items-center">
            <label htmlFor="Sex" className="font-mono font-normal text-3xl mb-2 md:mb-0">Sex</label>
            <input
              type="number"
              className="w-full md:w-auto rounded-md border-0 py-1.5 pl-2 md:pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={Sex}
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
          <div className="Pclass p-5 w-full flex flex-col md:flex-row justify-between items-center">
            <label htmlFor="Pclass" className="font-mono font-normal text-3xl mb-2 md:mb-0">Pclass</label>
            <input
              type="number"
              className="w-full md:w-auto rounded-md border-0 py-1.5 pl-2 md:pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={Pclass}
              onChange={(e) => setPclass(e.target.value)}
            />
          </div>
          <div className="btn items-center flex justify-center mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Check
            </button>
          </div>
          {Prediction && (
            <div className="check items-center flex justify-center mt-5">
              <h1 className="font-mono font-normal text-3xl">{Prediction}</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
