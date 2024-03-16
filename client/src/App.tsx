import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RedirectToUrl from './pages/RedirectToUrl';

const App = () => {
  return (
    <Routes>
      <Route path='/:slug' element={<RedirectToUrl />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default App;
