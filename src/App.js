import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { DefaultLayout } from './layouts/DefaultLayout';
import { PrivateLayout } from './layouts/PrivateLayout';
import { Candidates } from './Pages/Candidates';
import CandidateAdd from './Pages/Candidate/CandidateAdd';
import { CandidateDetail } from './Pages/Candidate/CandidateDetail';
import { Clients } from './Pages/Clients';
import { ClientAdd } from './Pages/Client/ClientAdd';
import { ClientDetail } from './Pages/Client/ClientDetail';

import { Jobs } from './Pages/Jobs';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Page404 } from './Pages/Page404';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

          <Route path="/clients" element={<Clients />} />
          <Route path="/client-add" element={<ClientAdd />} />
          <Route path="/client-detail/:client_id" element={<ClientDetail />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
