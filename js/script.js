window.addEventListener('load', function () {

    var watch;
    var app = document.getElementById("app");
    var lapTable = document.getElementById("lapTable");
    var lapsContainer = document.getElementById("lapsContainer");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var btnStart = document.getElementById('start');
    var btnReset = document.getElementById('reset');


    function initialize() {
        watch = new stopWatch(ctx, 90);
        watch.reset();

        app.style.marginTop = (window.innerHeight - 500) / 2; // app.height = 500

    }

    function start() {
        watch.start();
        btnStart.textContent = "Stop";
        btnReset.textContent = "Lap";
    }

    function stop() {
        watch.stop();
        btnStart.textContent = "Start";
        btnReset.textContent = "Reset";
    }

    function reset() {
        watch.reset();
        document.getElementById("lapTable").innerHTML = "";
    }

    function lap() {

        watch.lap();

        var lapNo = watch.laps.length;
        var lapInteval = watch.laps[lapNo - 1].interval;
        var lapTime = watch.laps[lapNo - 1].atTime;

        $("#lapTable").append('<tr> <td class="lapTableData"> <label class="lapNo">' + lapNo + ' </label> </td> <td class = "lapTableData"> <label class = "lapInterval">' + lapInteval + '</label> </td > <td class = "lapTableData"> <label class="lapTime">' + lapTime + ' </label> </td > </tr>');

        var scrollHeight = Math.max(lapsContainer.scrollHeight, lapsContainer.clientHeight);
        lapsContainer.scrollTop = scrollHeight - lapsContainer.clientHeight;

    }

    btnStart.addEventListener('click', function () {
        (watch.isOn) ? stop(): start();
    });

    btnReset.addEventListener('click', function () {
        (watch.isOn) ? lap(): reset();
    });


    initialize();

});