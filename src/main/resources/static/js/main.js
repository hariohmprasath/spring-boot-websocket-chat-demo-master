'use strict';

var processForm = document.querySelector('#processForm');

var stompClient = null;
var process = null;

function connect(event) {

    process = document.querySelector('#process').value.trim();
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/status/'+process, onMessageReceived);

    const Http = new XMLHttpRequest();
    const url='/status?processId='+process;
    Http.open("POST", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
}


function onError(error) {
    console.log(error);
}

function onMessageReceived(payload) {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.innerHTML = payload.body;
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

processForm.addEventListener('submit', connect, true)
