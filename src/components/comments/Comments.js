import { useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../ui/LoadingSpinner";

const Comments = props => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: comments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(props.quoteId);
  }, [sendRequest, props]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const completeCommentHandler = () => {
    setIsAddingComment(false);
    sendRequest(props.quoteId);
  };

  let commentBlock = <></>;

  if (status === "pending") {
    commentBlock = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && comments.length > 0) {
    commentBlock = <CommentsList comments={comments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onHideForm={completeCommentHandler}
          quoteId={props.quoteId}
        />
      )}
      {commentBlock}
    </section>
  );
};

export default Comments;
