import QuoteList from "../components/quotes/QuoteList";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";

import NoQuotesFound from "../components/quotes/NoQuotesFound";

import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const QuotesList = props => {
  const { sendRequest, error, status, data: quotes } = useHttp(getAllQuotes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let content = <NoQuotesFound />;

  if (quotes && quotes.length > 0) {
    content = <QuoteList quotes={quotes} />;
  }

  if (status === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    content = (
      <div className="centered">
        <h1>{error}</h1>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default QuotesList;
