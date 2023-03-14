import React from "react";
import styles from "./styles.module.css";
const FeedbackError = ({ error }: { error: string }) => {
  return (
    <div>
      <span className={styles.errror}>{error}</span>
    </div>
  );
};

export default FeedbackError;
