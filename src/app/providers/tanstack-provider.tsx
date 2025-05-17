import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
   children: React.ReactNode;
};

export default function TanstackProvider({ children }: Props) {
   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
         },
      },
   });

   return (
      <>
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </>
   );
}
