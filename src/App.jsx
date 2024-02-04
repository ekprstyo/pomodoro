import { useEffect, useRef, useState } from "react";

function Button({ btnId, btnType, className, setTime }) {
  return (
    <button id={btnId} className={className} onClick={setTime}>
      {btnType}
    </button>
  );
}

function Time({ timeId, timeValue, className }) {
  return (
    <p id={timeId} className={className}>
      {timeValue}
    </p>
  );
}

function Title({ titleId, titleValue, className }) {
  return (
    <h2 id={titleId} className={className}>
      {titleValue}
    </h2>
  );
}

function Board({ handleSetTime, props }) {
  /* btnIdDec,
  btnIdInc,
  btnTypeDec,
  btnTypeInc,
  timeId,
  timeValue,
  titleId,
  titleValue, */
  return (
    <>
      <div className="w-6/12 my-4 grid grid-cols-5 grid-rows-3">
        {/* <Title
          titleId={titleId}
          titleValue={titleValue}
          className="col-span-5 bg-lime-500 "
        />
        <Button
          btnId={btnIdDec}
          btnType={btnTypeDec}
          setTime={handleSetTime.bind(this, "-")}
          className="col-star-1 row-span-2 bg-slate-400"
        />
        <Time
          timeId={timeId}
          timeValue={timeValue}
          className="col-span-3 row-span-2 flex items-center justify-center bg-stone-900 text-white"
        />
        <Button
          btnId={btnIdInc}
          btnType={btnTypeInc}
          setTime={handleSetTime.bind(this, "+")}
          className="col-start-5 row-span-2 bg-slate-400"
        />
 */}{" "}
        <Title
          titleId={props.titleId}
          titleValue={props.titleValue}
          className="col-span-5 bg-lime-500 "
        />
        <Button
          btnId={props.btnIdDec}
          btnType={props.btnTypeDec}
          setTime={handleSetTime.bind(this, "-")}
          className="col-star-1 row-span-2 bg-slate-400"
        />
        <Time
          timeId={props.timeId}
          timeValue={props.timeValue}
          className="col-span-3 row-span-2 flex items-center justify-center bg-stone-900 text-white"
        />
        <Button
          btnId={props.btnIdInc}
          btnType={props.btnTypeInc}
          setTime={handleSetTime.bind(this, "+")}
          className="col-start-5 row-span-2 bg-slate-400"
        />
      </div>
    </>
  );
}

function App() {
  const [focusTime, setFocusTime] = useState(25);
  const timeLeftVar = `${focusTime.toString().padStart(2, "0")}:00`;
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(null);
  const [countingWhat, setCountingWhat] = useState("setTime");
  let totalTime = useRef(null);
  let setterInterval = useRef(null);
  let tempTotalTime = useRef(null);
  const isCounterActive =
    countingWhat === "countFocusTime" || countingWhat === "countBreakTime";
  let focusTimeCount = useRef(null);
  let breakTimeCount = useRef(null);
  useEffect(() => {
    focusTimeCount.current = countingWhat === "countFocusTime";
    breakTimeCount.current = countingWhat === "countBreakTime";
  }, [countingWhat]);

  function handleFocusSetTime(opt) {
    if (opt === "-" && focusTime - 1 >= 0) {
      setFocusTime(focusTime - 1);
      if (focusTimeCount.current && totalTime.current >= 60) {
        totalTime.current -= 60;
      }
    }

    if (opt === "+" && focusTime + 1 <= 60) {
      setFocusTime(focusTime + 1);
      if (focusTimeCount.current) {
        totalTime.current += 60;
      }
    }
  }

  function handleBreakSetTime(opt) {
    if (opt === "-" && breakTime - 1 >= 0) {
      setBreakTime(breakTime - 1);
      if (breakTimeCount.current && totalTime.current >= 60) {
        totalTime.current -= 60;
      }
    }

    if (opt === "+" && breakTime + 1 <= 60) {
      setBreakTime(breakTime + 1);
      if (breakTimeCount.current) {
        totalTime.current += 60;
      }
    }
  }

  function handlePlayPauseReset(opt) {
    if (opt === "-") {
      if (
        // countingWhat === "countFocusTime" ||
        // countingWhat === "countBreakTime"
        isCounterActive
      ) {
        if (totalTime.current == tempTotalTime.current) {
          setterInterval.current = setInterval(handleTimeLeft, 1000);
        } else {
          tempTotalTime.current = totalTime.current;
          totalTime.current = tempTotalTime.current;
          clearInterval(setterInterval.current);
        }
      } else {
        setTimeLeft(`${focusTime.toString().padStart(2, "0")}:00`);
        totalTime.current = focusTime * 60;
        setCountingWhat("countFocusTime");
        clearInterval(setterInterval.current);
        setterInterval.current = setInterval(handleTimeLeft, 1000);
      }
      // if (!isCounterActive) {
      //   setTimeLeft(`${focusTime.toString().padStart(2, "0")}:00`);
      //   totalTime.current = focusTime * 60;
      //   setCountingWhat("countFocusTime");
      //   clearInterval(setterInterval.current);
      //   setterInterval.current = setInterval(handleTimeLeft, 1000);
      // }

      // switch (countingWhat) {
      //   case "setTime":
      //     setTimeLeft(`${focusTime.toString().padStart(2, "0")}:00`);
      //     totalTime.current = focusTime * 60;
      //     setCountingWhat("countFocusTime");
      //     clearInterval(setterInterval.current);
      //     setterInterval.current = setInterval(handleTimeLeft, 1000);
      //     break;
      //
      //   case "countFocusTime":
      //     setTimeLeft(`${breakTime.toString().padStart(2, "0")}:00`);
      //     totalTime.current = breakTime * 60;
      //     setCountingWhat("countBreakTime");
      //     clearInterval(setterInterval.current);
      //     setterInterval.current = setInterval(handleTimeLeft, 1000);
      //     break;
      //
      //   case "countBreakTime":
      //     // setTimeLeft(`${focusTime.toString().padStart(2, "0")}:00`);
      //     // totalTime.current = focusTime * 60;
      //     setCountingWhat("countFocusTime");
      //     clearInterval(setterInterval.current);
      //     setterInterval.current = setInterval(handleTimeLeft, 1000);
      //     break;
      // }

      function handleTimeLeft() {
        console.log(focusTimeCount.current);
        console.log(totalTime.current);
        const minutes = Math.floor(totalTime.current / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (totalTime.current % 60).toString().padStart(2, "0");

        if (totalTime.current < 0) {
          // play beep audio element
          alert(
            focusTimeCount.current
              ? "Focus Time is up, start CountDown Break Time."
              : "Break Time is up."
          );
          clearInterval(setterInterval.current);
          if (focusTimeCount.current) {
            setTimeLeft(`${breakTime.toString().padStart(2, "0")}:00`);
            totalTime.current = breakTime * 60;
            setCountingWhat("countBreakTime");
            clearInterval(setterInterval.current);
            setterInterval.current = setInterval(handleTimeLeft, 1000);
          }
        } else {
          totalTime.current--;
          setTimeLeft(`${minutes}:${seconds}`);
        }
      }
    }

    if (opt === "+") {
      setFocusTime(25);
      setBreakTime(5);
      setCountingWhat("setTime");
      clearInterval(setterInterval.current);
    }
  }

  return (
    <>
      <Board
        props={{
          titleId: "session-label",
          titleValue: "Focus Time",
          btnIdDec: "session-decrement",
          btnTypeDec: "-",
          timeId: "session-length",
          timeValue: focusTime,
          // timeValue: "25",
          btnIdInc: "session-increment",
          btnTypeInc: "+",
        }}
        handleSetTime={handleFocusSetTime}
      />
      {
        // titleId="session-label"
        // titleValue="Focus Time"
        // btnIdDec="session-decrement"
        // btnTypeDec="-"
        // timeId="session-length"
        // timeValue={focusTime}
        // btnIdInc="session-increment"
        // btnTypeInc="+"
      }
      <Board
        props={{
          titleId: "break-label",
          titleValue: "Break Time",
          btnIdDec: "break-decrement",
          btnTypeDec: "-",
          timeId: "break-length",
          timeValue: breakTime,
          // timeValue: "5",
          btnIdInc: "break-increment",
          btnTypeInc: "+",
        }}
        handleSetTime={handleBreakSetTime}
      />
      {/* titleId="break-label"
        titleValue="Break Time"
        btnIdDec="break-decrement"
        btnTypeDec="-"
        timeId="break-length"
        timeValue={breakTime}
        btnIdInc="break-increment"
        btnTypeInc="+" */}
      <Board
        props={{
          titleId: "timer-label",
          titleValue: `Remaining ${
            focusTimeCount.current ? "Focus Time" : "Break Time"
          }`,
          btnIdDec: "start_stop",
          btnTypeDec: "Play/Pause",
          timeId: "time-left",
          timeValue: isCounterActive ? timeLeft : timeLeftVar,
          // timeValue: "25:00",
          btnIdInc: "reset",
          btnTypeInc: "Reset",
        }}
        handleSetTime={handlePlayPauseReset}
      />
      {/* titleId="timer-label"
        titleValue="Remaining Focus/Break Time"
        btnIdDec="start_stop"
        btnTypeDec="Play/Pause"
        timeId="time-left"
        timeValue={timeLeft}
        btnIdInc="reset"
        btnTypeInc="Reset" */}
    </>
  );
}

export default App;
