import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import MyDownloadsPage from './pages/MyDownloadsPage';
import DownloadGatePage from './pages/DownloadGatePage';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';

const queryClient = new QueryClient();

type Page = 'home' | 'downloads' | 'download-gate';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [downloadToken, setDownloadToken] = useState<string>('');

  // Simple hash-based routing
  const handleNavigate = (page: Page, token?: string) => {
    setCurrentPage(page);
    if (token) setDownloadToken(token);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'downloads' && <MyDownloadsPage onNavigate={handleNavigate} />}
        {currentPage === 'download-gate' && <DownloadGatePage token={downloadToken} onNavigate={handleNavigate} />}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
