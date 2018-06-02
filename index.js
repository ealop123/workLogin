function main() {
  addSpaceForMenuButton();
  showLoginPage();
  $("#menuButton").click(toggleNavOverlay);
  $("#enterButton").click(loginProcess);
  $('#password').bind('keyup', function(e) { if (e.keyCode === 13) { loginProcess(); }});
  createSchedule();
  $("#scheduleEmployee").click(addToSchedule);
  
  // TESTING 
  testMode();
  launchBuilderPage();
  // TESTING 
}

function addSpaceForMenuButton () {
  let menuButtonHeight = $("#menuButton").css("height");
  menuButtonHeight = parseInt(menuButtonHeight);
  let bodyBottomMargin = $("body").css("margin-bottom");
  bodyBottomMargin = parseInt(bodyBottomMargin);
  let newBottomMargin = menuButtonHeight + bodyBottomMargin;
  $("body").css("margin-bottom", newBottomMargin+"px");
}

function equipMenu() {
  $("#overlay ul li").click(function(){
    let myId = $(this).attr("id");
    myId = myId.slice(0, -2);
    let idToShow = myId+"Page";
    let pages = $(".webpage");
    pages.css("display", "none");
    $("#"+idToShow).css("display", "block");
    $("#overlay").toggleClass("offScreen");
  });
  $("#builderLi").click(function(){
    let myTable = $("#schedule")[0].cloneNode(true);
    $("#builderTable").replaceWith(myTable);
    myTable.id = "builderTable";
  });
}

function testMode() {
  $(".webpage").css("display", "none");
  $("#schedulePage").css("display","block");
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
        launchPage(username);
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
  $("#loginPage").css("display", "none");
  $("header h1").text("Welcome " + upperFirstLetter(username));
  $("#schedulePage").css("display", "block");
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

function addToSchedule() {
//   Get input information
//   make into array
//   create date object
}


// format MM-DD.HH:MM-HH:MM,MM-DD.HH:MM-HH:MM, i.e. 07-02.12:00-18:15,07-03.08:00-15:00

function baseSchedule () { //For testing, create a base schedule
  for (let i in userSchedule) {
    var arrayOfSchedule = [];
    for ( let counter = 1; counter <= 7; counter++  ) {
      let startDateToAdd = new Date(2018, 05, 1+counter);
      let endDateToAdd = new Date(2018, 05, 1+counter);
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
    userTr.id = myUser+"Tr";
    let th = document.createElement("th");
    let thText = document.createTextNode(upperFirstLetter(myUser));
    th.appendChild(thText);
    userTr.appendChild(th);
    myTable.appendChild(userTr);
  }
  //for each row add the times worked
  propagateRows();
  
}

function propagateRows () {
  for (let user in userSchedule) {
    let mySchedule = userSchedule[user];
    let myRow = userRows[user];
    var unsortedTd = [];
    for (let dateIndex = 0; dateIndex < mySchedule.length; dateIndex += 2) {
      let newTd = document.createElement("td");
      let startTime = ""+mySchedule[dateIndex].getHours()+":"+mySchedule[dateIndex].getMinutes()+"";
      let endTime = ""+mySchedule[dateIndex+1].getHours()+":"+mySchedule[dateIndex+1].getMinutes()+"";
      let tdText = startTime + " - " + endTime;
      let tdTextNode = document.createTextNode(tdText);
      newTd.appendChild(tdTextNode);
      newTd.id = mySchedule[dateIndex].getDay()
      unsortedTd.push(newTd);
    }
    let sortedTd = arrayIdSort(unsortedTd);
    for (let i in sortedTd) {
      let myTd = sortedTd[i];
      myRow.appendChild(myTd);
    }
  }
}

function launchBuilderPage () {
  for (let user in users) {
    let selectOption = document.createElement("option");
    let optionText = document.createTextNode(upperFirstLetter(user));
    selectOption.appendChild(optionText);
    $("#userToSchedule")[0].appendChild(selectOption);
  }
}

$(main);