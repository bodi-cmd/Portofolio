$(document).ready(function () {

    $('.fadein').children().css('opacity', '0');
    
    $('.fadein').each( function(i){
            
        var bottom_of_element = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        if( bottom_of_window > bottom_of_element + 200 ){
            $(this).children().each(function (index, element) {
                $(element).delay(index*200).animate({'opacity':'1'},1000);
            });
        }
        
    }); 

        
    $(window).scroll( function(){
        $('.fadein').each( function(i){
            
            var bottom_of_element = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element + 200 ){
                $(this).children().each(function (index, element) {
                    $(element).delay(index*200).animate({'opacity':'1'},1000);
                });
            }
            
        }); 
    });

    $('#hire').click(function () {
        $('html, body').animate({
            scrollTop: $('.contact_card').offset().top
        }, 1000);
    });
    $('#contact').click(function () {
        $('html, body').animate({
            scrollTop: $('.contact_card').offset().top
        }, 1000);
    });


})