import React, { useContext, useEffect, useState } from "react";
import style from "../style/booking.module.scss";
import { format, eachDayOfInterval, addDays } from "date-fns";
import { useParams } from "react-router";
import { imageUrl } from "../icons";
import { BookingContext } from "../context/BookingContext";

const BookingForm = ({ setDisplay, holidayPrice, weekdayPrice }) => {
  const path = useParams();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8); //因fns format後的時間預設是8:00
  const [range, setRange] = useState({ inDate: today, outDate: today });
  const [dayCount, setDaycount] = useState({ holiday: 0, weekday: 0 });
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState("");
  const { setBooked } = useContext(BookingContext);
  const token = process.env.REACT_APP_API_TOKEN;
  useEffect(() => {
    fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${path["id"]}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then(res => res.json())
      .then(result => {
        let bookedDate = [];
        bookedDate = Object.keys(result["booking"]).map(s => result["booking"][s]["date"]);
        setBooked(bookedDate);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  useEffect(() => {
    calDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);
  const calDays = () => {
    let holiday = 0,
      weekday = 0;
    if (addDays(range["inDate"], 1) <= range["outDate"]) {
      eachDayOfInterval({ start: addDays(range["inDate"], 1), end: range["outDate"] }).map(day => (day.getDay() < 1 || day.getDay() >= 5 ? (weekday += 1) : (holiday += 1)));
      document.getElementById("book").disabled = false;
    } else document.getElementById("book").disabled = true;
    setDaycount({ holiday: holiday, weekday: weekday });
  };
  const handleSubmit = e => {
    e.preventDefault();
    let dates = [];
    if (range["inDate"] < range["outDate"] && range["inDate"] >= today) {
      eachDayOfInterval({ start: addDays(range["inDate"], 1), end: range["outDate"] }).map(day => dates.push(format(day, "yyyy-MM-dd")));
      fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${path["id"]}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
        body: JSON.stringify({ name: name, tel: tel, date: dates }),
      })
        .then(res => res.json())
        .then(result => {
          if (result["success"]) {
            setSuccess(true);
          } else {
            setSubmit(result["message"]);
          }
        });
    }
  };
  if (submit !== "") {
    return (
      <div className={style.cover}>
        <div className={style.bookingForm}>
          <div className={style.title}>預約失敗</div>
          <div>
            <br />
            {submit}
          </div>
          <div className={style.submit}>
            <br />
            <input className={style.right} type="button" value="返回" onClick={() => setSubmit("")} />
          </div>
        </div>
      </div>
    );
  } else if (success) {
    return (
      <div className={style.cover}>
        <div className={style.bookingForm}>
          <div className={style.title}>預約成功</div>
          <div>
            <br />
            {submit}
          </div>
          <div className={style.submit}>
            <img src={imageUrl.success} height="60px" alt="icon" />
            <br />
            <input
              className={style.right}
              type="button"
              value="返回"
              onClick={() => {
                setDisplay(false);
                document.body.style.overflow = "scroll";
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={style.cover}>
      <div className={style.bookingForm}>
        <form onSubmit={handleSubmit}>
          <div className={style.title}>預約時段</div>
          <div className={style.inputs}>
            <div>姓名</div>
            <div>
              <input type="text" name="form-name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>電話</div>
            <div>
              <input type="tel" name="form-tel" value={tel} onChange={e => setTel(e.target.value)} required />
            </div>
            <div>預約起迄</div>
            <div>
              <input
                min={format(today, "yyyy-MM-dd")}
                type="date"
                name="form-date_start"
                value={format(range["inDate"], "yyyy-MM-dd")}
                onChange={e => {
                  setRange(e.target.value === "" ? { ...range, inDate: today } : { ...range, inDate: new Date(e.target.value) });
                }}
              />
              <span>~</span>
              <input
                min={format(today, "yyyy-MM-dd")}
                type="date"
                name="form-date_end"
                value={format(range["outDate"], "yyyy-MM-dd")}
                onChange={e => {
                  setRange(e.target.value === "" ? { ...range, outDate: today } : { ...range, outDate: new Date(e.target.value) });
                }}
              />
            </div>
          </div>
          <div className={style.type}>
            <div>平日時段</div>
            <div>{dayCount["holiday"]}夜</div>
            <div>假日時段</div>
            <div>{dayCount["weekday"]}夜</div>
          </div>
          <div className={style.grid}>
            <div className={style.total}>=</div>
            <div className={style.total}>{` NT. ${holidayPrice * dayCount["holiday"] + weekdayPrice * dayCount["weekday"]}`}</div>
            <div className={style.cancel}>
              <input
                onClick={() => {
                  setDisplay(false);
                  document.body.style.overflow = "scroll";
                }}
                type="button"
                value="取消"
              />
            </div>
            <div className={style.submit}>
              <input type="submit" value="確定預約" id="book" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
