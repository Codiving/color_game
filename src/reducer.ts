type ACTION = "nextStage" | "init" | "decreaseTime" | "faultAnswer";

const ACTION_NEXT_STAGE: ACTION = "nextStage";
const ACTION_INIT: ACTION = "init";
const ACTION_DECREASE_TIME: ACTION = "decreaseTime";
const ACTION_FALUT_ANSWER: ACTION = "faultAnswer";

const initTime = 15;
const initStage = 1;
const initScore = 0;

interface Game {
  stage: number;
  list: number;
  answer: number;
  score: number;
  time: number;
}

interface Action {
  name: string;
  time?: number;
}

const getBoxCount = (stage: number): number => {
  return Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
};

const getAnswer = (stage: number): number => {
  return Math.floor(Math.random() * getBoxCount(stage));
};

const nextStage = (state: Game): Game => {
  const { stage: prevStage, score: prevScore, time } = state;
  const stage = prevStage + 1;
  return {
    stage: stage,
    list: getBoxCount(stage),
    answer: getAnswer(stage),
    score: prevScore + Math.pow(prevStage, 3) * time,
    time: initTime
  };
};

const initGameValue = {
  stage: initStage,
  list: getBoxCount(initStage),
  answer: getAnswer(initStage),
  score: initScore,
  time: initTime,
  gameOver: false
};

const reducer = (state: Game, action: Action): Game => {
  const { name } = action;

  switch (name) {
    case ACTION_NEXT_STAGE:
      return nextStage(state);

    case ACTION_INIT:
      return initGameValue;

    case ACTION_DECREASE_TIME:
      return {
        ...state,
        time: state.time - 1
      };

    case ACTION_FALUT_ANSWER:
      return {
        ...state,
        time: state.time - 3 <= 0 ? 0 : state.time - 3
      };

    default:
      return state;
  }
};

export {
  ACTION_NEXT_STAGE,
  ACTION_INIT,
  ACTION_DECREASE_TIME,
  ACTION_FALUT_ANSWER,
  initTime,
  initStage,
  initGameValue,
  reducer
};
