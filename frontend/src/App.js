import React from 'react'
import {About,Header,Footer,Skills,Work,Testimonial,Education} from './container'
import { NavBar } from './components'; 
import './App.scss'

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Education />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;