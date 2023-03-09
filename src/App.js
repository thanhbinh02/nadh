import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Candidates } from './Pages/Candidates';
import { PrivateLayout } from './layouts/PrivateLayout';
import CandidateAdd from './Pages/Candidate/CandidateAdd';
import { ToastContainer } from 'react-toastify';
import { CandidateDetail } from './Pages/Candidate/CandidateDetail';
import { SelectAddItem } from './components/Select/SelectAddItem';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
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
          <Route path="/test" element={<SelectAddItem />} />
          <Route
            path="/candidate-detail/:candidate_id"
            element={<CandidateDetail />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
