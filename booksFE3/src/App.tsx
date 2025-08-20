import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewHome from './views/home/ViewHome';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewHome />} />
      </Routes>
    </BrowserRouter>
  );
}
