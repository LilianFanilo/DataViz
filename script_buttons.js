let data1 = false, data2 = false, data3 = false;




function annee(){
  
}
function trimestre(){
  
}
function mois(){
  
}

function showData1() {
  console.log("BAHAHHA")
  if (data1 === true) {
    document.querySelector(".area1").style.display = "none";
    data1 = false;
  }
  else {
    document.querySelector(".area1").style.display = "block";
    data1 = true;
  }

}
function showData2() {
  console.log("BAHAHHA")
  if (data2 === true) {
    document.querySelector(".area2").style.display = "none";
    data2 = false;
  }
  else {
    document.querySelector(".area2").style.display = "block";
    data2 = true;
  }

}
function showData3() {
  console.log("BAHAHHA")
  if (data3 === true) {
    document.querySelector(".area3").style.display = "none";
    data3 = false;
  }
  else {
    document.querySelector(".area3").style.display = "block";
    data3 = true;
  }

}