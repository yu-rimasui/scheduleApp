import React, { useState, useEffect } from "react";
import "./css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { Button } from "react-bootstrap";
import WeeklyCalendar from "./component/WeeklyCalendar";
import { AddEventModal } from "./component/EventModal";
import bgImg01 from "./images/bg01.jpg";
import bgImg02 from "./images/bg02.jpg";
import bgImg03 from "./images/bg03.jpg";
import bgImg04 from "./images/bg04.jpg";
import bgImg05 from "./images/bg05.jpg";
import bgImg06 from "./images/bg06.jpg";
import bgImg07 from "./images/bg07.jpg";

const API_URL = "http://localhost:3000/events/";

const App = () => {
  // モーダルの開閉
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // イベントのデータ
  const [events, setEvents] = useState([]);
  const initEvent = {
    id: null,
    title: "",
    day: "",
    h1: "",
    m1: "",
    h2: "",
    m2: "",
    category: "",
  };
  const [event, setEvent] = useState(initEvent);

  // bgランダム
  const bgImgs = [
    bgImg01,
    bgImg02,
    bgImg03,
    bgImg04,
    bgImg05,
    bgImg06,
    bgImg07,
  ];
  const [bgImg, setBgImg] = useState(bgImg01);

  // フェッチ
  let isFrist = false;
  useEffect(() => {
    fetchEvent();
    isFrist = true;
    let index = Math.floor(Math.random() * bgImgs.length);
    setBgImg(bgImgs[index]);
  }, []);

  useEffect(() => {
    if (!isFrist && event.id !== null) {
      setShow(true);
    }
  }, [event]);

  const fetchEvent = () => {
    fetch(API_URL)
      .then((responseData) => {
        return responseData.json();
      })
      .then((result) => {
        setEvents(result);
      });
  };

  // データ追加
  const addEvent = (title, day, h1, m1, h2, m2, category) => {
    const addDate = { title, day, h1, m1, h2, m2, category };
    fetch(API_URL, {
      body: JSON.stringify(addDate),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchEvent);
  };
  // データ削除
  const deleteEvent = (id) => {
    const eventURL = API_URL + id;
    fetch(eventURL, {
      method: "DELETE",
    }).then(fetchEvent);
  };
  // データ編集
  const editEvent = (id, title, day, h1, m1, h2, m2, category) => {
    const eventURL = API_URL + id;
    const editData = { id, title, day, h1, m1, h2, m2, category };
    fetch(eventURL, {
      body: JSON.stringify(editData),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchEvent);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="wrap"
    >
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
        <div className="eventBtnWrap">
          <Button className="eventBtn" variant="primary" onClick={handleShow}>
            予定追加
          </Button>
        </div>
        <AddEventModal
          show={show}
          modalClose={modalClose}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
          event={event}
          setEvent={setEvent}
          initEvent={initEvent}
        />
        <div className="weeklyCalendar">
          <WeeklyCalendar events={events} setEvent={setEvent} />
        </div>
      </div>
    </div>
  );
};

export default App;
