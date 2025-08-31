console.log("hi");
import { listenBtn } from "./Views/mobileBtnView.js";
import ClockPanelView from "./Views/ClockPanelView.js";

const mobileBtn = function (handler) {
  console.log(
    "Mobile hamburger menu wala button is called in init now it will be listening to the event PUB SUB design"
  );
  handler();
};

// const clockpanelcontrol = function (handler) {
//   console.log("I am clock panel controller");
//   handler();
// };

function init() {
  mobileBtn(listenBtn);
  ClockPanelView.init();
  ClockPanelView.listenclick();
  ClockPanelView.listenStart();
}
init();

//to watch tailwind logs---> npx @tailwindcss/cli -i ./styles.css -o ./output.css --watch
