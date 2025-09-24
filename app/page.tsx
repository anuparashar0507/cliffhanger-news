import { Metadata } from 'next';
import Homepage from '@/components/Homepage';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to The Cliff News - Your trusted source for the latest breaking news, politics, entertainment, sports, and more.',
  openGraph: {
    title: 'The Cliff News - Latest Breaking News & Updates',
    description: 'Stay updated with the latest breaking news, politics, entertainment, sports, and more.',
    type: 'website',
  },
};

export default function Page() {
  return <Homepage />;
}