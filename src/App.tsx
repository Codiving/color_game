import { useCallback, useEffect, useReducer } from "react";
import "./app.css";
import useInterval from "./hooks/useInterval";
import {
  ACTION_DECREASE_TIME,
  ACTION_FALUT_ANSWER,
  ACTION_INIT,
  ACTION_NEXT_STAGE,
  initGameValue,
  reducer
} from "./reducer";

const App = () => {
  const [game, dispatchGame] = useReducer(reducer, initGameValue);
  const {
    time,
    stage,
    list,
    answer,
    score,
    bgColor: { list: bgList, answer: bgAnswer }
  } = game;
  const gridCount = Math.floor(Math.sqrt(list));

  const timer = useCallback(
    () => dispatchGame({ name: ACTION_DECREASE_TIME }),
    []
  );

  const onClick = useCallback(
    index => () => {
      if (index === answer) {
        dispatchGame({
          name: ACTION_NEXT_STAGE
        });
      } else {
        dispatchGame({
          name: ACTION_FALUT_ANSWER
        });
      }
    },
    [answer]
  );

  useInterval(timer, time <= 0 ? 0 : 1000);

  useEffect(() => {
    if (time <= 0) {
      setTimeout(() => {
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        dispatchGame({ name: ACTION_INIT });
      }, 0);
    }
  }, [time, stage, score]);

  return (
    <div>
      <div className="game__info">
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </div>
      <div
        className="grid__list"
        style={{
          gridTemplateColumns: `repeat(${gridCount}, 1fr)`
        }}
      >
        {new Array(list).fill("").map((item, key) => (
          <div
            key={key}
            style={{
              background: key === answer ? bgAnswer : bgList
            }}
            onClick={onClick(key)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
