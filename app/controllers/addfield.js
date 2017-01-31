var counter = 5;

function addfields() {
   var d = document.getElementById("choices");

   d.innerHTML += "Choice " + counter + " :<input type='text' name='choice" + counter + "'><br>";
   counter = counter + 1;
}