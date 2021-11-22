import { Route, Routes } from 'react-router';
import './App.css';
import Menu from './componets/Menu';
import Nav from './componets/Nav';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/users" element={<Users />}></Route>
              </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
