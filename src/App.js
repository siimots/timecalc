import React, { Component } from "react";
import "./App.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";
import "moment/locale/et";
import { Pane, Select, TextInput, Button } from "evergreen-ui";

class App extends Component {
  state = {
    selectedDay: new Date(),
    selectedHour: new Date().getHours(),
    selectedMinute: 0,
    selectedSecond: 0,
    selectedDay2: new Date(),
    selectedHour2: new Date().getHours(),
    selectedMinute2: 0,
    selectedSecond2: 0,
    addedMonth: 0,
    addedDay: 0,
    addedHour: 0,
    addedMinute: 0,
    addedSecond: 0,
    action: "add",
  };

  absAndRound(str) {
    return Math.abs(Math.round(str * 100) / 100);
  }

  parseNumber(str) {
    if (!str) return "";
    str = parseInt(str);
    if (isNaN(str)) return "";

    return Math.abs(str);
  }

  render() {
    moment.locale("et");
    const {
      selectedDay,
      selectedHour,
      selectedMinute,
      selectedSecond,
      selectedDay2,
      selectedHour2,
      selectedMinute2,
      selectedSecond2,
      addedMonth,
      addedDay,
      addedHour,
      addedMinute,
      addedSecond,
      action,
    } = this.state;

    const selectedDate = moment()
      .set({
        year: new Date(selectedDay).getFullYear(),
        month: new Date(selectedDay).getMonth(),
        date: new Date(selectedDay).getDate(),
        hour: Number(selectedHour),
        minute: Number(selectedMinute),
        second: Number(selectedSecond),
      })
      .format("YYYY-MM-DD HH:mm:ss");

    const selectedDate2 = moment()
      .set({
        year: new Date(selectedDay2).getFullYear(),
        month: new Date(selectedDay2).getMonth(),
        date: new Date(selectedDay2).getDate(),
        hour: Number(selectedHour2),
        minute: Number(selectedMinute2),
        second: Number(selectedSecond2),
      })
      .format("YYYY-MM-DD HH:mm:ss");

    let newDate = moment(selectedDate);
    let newData = {
      months: addedMonth,
      days: addedDay,
      hours: addedHour,
      minutes: addedMinute,
      seconds: addedSecond,
    };
    let duration = moment.duration(newDate.diff(selectedDate2));

    if (!action || action === "add") {
      newDate = newDate.add(newData);
    } else if (action === "subtract") {
      newDate = newDate.subtract(newData);
    }

    newDate = newDate.format("YYYY-MM-DD HH:mm:ss");

    let fromYear = new Date().getFullYear() - 10;
    let toYear = new Date().getFullYear() + 10;
    return (
      <div className="App">
        <DayPicker
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          showWeekNumbers={true}
          selected={selectedDay}
          weekStartsOn={1}
          onDayClick={(e) => {
            this.setState({ selectedDay: e });
          }}
        />

        <Pane marginBottom={16}>
          <Button
            onClick={() => {
              const now = new Date();
              this.setState({
                selectedDay: now,
                selectedHour: now.getHours(),
                selectedMinute: now.getMinutes(),
                selectedSecond: now.getSeconds(),
              });
            }}
            height={24}
          >
            Hetkel
          </Button>
          {" või H: "}
          <TextInput
            type={"number"}
            width={50}
            height={24}
            value={selectedHour}
            onChange={(e) =>
              this.setState({ selectedHour: this.parseNumber(e.target.value) })
            }
          />
          {" M: "}
          <TextInput
            type={"number"}
            width={50}
            height={24}
            value={selectedMinute}
            onChange={(e) =>
              this.setState({
                selectedMinute: this.parseNumber(e.target.value),
              })
            }
          />
          {" S: "}
          <TextInput
            type={"number"}
            width={50}
            height={24}
            value={selectedSecond}
            onChange={(e) =>
              this.setState({
                selectedSecond: this.parseNumber(e.target.value),
              })
            }
          />
        </Pane>

        <Pane marginBottom={16}>Valitud aeg: {selectedDate}</Pane>

        <Pane>
          <Pane marginBottom={16}>
            <Select
              height={24}
              onChange={(e) => this.setState({ action: e.target.value })}
            >
              <option value="add" checked>
                Liida
              </option>
              <option value="subtract">Lahuta</option>
              <option value="between">Kuupäevade vahe</option>
            </Select>
          </Pane>

          {action && (action === "add" || action === "subtract") && (
            <>
              <Pane marginBottom={16}>
                {"Kuud: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  title="Kuu"
                  value={addedMonth}
                  onChange={(e) =>
                    this.setState({
                      addedMonth: this.parseNumber(e.target.value),
                    })
                  }
                />
                {" Päevad: "}
                <TextInput
                  type={"number"}
                  width={50}
                  title="Päev"
                  height={24}
                  value={addedDay}
                  onChange={(e) =>
                    this.setState({
                      addedDay: this.parseNumber(e.target.value),
                    })
                  }
                />
              </Pane>

              <Pane marginBottom={16}>
                {" H: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={addedHour}
                  onChange={(e) =>
                    this.setState({
                      addedHour: this.parseNumber(e.target.value),
                    })
                  }
                />
                {" M: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={addedMinute}
                  onChange={(e) =>
                    this.setState({
                      addedMinute: this.parseNumber(e.target.value),
                    })
                  }
                />
                {" S: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={addedSecond}
                  onChange={(e) =>
                    this.setState({
                      addedSecond: this.parseNumber(e.target.value),
                    })
                  }
                />
              </Pane>

              <Pane marginBottom={16}>Uus aeg: {newDate}</Pane>
            </>
          )}
          {action && action === "between" && (
            <>
              <DayPicker
                captionLayout="dropdown-buttons"
                fromYear={fromYear}
                toYear={toYear}
                showWeekNumbers={true}
                selected={selectedDay2}
                weekStartsOn={1}
                onDayClick={(e) => {
                  this.setState({ selectedDay2: e });
                }}
              />

              <Pane marginBottom={16}>
                <Button
                  onClick={() => {
                    const now = new Date();
                    this.setState({
                      selectedDay2: now,
                      selectedHour2: now.getHours(),
                      selectedMinute2: now.getMinutes(),
                      selectedSecond2: now.getSeconds(),
                    });
                  }}
                  height={24}
                >
                  Hetkel
                </Button>
                {" või H: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={selectedHour2}
                  onChange={(e) =>
                    this.setState({
                      selectedHour2: this.parseNumber(e.target.value),
                    })
                  }
                />
                {" M: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={selectedMinute2}
                  onChange={(e) =>
                    this.setState({
                      selectedMinute2: this.parseNumber(e.target.value),
                    })
                  }
                />
                {" S: "}
                <TextInput
                  type={"number"}
                  width={50}
                  height={24}
                  value={selectedSecond2}
                  onChange={(e) =>
                    this.setState({
                      selectedSecond2: this.parseNumber(e.target.value),
                    })
                  }
                />
              </Pane>

              <Pane marginBottom={16}>Valitud aeg: {selectedDate2}</Pane>

              <Pane marginBottom={16}>
                Vahe: <br />
                {this.absAndRound(duration.asMonths())} kuud <br />
                {this.absAndRound(duration.asDays())} päeva <br />
                {this.absAndRound(duration.asHours())} tundi <br />
                {this.absAndRound(duration.asMinutes())} minutit <br />
                {this.absAndRound(duration.asSeconds())} sekundit <br />
              </Pane>
            </>
          )}
        </Pane>
      </div>
    );
  }
}

export default App;
