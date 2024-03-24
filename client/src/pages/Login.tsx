import { Button } from '@/components/ui/button';
import Axios from '@/config/axios';
import { GoogleProvider, auth } from '@/config/firebase';
import { useAuth } from '@/context/User';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const signInHandler = () => {
    signInWithPopup(auth, GoogleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        setUser({
          displayName: user.displayName as string,
          email: user.email as string,
          photoURL: user.photoURL as string,
          accessToken: token as string,
        });

        const { data } = await Axios.post('/auth/sign-in', {
          email: user.email,
          name: user.displayName,
        });

        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div className='flex items-center justify-center h-dvh'>
      <Button onClick={signInHandler}>Sign-in with Google</Button>
    </div>
  );
};

export default Login;
