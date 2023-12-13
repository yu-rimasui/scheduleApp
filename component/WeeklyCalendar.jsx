import React from "react";

const WeeklyCalendar = (props) => {
  const { setEvent, events } = props;
  // weekList：曜日
  const weekList = ["月", "火", "水", "木", "金", "土", "日"];
  // hourList：時間軸
  const hourList = [];
  for (let hour = 6; hour < 24; hour++) {
    hourList.push(
      <div className="hourListItem" key={hour}>
        {hour}:00
      </div>
    );
  }
  // dayList：日付軸
  const dayList = [];
  for (let day = 0; day < 18; day++) {
    dayList.push(<div className="dayListItem" key={day}></div>);
  }
  const dayLists = [];
  for (let days = 0; days < 7; days++) {
    dayLists.push(
      <div className="dayList" key={days}>
        {dayList}
      </div>
    );
  }

  return (
    <>
      {/* weekTitle：曜日 */}
      <div className="weekTitle">
        {weekList.map((week, index) => {
          return (
            <div className="weekItem" key={index}>
              {week}
            </div>
          );
        })}
      </div>
      {/* weekWrap：内容 */}
      <div className="weekWrap">
        {/* hourList：時間軸 */}
        <div className="hourList">{hourList}</div>
        {/* dayList：日付軸 */}
        {dayLists.map((days) => {
          return days;
        })}
        {/* eventItem：イベント（下に追加していく） */}
        <div className="eventItem">
          <EventBadges events={events} setEvent={setEvent} />
        </div>
      </div>
    </>
  );
};

export default WeeklyCalendar;

// イベントを表示する関数
const EventBadges = (props) => {
  const { events, setEvent } = props;

  // 表示時間定義
  const eventTime = (h1, m1) => `${h1}:${m1}-`;
  // 曜日 場合分け
  const whichDay = (day) => {
    switch (day) {
      case "月":
        return "72%";
      case "火":
        return "60%";
      case "水":
        return "48%";
      case "木":
        return "36%";
      case "金":
        return "24%";
      case "土":
        return "12%";
      case "日":
        return "0";
      default:
        break;
    }
  };
  // 時間 (Top)
  const whichTime = (h1, m1) => `${(Number(h1) - 6) * 60 + Number(m1)}px`;
  // カテゴリ 場合分け
  const whichCate = (category) => {
    switch (category) {
      case "カテゴリなし":
        return "#8d8d8dc0";
      case "大学":
        return "#a3c3d8c0";
      case "院試":
        return "#dcdbdac0";
      case "バイト":
        return "#d5c78cc0";
      case "サークル":
        return "#e6c0bdc0";
      case "スキルアップ":
        return "#b3ccb1c0";
      default:
        break;
    }
  };
  // バッジの高さ
  const whichHeight = (h1, h2, m1, m2) => {
    let x = 0;
    if (m1 <= m2) {
      x = (Number(h2) - Number(h1)) * 60 + (Number(m2) - Number(m1));
      return `${x}px`;
    } else if (m1 > m2) {
      x = (Number(h2) - Number(h1) - 1) * 60 + (60 - Number(m1) + Number(m2));
      return `${x}px`;
    }
  };

  return (
    <>
      {events.map((event) => {
        const { id, title, day, h1, m1, h2, m2, category } = event;
        // posStyle：positionのCSSを当てる
        const posStyle = {
          top: whichTime(h1, m1),
          right: whichDay(day),
          background: whichCate(category),
          height: whichHeight(h1, h2, m1, m2),
        };

        return (
          <div
            style={posStyle}
            key={id}
            className="badge schedule_event"
            onClick={() => setEvent(event)}
          >
            <p>{eventTime(h1, m1)}</p>
            <p>{title}</p>
          </div>
        );
      })}
    </>
  );
};
