function deletepoll(id) {
    console.log("delete");
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', "/poll/" + id, false);
    xhr.send();
};