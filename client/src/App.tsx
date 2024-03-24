import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RedirectToUrl from './pages/RedirectToUrl';
import Login from './pages/Login';
import { useEffect } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from './context/User';

const App = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await auth.currentUser?.getIdToken();
        setUser({
          displayName: user.displayName as string,
          email: user.email as string,
          photoURL: user.photoURL as string,
          accessToken: token as string,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path='/:slug' element={<RedirectToUrl />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default App;
