import { Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = props => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const match = useRouteMatch();

  const sortAsc = query.get("sort") === "desc" ? false : true;

  const changeSortHandler = () => {
    history.replace(match.path + "?sort=" + (sortAsc ? "desc" : "asc"));
  };

  const sortedQuotes = sortQuotes(props.quotes, sortAsc);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {sortAsc ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
