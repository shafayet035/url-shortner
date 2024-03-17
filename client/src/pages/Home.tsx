import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Axios from '@/config/axios';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

type Data = {
  shortUrl: string;
  longUrl: string;
};

type CreateError = {
  message: string;
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setData(null);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const url = formData.get('url');
    const slug = formData.get('slug');
    try {
      setLoading(true);
      const { data } = await Axios.post('/url/create', {
        url,
        slug,
      });
      setData(data);

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const err = error as AxiosError<CreateError>;
      const errorMessage = err?.response?.data?.message || 'An error occurred';
      toast({
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-[500px] mx-auto flex-col gap-10 flex items-center justify-center h-screen	'>
      <form onSubmit={handleSubmit} className='w-full grid gap-6'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='url'>Enter Url</Label>
          <Input
            disabled={loading}
            name='url'
            type='url'
            id='url'
            placeholder='Url'
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='slug'>Add a slug (optional)</Label>
          <Input
            disabled={loading}
            name='slug'
            type='text'
            id='slug'
            placeholder='Slug'
          />
        </div>
        <Button disabled={loading} type='submit'>
          Submit
        </Button>
      </form>
      {data && (
        <div className='grid gap-2'>
          <p>
            Short URL: <span id='shortUrl'>{data.shortUrl}</span>
          </p>
          <p>Long URL: {data.longUrl}</p>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(data.shortUrl);
              toast({
                title: 'Copied',
                description: 'Short URL copied to clipboard',
              });
            }}
          >
            Copy Short URl
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
