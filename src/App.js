import "./App.css";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("BirdStore")
@observer
class App extends Component {
  render() {
    const { BirdStore } = this.props;
    return (
      <div className="App">
        <h1>MobX</h1>
        <h2>You have {BirdStore.birdCount} birds</h2>
        <form>
          <input
            type="text"
            placeholder="enter birds"
            ref={(input) => (this.bird = input)}
          />
        </form>
      </div>
    );
  }
}

export default App;
