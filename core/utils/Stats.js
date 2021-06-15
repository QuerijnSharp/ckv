export default class Stats {
    constructor() {
        this.beginTime = -1;
        this.frames = 0;
        this.fps = -1;
        this.frameMS = -1;
        this.prevTime = -1;
        this.prevTime = (performance || Date).now();
    }

    begin() {
        this.beginTime = (performance || Date).now();
    }

    end() {
        this.frames++;
        var time = (performance || Date).now();
        this.frameMS = time - this.beginTime;
        if (time >= this.prevTime + 1000) {
            this.fps = (this.frames * 1000) / (time - this.prevTime);
            this.prevTime = time;
            this.frames = 0;
        }
    }
}