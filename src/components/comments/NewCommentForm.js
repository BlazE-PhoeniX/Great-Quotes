import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = props => {
  const commentTextRef = useRef();
  const { sendRequest, status } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed") {
      props.onHideForm();
    }
  }, [status, props]);

  const submitFormHandler = event => {
    event.preventDefault();

    // send comment to server
    sendRequest({
      quoteId: props.quoteId,
      commentData: commentTextRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
