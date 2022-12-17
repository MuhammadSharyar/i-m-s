import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";
import "reactjs-popup/dist/index.css";
import { db } from "../firebase.config";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
