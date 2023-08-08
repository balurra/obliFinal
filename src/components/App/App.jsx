import "bootstrap-css-only";
import "./App.css";
import Layout from "../Pages/Layout";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "../Pages/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import AgregarPersona from "../Pages/Dashboard/AgregarPersona";
import VerPersonas from "../Pages/Dashboard/VerPersonas"
import TotalCensados from "../Pages/Dashboard//TotalCensados"
import Analisis from "../Pages/Dashboard/Analisis"

const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/dashboard' element={
        <PrivateRoute redirectTo='/login'>
          <Layout/>
        </PrivateRoute>
      }>
        <Route path="" element={<AgregarPersona/>} />
        <Route path="agregar-persona" element={<AgregarPersona/>} />
        <Route path="listado-personas" element={<VerPersonas/>} />
        <Route path="censados-totales" element={<TotalCensados/>} />
        <Route path="analisis" element={<Analisis/>} />
        
      </Route>
      <Route path='*' element={<NotFound/>} />

      </Routes>
    </div>
  );
};

export default App;
