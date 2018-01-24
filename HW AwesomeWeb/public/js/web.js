
const userTab=()=>{
    const username=$('input[name="username"]').val().trim();
    if (username){
        $("#require-username-error").css("display", "none");
        $.ajax({
            url:'/api/check-user/'+username
        })
        .done((result) => {
            if (!result.success){
                $("#username-error").css("display", "block");
                errorUser=false;
            }else{
                $("#username-error").css("display", "none");
                errorUser=true;    
            }
        })
        .fail((err) => {
        }) 
    }else{
        $("#require-username-error").css("display", "block");
        $("#username-error").css("display", "none");
        errorUser=false;
    }
    return errorUser;
}


const emailTab=()=>{
    const email=$('input[name="email"]').val().trim();
    if (email){
        $("#require-email-error").css("display", "none");
        $.ajax({
            url:'/api/check-email/'+email
        })
        .done((result) => {
            if (!result.success){
                $("#email-error").css("display", "block");
                errorEmail=false;
            }else{
                $("#email-error").css("display", "none");
                errorEmail=true;
            }
        })
        .fail((err) => {
        })
    }else{
        $("#require-email-error").css("display", "block");
        $("#email-error").css("display", "none");
        errorEmail=false;
    }
    return errorEmail;
}

$('input[name="username"]').on('blur',userTab);
$('input[name="email"]').on('blur',emailTab);

$('button[name="submit"]').on('click',(event)=>{
    $("#checkbox-error").css("display", "none");
    ckemail=emailTab();
    ckuser=userTab();
    ckbox=$('input[name="checkbox"]').is(':checked');

    console.log(ckuser,ckemail,ckbox);
    
    if ( !ckemail||!ckuser ||!ckbox)
    {
        if (!ckbox){
            $("#checkbox-error").css("display", "block");      
        } 
       event.preventDefault();
    }
   // event.preventDefault();
})



