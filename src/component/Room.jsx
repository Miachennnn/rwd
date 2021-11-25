import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import { facilityIcon, imageUrl } from "../icons";
import style from "../style/room.module.scss";
import BookingForm from "./BookingForm";
import DateRangePicker from "./DateRangePicker";
import Msg from "./Msg";
const Room = () => {
  let path = useParams();
  const [redir, setRedir] = useState(false);
  const [display, setDisplay] = useState(false); //context
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [room, setRoom] = useState({});
  const { setBooked } = useContext(BookingContext);
  const token = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${path["id"]}`, {
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(res => {
        if (!res.ok) {
          setRedir(true);
        }
        return res.json();
      })
      .then(
        result => {
          if (Object.keys(result).indexOf("message") === -1) {
            setRoom(result["room"][0]);
            let bookedDate = [];
            bookedDate = Object.keys(result["booking"]).map(s => result["booking"][s]["date"]);
            setBooked(bookedDate);
            setIsLoaded(true);
          }
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (redir) {
    return <Redirect to="/" />;
  } else if (!isLoaded) {
    return <Msg msg="Loading..." />;
  } else if (error) {
    return <Msg msg={error} />;
  } else {
    return (
      <div className="room">
        <div className={style.slider}>
          {room["imageUrl"].map((url, index) => (
            <div key={index} onClick={() => console.log(url)} className={style.img} style={{ backgroundImage: `url(${url})` }}></div>
          ))}
          <div className={style.logo}>
            <Link to="/">
              <img src={imageUrl.logo_block} alt="logo" />
            </Link>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.left}>
            <div className={style.title}>{room["name"]}</div>
            <div className={style.detail}>
              <div className={style.p}>房客人數限制： {`${room["descriptionShort"]["GuestMin"]} ~ ${room["descriptionShort"]["GuestMax"]}`} 人</div>
              <div className={style.p}>床型：{room["descriptionShort"]["Bed"]}</div>
              <div className={style.p}>{`衛浴數量： ${room["descriptionShort"]["Private-Bath"]} 間`}</div>
              <div className={style.p}>{`房間大小： ${room["descriptionShort"]["Footage"]} 平方公尺`}</div>
              <div className={style.des}>{room["description"]}</div>
            </div>
            <div className={style.time}>
              <div className={style.smaller}>Check In</div>
              <div className={style.smaller}>Check Out</div>
              <div>{`${room["checkInAndOut"]["checkInEarly"]} — ${room["checkInAndOut"]["checkInLate"]}`}</div>
              <div>{room["checkInAndOut"]["checkOut"]}</div>
            </div>
            <div className={style.facility}>
              {Object.keys(facilityIcon).map((key, index) => (
                <div key={index} className={style.item}>
                  <img className={room["amenities"][key] ? "" : style.unsupported} alt={facilityIcon[key]["name"]} src={facilityIcon[key]["url"]} height="25px" width="25px" />
                  <span>{facilityIcon[key]["name"]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={style.price}>
            <div className={style.large}>{`NT. ${room["normalDayPrice"]}`}</div>
            <div>平日(一~四)</div>
            <div className={style.subLarge}>{`NT. ${room["holidayPrice"]}`}</div>
            <div>假日(五~日)</div>
          </div>
          <div className={style.right}>
            <div className={style.tip}>*網底/灰字為無法預定的日期</div>
            <div className={style.calender}>
              <DateRangePicker />
            </div>
            <div className={style.lock}>
              <div className={style.buttonBackground}></div>
              <button
                onClick={() => {
                  setDisplay(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                預約時段
              </button>
            </div>
            <div className={style.lock}>
              <div className={style.buttonBackground}></div>
              <button
                onClick={() => {
                  fetch("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
                    headers: new Headers({
                      Authorization: token,
                    }),
                    method: "DELETE",
                  })
                    .then(res => res.json())
                    .then(result => {
                      if (result["success"]) {
                        console.log("clear booked");
                        setBooked([]);
                      }
                    });
                }}
              >
                Clear Booked
              </button>
            </div>
          </div>
        </div>
        {display && <BookingForm setDisplay={setDisplay} holidayPrice={room["holidayPrice"]} weekdayPrice={room["normalDayPrice"]} />}
      </div>
    );
  }
};

export default Room;
