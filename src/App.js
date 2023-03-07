import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Candidates } from './Pages/Candidates';
import { PrivateLayout } from './layouts/PrivateLayout';
import CandidateAdd from './Pages/Candidate/CandidateAdd';
import { ToastContainer } from 'react-toastify';
import { CandidateDetail } from './Pages/Candidate/CandidateDetail';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidate-add" element={<CandidateAdd />} />
          <Route
            path="/candidate-detail/:candidate_id"
            element={<CandidateDetail />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
