export default class CircleProgressbar {
    constructor(color) {
        this.progressBarColor = color;
    }

    draw(ctx, x, y, width, height, percentage) {
        ctx.save();


        let degrees = percentage * 3.6;
        // let's draw the background circle
        ctx.beginPath();
        ctx.moveto(x, y)
        ctx.strokeStyle = "#333";
        ctx.lineWidth = lineWidth - 1;
        ctx.arc(height / 2, width / 2, width / 3, 0, Math.PI * 2, false);
        ctx.stroke();
        let radians = 0; // We need to convert the degrees to radians

        radians = degrees * Math.PI / 180;
        // let's draw the actual progressBar
        ctx.beginPath();
        ctx.strokeStyle = this.progressBarColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(height / 2, width / 2, width / 3, 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        ctx.stroke();

        // let's get the text
        ctx.fillStyle = this.progressBarColor;
        ctx.font = ((width / 10) * 1.5).toFixed(0) + 'px Arial';
        ctx.textAlign = "center";
        ctx.fillText(percentage + '%', x + width / 2, y + height / 2);

        ctx.restore();
    }
}