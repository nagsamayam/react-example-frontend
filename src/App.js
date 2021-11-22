import { Route, Routes } from 'react-router';
import './App.css';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
