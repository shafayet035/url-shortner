import Axios from '@/config/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectToUrl = () => {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const redirectToUrl = async (slug: string) => {
        try {
          setLoading(true);
          const { data } = await Axios.get(`/url/${slug}`);
          if (data) {
            window.location.replace(data.url);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      redirectToUrl(slug);
    }
  }, [slug]);

  return (
    <div className='text-center py-20'>
      {loading ? 'Loading...' : 'Redirecting...'}
    </div>
  );
};

export default RedirectToUrl;
