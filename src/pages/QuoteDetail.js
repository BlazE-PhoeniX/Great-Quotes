import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const Comments = React.lazy(() => import("../components/comments/Comments"));

const QuoteDetail = props => {
  const match = useRouteMatch();
  const params = match.params;

  const { sendRequest, status, error, data: quote } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [params.quoteId, sendRequest]);

  if (error) {
    return (
      <div className="centered">
        <h1>{error}</h1>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!quote) {
    return (
      <>
        <div className="noquotes">
          <p>Quote not found</p>
          <Link className="btn" to="/quotes">
            Go back
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HighlightedQuote {...quote} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <div className="centered">
          <Link className="btn--flat" to={match.url}>
            Hide comments
          </Link>
        </div>
        <Comments quoteId={params.quoteId} />
      </Route>
    </>
  );
};

export default QuoteDetail;
