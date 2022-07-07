import './App.css';
import Landing from "./components/Landing"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateActivity from './components/CreateActivity';
import CountryDetails from "./components/CountryDetails"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="/homepage" element={<Home/>}/>
        <Route path="/homepage/addActivity" element={<CreateActivity/>}/>
        <Route path="/homepage/countries/:id" element={<CountryDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
