function stopWatch(ctx, ms) {

    var interval;
    var startTime = 0;
    this.isOn = false;
    var lastLap = 0;
    this.laps = [];
    this.drawTimer = drawTimer;

    function formatTime(timeInMilliseconds) {
        var t = new Date(timeInMilliseconds);

        var min = (t.getUTCMinutes()).toString();

        var sec = t.getSeconds().toString();
        var milli = t.getMilliseconds().toString();

        if (min.length < 2) min = "0" + min;
        if (sec.length < 2) sec = "0" + sec;
        while (milli.length < 3) milli = "0" + milli;

        return (
            min + ":" + sec + "." + milli
        );

    }

    function drawTimer(timer) {
        ctx.clear();

        //draw main timer
        ctx.fillStyle = "#373737";
        ctx.font = "80px sans-serif";
        ctx.fillText(timer.main, 23, 80);

        //draw interval
        ctx.fillStyle = "dodgerblue";
        ctx.font = "30px sans-serif";
        ctx.fillText(timer.interval, 130, 140);

    }

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(this.update, ms);
            startTime = Date.now();
            lastLap = startTime;
            this.isOn = true;
        }
    }

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            this.isOn = false;
        }
    }

    this.reset = function () {
        if (!this.isOn) {

            lastLap = 0;
            this.laps = [];

            drawTimer({
                main: "00:00.000",
                interval: "00:00.000"
            });
        }
    }

    this.lap = function () {
        if (this.isOn) {

            this.laps.push({
                interval: formatTime(Date.now() - lastLap),
                atTime: formatTime(Date.now() - startTime)
            });
            lastLap = Date.now();
        }
    }

    this.update = function () {

        drawTimer({
            main: formatTime(Date.now() - startTime),
            interval: formatTime(Date.now() - lastLap)
        })
    }


}