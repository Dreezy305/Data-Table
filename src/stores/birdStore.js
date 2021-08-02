import { observable, action, computed } from "mobx";

class BirdStore {
  @observable birds = [];

  @action addBird = (bird) => {
    this.birds.push(bird);
  };
}

const store = new BirdStore();
export default store;
