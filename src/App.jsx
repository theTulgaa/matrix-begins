import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewCon } from './NewCon';

function App() {

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenSize(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // });

  useEffect(() => {
    document.title = "MATRIX CALCULATOR";
  });
  return (
    <>
    <NewCon />
    </>
  )
}

export default App
