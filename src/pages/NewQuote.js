import { useEffect } from "react";
import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = props => {
  const history = useHistory();
  const http = useHttp(addQuote);

  useEffect(() => {
    if (http.status === "completed") {
      history.push("/quotes");
    }
  }, [http.status, history]);

  const addQuotehandler = quote => {
    http.sendRequest(quote);
  };

  return (
    <div>
      <QuoteForm
        isLoading={http.status === "pending" ? true : false}
        onAddQuote={addQuotehandler}
      />
    </div>
  );
};

export default NewQuote;
