import { observable, action, computed } from "mobx";

class BirdStore {
  @observable birds = [];

  @action addBird = (bird) => {
    this.birds.push(bird);
  };

  @computed get birdCount() {
    return this.birds.size;
  }
}

const store = new BirdStore();
export default store;
