import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import LifecycleQuery from "./LifecycleQuery";
import ReactQuery from "./ReactQuery";
import Swr from "./Swr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditTodo from "./swr-pages/EditTodo";
import SWRHome from "./swr-pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <div style={{ display: "flex", columnGap: "12px" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/lifecycle-query">LifecycleQuery</NavLink>
          <NavLink to="/react-query">React Query</NavLink>
          <NavLink to="/swr">SWR</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lifecycle-query" element={<LifecycleQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/swr" element={<Swr />}>
            <Route path="edit/:id" element={<EditTodo />} />
            <Route index element={<SWRHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="bean"
        position={"bottom-right"}
        newestOnTop={true}
        draggable={false}
        pauseOnHover
      />
    </QueryClientProvider>
  );
}
