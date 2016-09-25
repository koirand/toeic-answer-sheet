var readingFirstQuestionNum = 101;
var currentQuestionNum = readingFirstQuestionNum;
var timer;
var startTime;
var currentTime;
var elapseSec;
 
function start(clickedNum)
{
    //stop timer
    stop();

    //update current question number
    currentQuestionNum = clickedNum;

    //change button "Start" --> "Stop"
    document.getElementsByClassName("btn-start")[currentQuestionNum - readingFirstQuestionNum].style.display = "none";
    document.getElementsByClassName("btn-stop")[currentQuestionNum - readingFirstQuestionNum].style.display = "inline";
    
    startTime = new Date();
    timer = setInterval('updateTime()', 100);
}

function choice(clickedNum)
{
    //timer is working --> stop
    if (document.getElementsByClassName("btn-start")[currentQuestionNum - readingFirstQuestionNum].style.display == "none") {
        //stop timer
        stop();

        //auto start mode --> start next question
        if (document.getElementById("autoStart").checked === true) {
            if (clickedNum - 100 + 1 <= document.getElementsByClassName("btn-start").length) {
                start(clickedNum + 1);
            }
        }
    }
}

function stop()
{
    //stop timer
    clearInterval(timer);

    //change button "Stop" --> "Start"
    document.getElementsByClassName("btn-stop")[currentQuestionNum - readingFirstQuestionNum].style.display = "none";
    document.getElementsByClassName("btn-start")[currentQuestionNum - readingFirstQuestionNum].style.display = "inline";

}

function updateTime()
{
    currentTime = new Date();
    elapseSec = (Math.round((currentTime - startTime) / 100) / 10.0).toFixed(1);
    document.getElementsByClassName("time")[currentQuestionNum - readingFirstQuestionNum].value = elapseSec;
}

function convertToCSV()
{
    var data = "";
    var a = false;
    var b = false;
    var c = false;
    var d = false;
    for (var i=0; i < document.getElementsByClassName("question").length; i++) {

        a = document.getElementsByClassName("question")[i].getElementsByClassName("a")[0].checked;
        b = document.getElementsByClassName("question")[i].getElementsByClassName("b")[0].checked;
        c = document.getElementsByClassName("question")[i].getElementsByClassName("c")[0].checked;
        d = document.getElementsByClassName("question")[i].getElementsByClassName("d")[0].checked;

        if (a + b + c + d != "") {
            //No.
            data +=  document.getElementsByClassName("question")[i].getElementsByClassName("No.")[0].innerText;
            data += ",";

            //answer
            if (a) {
                data += "A";
            } else if (b) {
                data += "B";
            } else if (c) {
                data += "C";
            } else if (d) {
                data += "D";
            }
            data += ",";

            //give up
            data +=  document.getElementsByClassName("question")[i].getElementsByClassName("giveup")[0].checked;
            data += ",";

            //time
            if (document.getElementsByClassName("question")[i].getElementsByClassName("time").length > 0) {
                data +=  document.getElementsByClassName("question")[i].getElementsByClassName("time")[0].value;
            }
            data += ",";

            //correct
            data +=  document.getElementsByClassName("question")[i].getElementsByClassName("correct")[0].checked;
            data += ",";

            //memo
            data += "\"";
            data +=  document.getElementsByClassName("question")[i].getElementsByClassName("memo")[0].value;
            data += '\"\r\n';
        }
    }
    if (data != "") {
        document.getElementById("csv").value = data;
    } else {
        document.getElementById("csv").value = "There is no answer.";
    }

}
