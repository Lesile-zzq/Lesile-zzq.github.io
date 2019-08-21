$(function(){
    $('.anchor').click(function (e) {
        var  href = $(this).attr("href");
        var pos = $(href).offset().top;
        $('html,body').animate({scrollTop: pos},500);
        return false;
    });
})

