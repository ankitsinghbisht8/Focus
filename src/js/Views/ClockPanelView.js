class ClockPanelView {
  _parentElement = document.querySelector(".deepshortlongtab");
  _startbtn = document.querySelector("#start-btn");
  _data;
  _count = 0;
  _isRunning = false;
  _currentTimeInSeconds = 0;
  _timerInterval = null;

  init() {
    this._data = 25;
    this.updateTimerDisplay();

    // Create alarm sound - using a simple beep tone
    this._alarmSound = new Audio();
    this._alarmSound.src =
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQdBjaH0fPKdysKI3fJ8d+RPAoVVa/j6a1WFwtBlubi0YVhHAY+ltryxnkpBSd+yO7ZiUEKElWt5OOsWBYLQ5Xh7q1UEAo8jeHwunEjCDN8xujtjzsMF2CY2+qoVhcLQZPb7qpUEAo7j+LswXAiCTF5yOjujz0MG1OX3+mhUhEJP4/b7qhUEAo7k+Ltw3EiCDN4x+3ujz4MHVGc3+yoVRQLQ5HZ77BOHg04ivDwvUYCCxlJa9HpXhF/r3xf";
    this._alarmSound.loop = true;
    this._alarmSound.volume = 0.7;
  }

  listenclick() {
    this._parentElement.addEventListener("click", (e) => {
      const clickedtimer = e.target.closest(".timer-type");
      if (!clickedtimer) return;
      console.log(clickedtimer, "Heyeyy i am clicked");
      // console.log(+clickedtimer.dataset.minutes);
      if (this._isRunning) {
        console.log("Cannot switch timer while running!");
        return;
      }
      console.log(clickedtimer, "Timer tab clicked");
      this._data = +clickedtimer.dataset.minutes;
      this._currentTimeInSeconds = 0;
      console.log(this._data, "timer set to this time");

      // Update the active button highlighting
      this.updateActiveButton(clickedtimer);

      this.updateTimerDisplay();
    });
  }
  listenStart() {
    const timeContainer = document.querySelector(".display-timer");
    timeContainer.addEventListener("click", (e) => {
      if (e.target.id === "start-btn") {
        this.toggleTimer();
      }
    });
  }
  toggleTimer() {
    this._isRunning ? this.pauseTimer() : this.startTimer();
  }
  startTimer() {
    if (this._currentTimeInSeconds === 0) {
      this._currentTimeInSeconds = this._data * 60;
    }
    this._isRunning = true;
    this.updateButtonText("Pause");
    this.freezeTabs();
    this._timerInterval = setInterval(() => {
      this._currentTimeInSeconds--;
      this.updateTimerDisplay();
      if (this._currentTimeInSeconds === 0) {
        this.timerFinished();
      }
    }, 1000);
  }
  pauseTimer() {
    this._isRunning = false;
    this.updateButtonText("Start");
    this.unfreezeTabs();
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  }
  updateTimerDisplay() {
    // If timer is not running and currentTimeInSeconds is 0, show the selected minutes
    let displaySeconds = this._currentTimeInSeconds;
    if (displaySeconds === 0 && this._data) {
      displaySeconds = this._data * 60;
    }

    const minutes = Math.floor(displaySeconds / 60);
    const seconds = displaySeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    const timerDisplay = document.querySelector("#timer-display");
    if (timerDisplay) {
      timerDisplay.textContent = formattedTime;
    }
  }
  updateButtonText(text) {
    const startBtn = document.querySelector("#start-btn");
    startBtn.textContent = text;
  }
  freezeTabs() {
    const tabs = this._parentElement.querySelectorAll(".timer-type");
    tabs.forEach((tab) => {
      tab.style.opacity = "0.5";
      tab.style.pointerEvents = "none";
      tab.style.cursor = "not-allowed";
    });
  }
  unfreezeTabs() {
    const tabs = this._parentElement.querySelectorAll(".timer-type");
    tabs.forEach((tab) => {
      tab.style.opacity = "";
      tab.style.pointerEvents = "";
      tab.style.cursor = "";
    });
  }

  updateActiveButton(clickedButton) {
    // Remove active class and styling from all timer buttons
    const allButtons = this._parentElement.querySelectorAll(".timer-type");
    allButtons.forEach((button) => {
      button.classList.remove(
        "active",
        "bg-slate-700",
        "text-white",
        "hover:bg-slate-800"
      );
      button.classList.add("bg-gray-100", "text-gray-800", "hover:bg-gray-200");
    });

    clickedButton.classList.add(
      "active",
      "bg-slate-700",
      "text-white",
      "hover:bg-slate-800"
    );
    clickedButton.classList.remove(
      "bg-gray-100",
      "text-gray-800",
      "hover:bg-gray-200"
    );
  }
  timerFinished() {
    this._isRunning = false;
    this._currentTimeInSeconds = 0;
    this.updateButtonText("Start");
    this.unfreezeTabs();

    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }

    // Play alarm sound for 5 seconds
    this.playAlarmFor5Seconds();

    alert("Completed the Timer! Well done!");
  }
  playAlarmFor5Seconds() {
    if (this._alarmSound) {
      // Play the sound
      this._alarmSound.play().catch((error) => {
        console.log("Could not play alarm sound:", error);
      });

      // Stop after 5 seconds
      setTimeout(() => {
        this._alarmSound.pause();
        this._alarmSound.currentTime = 0; // Reset to beginning
      }, 5000);
    }
  }
}
export default new ClockPanelView();
