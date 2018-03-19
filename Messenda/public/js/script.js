var socket = io();
//const messageModel = require('../models/messageModel');


$('#message').on('keypress', (e) => {
    if (e.keyCode == 13) {
        var user = $("#user").val();
        var message = $("#message").val();
        var output = $('#output').val();
        var feedback = $('#feedback').val();

        socket.emit('send message', {
            message: message
        });
        $("#message").val('');
    }
    else if ($("#message").val() !== "") {
        socket.emit('typing', username);
    }
    else {
        socket.emit('stoptyping', username);
    }
});

var username = "";
socket.on('username', (data) => {
    username = data;
});

socket.on('private chat', (msg) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + msg.user + ': </strong>' + msg.message + '</p>';

});

socket.on('typing', (data) => {
    if (data) {
        feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    } else {
        feedback.innerHTML = '';
    }
});

$('#buttonCheckSession').on('click', (e) => {
    $.get('/checkSession').then(data => console.log(data));
});


var currentUserId;


var searchUserId;

$('#search').on('keyup', (e) => {
    e.preventDefault();

    let searchInput = $('input[ name = search ]').val().trim();

    $.ajax({
        url: '/api/chat',
        method: 'POST',
        data: {
            search: searchInput
        }
    }).done((result) => {

        if ((searchInput==result.stringSearch) && (result.listName.length>0) && (searchInput!='')) {
            $('#search_div').css("display", "block");
            $('#search_div').html("");
            var amount=0;
    
            for (var i=0; i<result.listName.length;i++){
                amount=amount+1;
                $('#search_div').append(
                    "<div id='"+ amount +"'>"+
                        "<img src="+result.url[i]+">"+
                        "<div class='userEmail' style='display: none;' >"+result.email[i]+"</div>"+                     
                        "<div class='userID'  style='display: none;' >"+result.listID[i]+"</div>"+
                        "<div class='userName' onclick='start(\"" + amount + "\")'>"+ result.listName[i] +"</div>"+
                    "</div>"   
                )
            }
        } else {
            $('#search_div').css("display", "none");
        }


    });
});


function start(ids){
    searchUserId=document.getElementById(ids).getElementsByClassName("userID")[0].innerHTML;
    searchUserName=document.getElementById(ids).getElementsByClassName("userName")[0].innerHTML;
    if (typeof searchUserId !== 'undefined') {
        window.location.replace(`/api/chat/${searchUserId}/${searchUserName}`);
    }
}



let checkChatApi = (url) => {
    var testUrl = '/api/chat';
    socket.emit('url', url.indexOf(testUrl) >= 0);
}

$(document).ready(() => {
    var url = window.location.href;
    checkChatApi(url);
});