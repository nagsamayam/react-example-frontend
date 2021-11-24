import { Route, Routes } from 'react-router';
import './App.css';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/users/Users';
import CreateUser from './pages/users/CreateUser';
import NotFound from './componets/NotFound';
import UpdateUser from './pages/users/UpdateUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>        
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/create" element={<CreateUser />}></Route>
        <Route path="/users/:id/edit" element={<UpdateUser />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
