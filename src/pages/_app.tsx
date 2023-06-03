import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalTheme } from "@/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationProvider, UpdatePasswordProvider } from "@/hooks";
import { Layout } from "@/components";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <UpdatePasswordProvider>
          <GlobalTheme>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalTheme>
        </UpdatePasswordProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
