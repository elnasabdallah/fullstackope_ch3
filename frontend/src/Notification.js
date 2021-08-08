import React from "react";

const Notification = ({ alert }) => {
  const { type, message } = alert;

  return <div className={`${type}`}>{message}</div>;
};

export default Notification;
