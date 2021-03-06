function deletepoll(id) {
    console.log("delete");
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', "/poll/" + id, true);
    xhr.send();
};

function vote(pollid, selection) {
    var xhr = new XMLHttpRequest();
    console.log(pollid + ' ' + selection);
    xhr.open('POST', "/poll/" + pollid, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({choice:selection}));
};


//document.getElementById("myChart").onload = 
function pollchart(pollid) {
var xhr = new XMLHttpRequest();
var polldata;
xhr.open("GET", "https://stvapp.herokuapp.com/polldata/" + pollid, true); // true for asynchronous 
xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
            console.log("app.js" + xhr.responseText);
            polldata = JSON.parse(xhr.responseText);
            console.log("polldata" + polldata.choices);
                    var labels = [];
					for (var key in polldata.choices) {
    				labels.push(key);
				}
		var data = Object.keys(polldata.choices).map(function(key) {
    		return polldata.choices[key];
        });
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
})
};
    xhr.send();
};
