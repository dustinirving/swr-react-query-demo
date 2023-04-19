import { Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./swr-pages/Home";
import EditTodo from "./swr-pages/EditTodo";

export default function Swr() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
