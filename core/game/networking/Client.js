//TODO decide on what to use, either JSON or binary stuff, preferably JSON since the Websocket server currently in js also uses that

//TODO do we want to use addEventListener type of stuff? It's easy to use and stuff
export default class Client {
    constructor() {
        this.ws = new WebSocket(""); // Change url when server is up

        this.ws.addEventListener("error", (e) => {

        });

        this.ws.addEventListener("open", (e) => {
            //start stuff
        });

        this.ws.addEventListener("message", (e) => {

        });

        this.ws.addEventListener("close", (e) => {

        });
    }
}