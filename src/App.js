import './App.css';
import {Routes,Route, Navigate} from "react-router-dom"
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Home from './components/home/Home';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ChangePassword from './components/changePassword/ChangePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='*' element={<Navigate to ="/signin"/>}/>
        <Route path='/user/:email/home' element={<Home/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/forgottenpassword/:email' element={<ChangePassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
