/*
  Next time I need to add a way to implement the new schedule
  I recently fixed the problem where fabio's built schedule would have a color for everyone
  I am in the process of redesigning this from the ground up, but this will still be functional
*/


function main() {
  addSpaceForMenuButton();
  showLoginPage();
  $("#menuButton").click(toggleNavOverlay);
  $("#enterButton").click(loginProcess);
  $('#password').bind('keyup', function(e) {
    if (e.keyCode === 13) {
      loginProcess();
    }
  });
  createSchedule();
  $("#scheduleEmployee").click(addToSchedule);
  $("#submitSchedule").click(sendInformation);
  $("#backWeek").click(backWeek);
  $("#nextWeek").click(addWeek);

  // TESTING 
//   testMode();
  launchBuilderPage();
  // TESTING 
}

function addSpaceForMenuButton() {
  let menuButtonHeight = $("#menuButton").css("height");
  menuButtonHeight = parseInt(menuButtonHeight);
  let bodyBottomMargin = $("body").css("margin-bottom");
  bodyBottomMargin = parseInt(bodyBottomMargin);
  let newBottomMargin = menuButtonHeight + bodyBottomMargin;
  $("body").css("margin-bottom", newBottomMargin + "px");
}

var adminUser = false;

function equipMenu() {
  $("#overlay ul li").click(function() {
    if ($(this).text() == "Menu") {
      return;
    }
    if ($(this).text() == "Builder") {
      if (!adminUser) {
        alert("Admins Only!");
        return;
      }
    }
    let myId = $(this).attr("id");
    myId = myId.slice(0, -2);
    let idToShow = myId + "Page";
    let pages = $(".webpage");
    pages.css("display", "none");
    $("#" + idToShow).css("display", "block");
    $("#overlay").toggleClass("offScreen");
  });
  $("#builderLi").one("click", function() {
    let myTable = $("#schedule")[0].cloneNode(true);
    $("#builderTable").replaceWith(myTable);
    myTable.id = "builderTable";
    selectDateFunctionality();
  });
}

function testMode() {
  $(".webpage").css("display", "none");
  $("#schedulePage").css("display", "block");
  equipMenu();
}

function showLoginPage() {
  $("#loginPage").css("display", "block");
}

function toggleNavOverlay() {
  $("#overlay").toggleClass("offScreen");
}

function arrayIdSort(arrayToSort) {
  let neededLength = arrayToSort.length;
  var sortedArray = [];
  for (let step = 0; step < neededLength; step++) {
    sortedArray[step] = "";
  }
  for (let i in arrayToSort) {
    let dateToSort = arrayToSort[i];
    let dayOfWeek = dateToSort.id;
    sortedArray[dayOfWeek] = dateToSort;
  }
  return sortedArray;
}

function upperFirstLetter(word) {
  let wordArray = word.split("");
  wordArray[0] = wordArray[0].toUpperCase();
  for (let i = 1; i < wordArray.length; i++) {
    wordArray[i] = wordArray[i].toLowerCase();
  }
  let newWord = wordArray.join("");
  return newWord;
}

var users = {
  "fabio": "password",
  "maria": "password",
  "chas": "password",
  "chris": "password",
  "rachel": "password",
  "ezekiel": "password"
}

function loginProcess() {
  var username = $("#username").val().toLowerCase();
  var password = $("#password").val().toLowerCase();
  if (username !== "" && password !== "") {
    var userCorrect = checkUser(username);
    if (userCorrect) {
      var passCorrect = checkPass(username, password);
      if (passCorrect) {
        if (username == "fabio") {
          adminUser = true;
        }
        launchPage(username);
        equipMenu();
      } else {
        alert("Sorry, either your username or password is incorrect");
      }
    } else {
      alert("Sorry, either your username or password is incorrect")
    }
  } else {
    alert("Please enter a username and password!")
  }
}

function checkUser(username) {
  if (username in users) {
    return true;
  } else {
    return false;
  }
}

function checkPass(username, password) {
  if (users[username] == password) {
    return true;
  } else {
    return false;
  }
}

function launchPage(username) {
  
  try {
  if (thisWeek) {
    $("#schedule")[0].outerHTML = thisWeek;
    $("table")[0].id = "schedule";
  }
  } catch (e) {
    
  }
  if (username == "fabio") {
    username = "Admin";
  }
  $("#loginPage").css("display", "none");
  $("header h1").text(upperFirstLetter(username));
  $("#schedulePage").css("display", "block");
  $("#"+username+"Tr td:nth-child(even)").css("background-color","lightblue");
  $("#"+username+"Tr td:nth-child(odd)").css("background-color","cadetblue");
  // ACTIVATE MENU BUTTON, 
  // Highlight current user
  //   $("#menuButton").click(function(){
  //     alert("Works");
  //   })
}

var userSchedule = {
  "fabio": [new Date(), new Date()],
  "maria": "05-26.08:00-18:15",
  "chas": "05-26.08:00-18:15",
  "chris": "05-26.08:00-18:15",
  "rachel": "05-26.08:00-18:15",
  "ezekiel": "05-26.08:00-18:15"
}

var newSchedule = {
  "fabio": [],
  "maria": [],
  "chas": [],
  "chris": [],
  "rachel": [],
  "ezekiel": []
}

function addToSchedule() {
  //   Get input information
  let employee = $("#userToSchedule").val()
  let sDate = $("#start_dt").val();
  let sTimeInput = $("#start_tm").val();
  let eTimeInput = $("#end_tm").val();

  //To create date obj
  let year = parseInt(sDate.split("-")[0]);
  let month = parseInt(sDate.split("-")[1]);
  let date = parseInt(sDate.split("-")[2]);
  let sDateObj = new Date(year, month - 1, date);

  let tdToEdit = $("#builderPage #" + employee.toLowerCase() +
    "Td" + sDateObj.getDayM());
  tdToEdit.text(sTimeInput + " - " + eTimeInput);



  /* This is creating an object from start and end times! Potentially
  useful for future submit schedule option */
  //   let arrayOfInfo = [];
  //   sDate = sDate.split("-");
  //   arrayOfInfo.push(sDate[0]);
  //   arrayOfInfo.push(sDate[1]);
  //   arrayOfInfo.push(sDate[2]);
  //   sTimeInput = sTimeInput.split(":");
  //   arrayOfInfo.push(sTimeInput[0]);
  //   arrayOfInfo.push(sTimeInput[1]);
  //   let s = arrayOfInfo; //A very short variable
  //   let a = 0; //A way to step through index stuffs
  //   let sTime = new Date(s[a++], s[a++], s[a++], s[a++], s[a++]); //I know this doesnt tell you much but I really dont want to write out each thing again and again
  //   arrayOfInfo.pop();
  //   arrayOfInfo.pop(); //Pop last two to enter the eTimeInput
  //   eTimeInput = eTimeInput.split(":");
  //   arrayOfInfo.push(eTimeInput[0]);
  //   arrayOfInfo.push(eTimeInput[1]);
  //   a = 0; //A way to step through index stuffs
  //   let eTime = new Date(s[a++], s[a++], s[a++], s[a++], s[a++]); //I know this doesnt tell you much but I really dont want to write out each thing again and again
  //   alert(sTime + eTime);



  //   make into array
  //   create date object
}


// format MM-DD.HH:MM-HH:MM,MM-DD.HH:MM-HH:MM, i.e. 07-02.12:00-18:15,07-03.08:00-15:00

function baseSchedule() { //For testing, create a base schedule
  for (let i in userSchedule) {
    var arrayOfSchedule = [];
    for (let counter = 1; counter <= 7; counter++) {
      let startDateToAdd = new Date(2018, 05, 1 + counter);
      let endDateToAdd = new Date(2018, 05, 1 + counter);
      arrayOfSchedule.push(startDateToAdd);
      arrayOfSchedule.push(endDateToAdd);
    }
    userSchedule[i] = arrayOfSchedule;
  }
}

var userRows = {};

function createSchedule() {
  baseSchedule();
  var myTable = $("#schedule")[0];
  //creates rows for each person scheduled
  for (let i in userSchedule) {
    let myUser = i;
    userRows[myUser] = document.createElement("tr");
    let userTr = userRows[myUser];
    userTr.id = myUser + "Tr";
    let th = document.createElement("th");
    let thText = document.createTextNode(upperFirstLetter(myUser));
    th.appendChild(thText);
    userTr.appendChild(th);
    myTable.appendChild(userTr);
  }
  //for each row add the times worked
  propagateRows();

}

function addSpecificIdToTd() {
  for (let user in userRows) {
    let currentRow = userRows[user];
    let arrayOfRowElements = currentRow.childNodes;
    for (let i in arrayOfRowElements) {
      let rowElement = arrayOfRowElements[i];
      if (rowElement.id !== "") {
        rowElement.id = currentRow.id.slice(0, -1) + "d" + rowElement.id;
      }
    }
  }
}

function propagateRows() {
  for (let user in userSchedule) {
    let mySchedule = userSchedule[user];
    let myRow = userRows[user];
    var unsortedTd = [];
    for (let dateIndex = 0; dateIndex < mySchedule.length; dateIndex += 2) {
      let newTd = document.createElement("td");
      let startTime = "" + mySchedule[dateIndex].getHours() + ":" + mySchedule[dateIndex].getMinutes() + "";
      let endTime = "" + mySchedule[dateIndex + 1].getHours() + ":" + mySchedule[dateIndex + 1].getMinutes() + "";
      let tdText = startTime + " - " + endTime;
      if (tdText == "0:0 - 0:0") {
        tdText = "-";
      }
      let tdTextNode = document.createTextNode(tdText);
      newTd.appendChild(tdTextNode);
      newTd.id = mySchedule[dateIndex].getDayM()
      unsortedTd.push(newTd);
    }
    let sortedTd = arrayIdSort(unsortedTd);
    for (let i in sortedTd) {
      let myTd = sortedTd[i];
      myRow.appendChild(myTd);
    }
  }
  addSpecificIdToTd();
}

function dateToString(dateObj) {
  let stringToReturn = dateObj.getFullYear() + "-";
  if ((dateObj.getMonth() + 1).toString().length != 2) {
    stringToReturn += "0" + (dateObj.getMonth() + 1) + "-";
  } else {
    stringToReturn += (dateObj.getMonth() + 1) + "-";
  }
  if (dateObj.getDate().toString().length != 2) {
    stringToReturn += "0" + dateObj.getDate();
  } else {
    stringToReturn += dateObj.getDate();
  }
  return stringToReturn;

}

Date.prototype.mDates = {
  "0" : "6",
  "1" : "0",
  "2" : "1",
  "3" : "2",
  "4" : "3",
  "5" : "4",
  "6" : "5"
}

Date.prototype.getDayM = function () {
  let day = this.getDay();
  return parseInt(this.mDates[day]);
}

function dateToDay(dateObj, day) {
  if (day == "nxt") {
    return dateObj.setDate(dateObj.getDate()+1);
  }
  if (day == dateObj.getDayM()) {
    return dateObj;
  }
  let currentDay = dateObj.getDayM()
  let step;
  if (currentDay > day) {
    step = -1;
  }
  if (currentDay < day) {
    step = 1;
  }
  while (dateObj.getDayM() != day) {
    dateObj.setDate(dateObj.getDate()+step);
  }
  return dateObj;
}

var firstOfWeek = dateToDay(new Date(), 0);
var lastOfWeek = dateToDay(new Date(), 6);
function setDateDisplay() {
  let displayString = firstOfWeek.getMonth()+1 + "("+
    firstOfWeek.getDate() + " - " +
    lastOfWeek.getDate() + ")";
  $("#displayDate").attr("value", displayString);
}

function launchBuilderPage() {
  for (let user in users) {
    let selectOption = document.createElement("option");
    let optionText = document.createTextNode(upperFirstLetter(user));
    selectOption.appendChild(optionText);
    $("#userToSchedule")[0].appendChild(selectOption);
  }
  let startDtString = dateToString(new Date());
  $("#start_dt").attr("value", startDtString);
  
  setDateDisplay();
}

function backWeek() {
  for (let i = 0; i != 7; i++) {
    firstOfWeek.setDate(firstOfWeek.getDate()-1);
    lastOfWeek.setDate(lastOfWeek.getDate()-1);
  }
  setDateDisplay();
}
function addWeek() {
  for (let i = 0; i != 7; i++) {
    firstOfWeek.setDate(firstOfWeek.getDate()+1);
    lastOfWeek.setDate(lastOfWeek.getDate()+1);
  }
  setDateDisplay();
}


var lastSelected;

function selectDateFunctionality() {
  $("#builderPage td").click(function() {

    try {
      lastSelected.toggleClass("highlightBlue");
    } catch (e) {

    }
    $(this).toggleClass("highlightBlue");
    lastSelected = $(this);

    // Make Employee Selection Match Table Selection
    let tdId = this.id;
    let userSelected = tdId.slice(0, -3);
    userSelected = upperFirstLetter(userSelected);
    $("#userToSchedule").val(userSelected);

    // Make Date Selection Match Table Selection 
    let tdDay = this.id.slice(-1);
    tdDay = parseInt(tdDay);
    let todayDay = new Date().getDayM();
    todayDay = parseInt(todayDay);
    var dateToChangeTo = new Date();
    while (dateToChangeTo.getDayM() < tdDay) {
      dateToChangeTo.setDate(dateToChangeTo.getDate() + 1);
    }
    while (dateToChangeTo.getDayM() > tdDay) {
      dateToChangeTo.setDate(dateToChangeTo.getDate() - 1);
    }
    let dateStringVal = dateToString(dateToChangeTo);
    $("#start_dt").val(dateStringVal);
  });
}

function sendInformation() {
  lastSelected.toggleClass("highlightBlue");
  $("#formTextarea").val((JSON.stringify($("#builderTable")[0].outerHTML)));
  $("#formWeek").val($("#displayDate")[0].value);
  $("form").submit();
}

$(main);