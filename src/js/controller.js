console.log("hi");
import { listenBtn } from "./Views/mobileBtnView";

const mobileBtn = function (handler) {
  console.log(
    "Mobile hamburger menu wala button is called in init now it will be listening to the event PUB SUB design"
  );
  handler();
};
function init() {
  mobileBtn(listenBtn);
}
init();

//to watch tailwind logs---> npx @tailwindcss/cli -i ./styles.css -o ./output.css --watch
