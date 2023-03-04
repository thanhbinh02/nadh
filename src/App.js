import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Candidates } from './Pages/Candidates';
import { PrivateLayout } from './layouts/PrivateLayout';
import CandidateAdd from './Pages/Candidate/CandidateAdd';

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate-add" element={<CandidateAdd />} />
      </Route>
    </Routes>
  );
}

export default App;
