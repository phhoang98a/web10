var socket = io();


$('#message').on('keypress', (e) => {
    if (e.keyCode == 13) {
        var user = $("#user").val();
        var message = $("#message").val();
        var output = $('#output').val();
        var feedback = $('#feedback').val();

        // socket.emit('chat', {
        //     user: user,
        //     message: message
        // });
        // console.log(message);
        // socket.on('message')

        // let room = 'chatRoom1';
        // socket.emit('subcribe', room);

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

    let searchInput = $('input[ name = search ]').val();

    $.ajax({
        url: '/api/chat',
        method: 'POST',
        data: {
            search: searchInput
        }
    }).done((result) => {

        if (result) {
            $('#search_div').css("display", "block");
            $('#setUsername').text(result.username);
            searchUserId = result._id;
        } else {
            $('#search_div').css("display", "none");
        }


    });
});

// let checkSearchApi = (currentUserId, searchUserId) => {
//         if (currentUserId == searchUserId) {
//             console.log('chay vao if');
//             $('#search_div').click(false);
//             $('#search_div').css('cursor', 'default');
//         } else {
//             console.log('chay vao else');
//             $('#search_div').click(true);
//             $('#search_div').css('cursor', 'pointer');

//         }
//     }


$('#search_div').on('click', (e) => {
    if (typeof searchUserId !== 'undefined') {
        window.location.replace(`/api/chat/${searchUserId}`);
    }
});

let checkChatApi = (url) => {
    var testUrl = '/api/chat';
    socket.emit('url', url.indexOf(testUrl) >= 0);
}

$(document).ready(() => {
    var url = window.location.href;
    checkChatApi(url);
    // if (typeof currentUserId !== 'undefined' &&
    //     typeof searchUserId !== 'undefined') {
    //     console.log(currentUserId, searchUserId);
    //     checkChatApi(currentUserId, searchUserId);
    // }
});