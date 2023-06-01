import React from "react";
import moment from "moment";

const TimeStamp = ({ timestamp }) => {
  const time = moment(timestamp);
  const now = moment();
  const text = time.isBefore(now.subtract(1, "day"))
    ? time.format("MMM D, hh:mm:ss")
    : time.isBefore(now.subtract(1, "hour"))
    ? time.format("hh:mm:ss")
    : time.fromNow();
  return <span className="text-muted">[{text}]</span>;
};

export default TimeStamp;
