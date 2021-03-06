import { Route, Routes } from 'react-router';
import './App.css';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/users/Users';
import CreateUser from './pages/users/CreateUser';
import NotFound from './componets/NotFound';
import UpdateUser from './pages/users/UpdateUser';
import Roles from './pages/roles/Roles';
import CreateRole from './pages/roles/CreateRole';
import UpdateRole from './pages/roles/UpdateRole';
import Products from './pages/products/Products';
import CreateProduct from './pages/products/CreateProduct';
import UpdateProduct from './pages/products/UpdateProduct';
import Orders from './pages/orders/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>        
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/create" element={<CreateUser />}></Route>
        <Route path="/users/:id/edit" element={<UpdateUser />}></Route>
        <Route path="/roles" element={<Roles />}></Route>
        <Route path="/roles/create" element={<CreateRole />}></Route>
        <Route path="/roles/:id/edit" element={<UpdateRole />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/create" element={<CreateProduct />}></Route>
        <Route path="/products/:id/edit" element={<UpdateProduct />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
