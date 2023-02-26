import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Candidates } from './Pages/Candidates';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { PrivateLayout } from './layouts/PrivateLayout';

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
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
