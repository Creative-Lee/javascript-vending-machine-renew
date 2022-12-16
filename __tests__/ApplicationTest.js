const MissionUtils = require("@woowacourse/mission-utils");
const App = require("../src/App");

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((_, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInList = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInList);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join("");
};

const runException = (inputs) => {
  mockQuestions(inputs);
  const logSpy = getLogSpy();
  const app = new App();

  app.play();

  expectLogContains(getOutput(logSpy), ["[ERROR]"]);
};

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

describe("자판기 테스트", () => {
  test("기능 테스트", () => {
    const logSpy = getLogSpy();
    mockRandoms([100, 100, 100, 100, 50]);
    mockQuestions(["450", "[콜라,1500,20];[사이다,1000,10]", "3000", "콜라", "사이다"]);

    const app = new App();
    app.play();

    const log = getOutput(logSpy);
    expectLogContains(log, [
      "자판기가 보유한 동전",
      "500원 - 0개",
      "100원 - 4개",
      "50원 - 1개",
      "10원 - 0개",
      "투입 금액: 3000원",
      "투입 금액: 1500원",
    ]);
  });

  test("예외 테스트", () => {
    runException(["a"]);
  });
});
