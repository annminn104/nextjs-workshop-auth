/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "styles/globals.css";
import { userService } from "services";
import { Nav, Footer } from "components";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        // query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>NextJS</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <div className="app-container">
        {user && <Nav />}
        <div className="container app-content">{authorized && <Component {...pageProps} />}</div>
        {user && <Footer />}
      </div>
    </>
  );
}
