import React, { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import "../style/style.scss";
import { format } from "date-fns";

const DateRangePicker = () => {
  const now = new Date();
  const { booked } = useContext(BookingContext);
  const [current, setCurrent] = useState(new Date(now.getFullYear(), now.getMonth()));
  const week = ["日", "一", "二", "三", "四", "五", "六"];

  const totalDate = current => {
    let offsetDays = current.getDay();
    let totalDays = getDaysOfMonth(current.getFullYear(), current.getMonth() + 1);
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = [];
    for (let i = 1; i <= offsetDays; i++) {
      days.push(<span key={"fake" + i} className="offsetDay"></span>);
    }
    for (let i = 1; i <= totalDays; i++) {
      let dateTime = new Date(current.getFullYear(), current.getMonth(), i).getTime();
      days.push(
        <span
          key={"date" + i}
          className={`date ${booked.indexOf(format(dateTime, "yyyy-MM-dd")) === -1 ? "" : "booked"}
            ${today.getTime() > dateTime ? "disable" : ""}`}
        >
          {i}
        </span>
      );
    }
    return days;
  };
  return (
    <div className="DateRangePicker">
      <div className="nav">
        <span
          className="pre"
          onClick={() => {
            setCurrent(new Date(current.getFullYear(), current.getMonth() - 1));
          }}
        >
          〈
        </span>
        <span className="currentYM">{`${current.getFullYear()} / ${current.getMonth() + 1}`}</span>
        <span
          className="next"
          onClick={() => {
            setCurrent(new Date(current.getFullYear(), current.getMonth() + 1));
          }}
        >
          〉
        </span>
      </div>
      <div className="weeks">
        {week.map((w, index) => (
          <span key={index}>{w}</span>
        ))}
      </div>
      <div className="days">{totalDate(current)}</div>
    </div>
  );
};

export default DateRangePicker;

function getDaysOfMonth(y, m) {
  let date = new Date(y, m, 0);
  return date.getDate();
}
