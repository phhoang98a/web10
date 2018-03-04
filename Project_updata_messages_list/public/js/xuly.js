var socket=io('http://localhost:6969');


socket.on('sever-send-listMessages',function(data){

    $('#boxContent').html("");

    data.forEach(function(i){
        $('#boxContent').append("<div class='user'>"+ i.name +"</div>")
    })

})


socket.on('sever-send-message',function(data){
    $('#listMessages').append("<div class='ms'>"+data.un+':'+data.nd +"</div>");
})


$(document).ready(function(){

    socket.emit('user-send-profile');

    $('#btnLogout').click(function(){
        socket.emit('user-send-logout');
    })

    $('#btnSend').click(function(){
        socket.emit('user-send-message',$('#txtMessages').val());
    })

})