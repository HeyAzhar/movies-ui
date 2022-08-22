import { Routes, Route } from "react-router-dom";
import Movie from "./App/Movie";

function App() {
  return (
    <Routes>
      <Route index element={<Movie />} />
    </Routes>
  );
}

export default App;
