import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import LifecycleQuery from './LifecycleQuery';
import ReactQuery from './ReactQuery';
import Swr from './Swr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <div style={{ display: 'flex', columnGap: '12px' }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/lifecycle-query">LifecycleQuery</NavLink>
          <NavLink to="/react-query">React Query</NavLink>
          <NavLink to="/swr">SWR</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lifecycle-query" element={<LifecycleQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/swr" element={<Swr />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
