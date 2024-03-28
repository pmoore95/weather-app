import { AppProps } from 'next/app';
import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from 'react-query';

export const MyApp = ({ Component, pageProps }: AppProps) => {
    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
    </QueryClientProvider>

}

export default MyApp;