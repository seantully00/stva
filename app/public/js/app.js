function deletepoll(id) {
    console.log("delete");
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', "/poll/" + id, true);
    xhr.send();
};

function vote(pollid, selection) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/poll/" + pollid, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({choice:selection}));
};