let currentDay = $("#currentDay");

currentDay.text(moment().format("dddd, MMMM Do"));

/*
time1 = 9
time2 = 10
time3 = 11
time4 = 12
time5 = 1
time6 = 2
time7 = 3
time8 = 4
time9 = 5
*/

let timeCheck = (moment().format("LT")).split(/[: ]+/);
timeCheck[0] = 11;
timeCheck[2] = "AM"

for (let i = 1; i <= 9; i++) {
  let hourCSS = "time" + i;
  let AMdiff = i + 8;
  let PMdiff = i - 4;

  if (timeCheck[2] == "AM") {
    if (timeCheck[0] < 9 || timeCheck[0] == 12) {
      $("#" + hourCSS + " > textarea").addClass('future');
    }
    if (timeCheck[0] >= 9) {
      if (timeCheck[0] == AMdiff) {
        $("#" + hourCSS + " > textarea").addClass('present');
      }
      if (timeCheck[0] > AMdiff) {
        $("#" + hourCSS + " > textarea").addClass('past');
      }
      if (timeCheck[0] < AMdiff) {
        $("#" + hourCSS + " > textarea").addClass('future');
      }
    }
  }

  if (timeCheck[2] == "PM") {
    if (timeCheck[0] > 5 && timeCheck[0] != 12) {
      $("#" + hourCSS + " > textarea").addClass('past');
    } else if (timeCheck[0] == 12) {
      if (timeCheck[0] == AMdiff) {
        $("#" + hourCSS + " > textarea").addClass('present');
      }
      if (timeCheck[0] > AMdiff) {
        $("#" + hourCSS + " > textarea").addClass('past');
      }
      if (i > 4) {
        $("#" + hourCSS + " > textarea").addClass('future');
      }
    }
    if (timeCheck[0] <= 5) {
      if (timeCheck[0] == PMdiff) {
        $("#" + hourCSS + " > textarea").addClass('present');
      }
      if (timeCheck[0] > PMdiff) {
        $("#" + hourCSS + " > textarea").addClass('past');
      }
      if (timeCheck[0] < PMdiff) {
        $("#" + hourCSS + " > textarea").addClass('future');
      }
    }
  }
}

loadSchedule();

$(".saveBtn").click(function() {
  let content = $(this).parent().find("textarea").val();
  let contentNum = $(this).parent().find("textarea").attr("data-hour");

  localStorage.setItem("time" + contentNum, content);
  $("#time" + contentNum).find("textarea").val(content);
});

function loadSchedule() {
  for (let i = 1; i <= 9; i++) {
    $("#time" + i).find("textarea").val(localStorage.getItem("time" + i));
  }
}