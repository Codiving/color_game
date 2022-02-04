import { useCallback, useEffect, useReducer } from "react";
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
  const { time, stage, list, answer, score } = game;
  const gridCount = Math.floor(Math.sqrt(list));

  const timer = useCallback(
    () => dispatchGame({ name: ACTION_DECREASE_TIME }),
    []
  );

  useInterval(timer, time <= 0 ? 0 : 1000);

  useEffect(() => {
    if (time <= 0) {
      alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      dispatchGame({ name: ACTION_INIT });
    }
  }, [time, stage, score]);

  return (
    <div>
      <div>
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </div>
      <div
        style={{
          width: 360,
          height: 360,
          display: "grid",
          gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
          gap: 3
        }}
      >
        {new Array(list).fill("").map((item, key) => (
          <div
            key={key}
            style={{ background: key === answer ? "yellow" : "red" }}
            onClick={() => {
              if (key === answer) {
                dispatchGame({
                  name: ACTION_NEXT_STAGE
                });
              } else {
                dispatchGame({
                  name: ACTION_FALUT_ANSWER
                });
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
