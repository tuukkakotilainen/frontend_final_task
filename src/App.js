import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import {Route} from "react-router-dom";
import TrainingList from './components/TrainingList';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path="/customerlist" component={CustomerList} />
      <Route exact path="/traininglist" component={TrainingList} />
    </div>
  );
}

export default App;
