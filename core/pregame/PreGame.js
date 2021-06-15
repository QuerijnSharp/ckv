import Client from "../game/networking/client.js";

export default class PreGame {
  constructor() {
    //class selector aswell as game loader here

    //also initialze all networking stuff
    this.client = new Client();
  }

  update(time) {}

  draw(ctx) {}
}
