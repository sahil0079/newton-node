import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import RecordList from './components/RecordList';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path='/' element={<RecordList />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />


        </Routes>
      </div>
    </div>
  )
}

export default App