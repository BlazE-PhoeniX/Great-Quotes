import { Redirect, Route, Switch } from "react-router";
import React, { Suspense } from "react";

import LoadingSpinner from "./components/ui/LoadingSpinner";
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
// import QuotesList from "./pages/QuotesList";

// lazy loading => js file is split into separate chuncks and particular file is downloaded only if needed
const QuotesList = React.lazy(() => import("./pages/QuotesList"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const fallback = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  return (
    <>
      <Suspense fallback={fallback}>
        <MainNavigation />
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <QuotesList />
            </Route>
            <Route path="/quotes/:quoteId">
              <QuoteDetail />
            </Route>
            <Route path="/new-quote" exact>
              <NewQuote />
            </Route>
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Suspense>
    </>
  );
}

export default App;
