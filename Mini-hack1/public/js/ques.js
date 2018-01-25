
const questions=['',
'Chọn một số từ 1 đến 10, và nhận số điểm tương ứng - nhưng chỉ khi có ít hơn 17% số người chơi cũng chọn số đó.',
'Chọn 4 để nhận 4 điểm chắc chắn, hoặc chọn 10 và nhận được 10 chỉ khi ít hơn 20% số người chơi cũng chọn 10.',
'Chọn một số từ 1 đến 10, và nhận số điểm tương ứng - nhưng chỉ khi có ít hơn 13% số người chơi cũng chọn số đó.',
'Có tổng cộng X người đã từng chơi game này, theo bạn bao nhiêu người trong số họ đã chiến thắng?',
'Chọn một số từ 1 đến 10, và nhận số điểm tương ứng - nhưng chỉ khi có ít hơn 10% số người chơi cũng chọn số đó.',
'Chọn một số từ 1 đến 15, và ghi điểm nếu số đó nhỏ hơn trung bình cộng của tất cả những số người chơi đã chọn.'];

$(document).ready(function(){
    $('button').on('click',function(event){
        var addScore=$(this).attr('value')||document.getElementById("textArea").value;
        var score=document.getElementById('score').innerHTML;
        var numberQuestion=document.getElementById('number-question').innerHTML;
        
        $.ajax({
            url:'/api/'+numberQuestion+'/'+score+'/'+addScore
        })
        .done(result=>{
            $('#score').text(result.score);
            $('#number-question').text(result.numberQuestion);
            $('#question').text(questions[result.numberQuestion]);
    
            if (result.numberQuestion==2){
                $("#question2").css("display", "block");
                $("#question10").css("display", "none");
                $("#question15").css("display", "none");
                $("#question-text").css("display", "none");
            }else if (result.numberQuestion==6){
                $("#question2").css("display", "none");
                $("#question10").css("display", "none");
                $("#question15").css("display", "block");
                $("#question-text").css("display", "none");
            }else if (result.numberQuestion==4){
                $("#question2").css("display", "none");
                $("#question10").css("display", "none");
                $("#question15").css("display", "none");
                $("#question-text").css("display", "block");
            }else if (result.numberQuestion==0){
                $("#question2").css("display", "none");
                $("#question10").css("display", "none");
                $("#question15").css("display", "none");
                $("#question-text").css("display", "none");
                if (result.score>30){
                    $("#result-win").css("display", "block"); 
                    $("#number-ques").css("display", "none"); 
                }else{
                    $("#result-lose").css("display", "block");
                    $("#number-ques").css("display", "none"); 
                }
            }else{
                $("#question2").css("display", "none");
                $("#question10").css("display", "block");
                $("#question15").css("display", "none");
                $("#question-text").css("display", "none");
            }
        })
        .fail(err=>{
        });

    });    
})


