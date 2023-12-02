import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import RecordList from './components/RecordList';
import Create from './components/Create';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path='/' element={<RecordList />} />
          <Route path='/create' element={<Create />} />

        </Routes>
      </div>
    </div>
  )
}

export default App