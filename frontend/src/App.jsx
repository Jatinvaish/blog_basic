import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Route/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound';
import BlogForm from "./components/Blog/BlogForm";
import BlogList from "./components/Blog/BlogList";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const theTokenThing = localStorage.getItem('token');
  return (
      <BrowserRouter>
        {theTokenThing && <Navbar />}
        <Routes>
          <Route exact path='/sign-up' Component={Register} />
          <Route exact path='/' Component={Login} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/create-blog' element={<BlogForm />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/create-blog/:id' element={<BlogForm />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/blogs' element={<BlogList />} />
          </Route>
          <Route path='*' element={NotFound} />
        </Routes>
        {theTokenThing && <Footer />}
      </BrowserRouter>
  )
}

export default App
