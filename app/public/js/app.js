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


function chart(pollid) {
var xhr = new XMLHttpRequest();
var api =
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [{{ labels }}],
        datasets: [{
            label: '# of Votes',
            data: [{{ data }}],
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
});
}