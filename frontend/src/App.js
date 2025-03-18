import React from 'react'
import {About,Header,Footer,Skills,Work,Testimonial} from './container'
import { NavBar } from './components'; 
import './App.scss'

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <About />
      <Header />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;