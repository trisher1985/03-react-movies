// import React from "react";
// import styles from "./ErrorMessage.module.css";

// export default function ErrorMessage() {
//   return <p className={styles.text}>There was an error, please try again...</p>;
// }


import React from "react";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <p style={{ color: "red", textAlign: "center" }}>{message}</p>;
}