import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Alertcomp from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    // WRAP EVERYTHING INTO NoteState to acess it from any component  BY IMPORTING useCONTEXT
    <NoteState>
      <Router>

        <Alertcomp alert={alert} />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />}>
            </Route>
            <Route exact path='/signin' element={<Login showAlert={showAlert} />}>
            </Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />}>
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </NoteState>
  );
}

export default App;
