import { useToast } from '@/components/ui/use-toast';
import Axios from '@/config/axios';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectToUrl = () => {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const { toast } = useToast();

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
          const err = error as AxiosError;
          if (err.response?.status === 404)
            toast({
              title: 'URL not found',
              variant: 'destructive',
            });
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
