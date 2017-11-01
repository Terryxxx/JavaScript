$(function(){
    $('#mainForm :input').blur(function(){
        var $parent = $(this).parent();
        $parent.find('.tip-box').remove();
        $parent.find('.err-ico').remove();
        $parent.find('.tip-font').remove();
        //verify name
        if($(this).is('#name')){
            if($(this).val() == ""){
                var error_msg = 'User name required.';
                $(".names").css("width","0%");
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else{
                $(".names").css("width","25%");
            }
        }
        //verify password
        if($(this).is('#password')){
            if($(this).val() == ""){
                var error_msg = 'Password required.';
                $(".pwds").css("width","0%");
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else if($(this).val().length < 6){
                var error_msg = 'Password can not be less than 6 charachters.';
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else{
                $(".pwds").css("width","25%");
                $('.pwds').css("background","yellow")
            }
        }

        if($(this).is('#password2')){
            var pwd = $('#password').val();
            if($(this).val() == ""){
                var error_msg = 'Confirm password required.';
                $(".cpwds").css("width","0%");
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else if(pwd != $(this).val()){
                var error_msg = 'Twice password different.';
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else{
                $(".cpwds").css("width","25%");
                $(".cpwds").css("background","green")
            }
        }

        //verify Email
        if($(this).is('#email')){
            if($(this).val() == ""){
                var error_msg = 'Email address required.';
                $(".emails").css("width","0%");
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else if(($(this).val() != "" && !/\w+[@]{1}\w+[.]\w+/.test($(this).val()))){
                var error_msg = 'Enter valid email address.';
                $parent.append('<div class="tip-box"><i class="err-ico"></i><span class="tip-font ">'+error_msg+'</span></div>');
            }else{
                $(".emails").css("width","25%");
                $('.emails').css("background","red");
            }
        }
    }).keyup(function(){
        $(this).triggerHandler('blur');
    }).focus(function(){
        $(this).triggerHandler('blur');
    });


    $('#submit').click(function(){
        $('#mainForm .form-group :input').trigger('blur');
        var numError = $('.tip-font').length;
        if(numError){
            return false;
        }
        confirm("Register successful!");
    });

    $('#reset').click(function(){
        $('.tip-box').remove();
        $(".progress-bar").css("width","0%");
    });

});