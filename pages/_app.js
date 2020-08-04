import { Provider } from 'next-auth/client';
import { ZeitProvider, CssBaseline } from '@zeit-ui/react';
import './styles.css';

const App = ({ Component, pageProps }) => {
  // const { session } = pageProps;
  return (
    // <Provider
    //   session={session}
    // >
    // <ZeitProvider>
    // <CssBaseline />
    <Component {...pageProps} />
    // </ZeitProvider>

    // </Provider>
  );
};

export default App;
