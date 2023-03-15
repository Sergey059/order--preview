
// ============= PRELOADER SCRIPT ===================
$(window).load(function() {
    setTimeout(function() {
        $('#preloader').addClass('hid');
    }, 50);
});
// ============= END PRELOADER SCRIPT ===================
/*closestchild*/

;
(function($) {
    $.fn.closestChild = function(selector) {
        var $children, $results;

        $children = this.children();

        if ($children.length === 0)
            return $();

        $results = $children.filter(selector);

        if ($results.length > 0)
            return $results;
        else
            return $children.closestChild(selector);
    };
})(window.jQuery);

/* /. closestchild*/


$(function() {
    var top_show = 280; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
    var speed = 500; // Скорость прокрутки
    var $backButton = $('#up');

    $(window).scroll(function() { // При прокрутке попадаем в эту функцию
        /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
        if ($(this).scrollTop() > top_show) {
            $backButton.fadeIn();
        } else {
            $backButton.fadeOut();
        }
    });

    $backButton.click(function() { // При клике по кнопке "Наверх" попадаем в эту функцию
        /* Плавная прокрутка наверх */
        scrollto(0, speed);
    });


    // scrollto
    window.scrollto = function(destination, speed) {
        if (typeof speed == 'undefined') {
            speed = 800;
        }
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination - 60
        }, speed);
    };
    $("a.scrollto").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        scrollto(destination);
        return false;
    });
    // end scrollto 


    // fancybox
    $('.fancybox').fancybox({
        padding: 0,
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('.fancyboxModal').fancybox({
        autoResize: true,
        padding: 0,
        openEffect: 'fade',
        closeEffect: 'fade',
        nextEffect: 'none',
        prevEffect: 'none',
        fitToView: false,
        maxWidth: '100%',
        scrolling: "no",
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    // end fancybox


    // validation

    $('.rf').each(function() {
        var item = $(this),

            btn = item.find('.btn');


        function checkInput() {
            item.find('select.required').each(function() {
                if ($(this).val() == '0') {

                    // Если поле пустое добавляем класс-указание
                    $(this).parents('.form-group').addClass('error');
                    $(this).parents('.form-group').find('.error-message').show();

                } else {
                    // Если поле не пустое удаляем класс-указание
                    $(this).parents('.form-group').removeClass('error');
                }
            });

            item.find('input[type=text].required').each(function() {
                if ($(this).val() != '') {
                    // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('error');
                } else {
                    // Если поле пустое добавляем класс-указание
                    $(this).addClass('error');
                    $(this).parent('.form-group').find('.error-message').show();

                }
            });


            item.find('input[type=file].required').each(function() {
                if ($(this).val() != '') {
                    // Если поле не пустое удаляем класс-указание
                    $(this).parents('fieldset').removeClass('error');
                } else {
                    // Если поле пустое добавляем класс-указание
                    $(this).parents('fieldset').addClass('error');

                }
            });


            item.find('textarea.required').each(function() {
                if ($(this).val() != '') {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    $(this).parent('.form-group').find('.error-message').show();

                }
            });

            item.find('input[type=email]').each(function() {
                var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
                var $this = $(this);
                if ($this.hasClass('required')) {

                    if (regexp.test($this.val())) {
                        $this.removeClass('error');
                    } else {
                        $this.addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                } else {

                    if ($this.val() != '') {
                        if (regexp.test($this.val())) {
                            $this.removeClass('error');
                        } else {

                            $this.addClass('error');
                            $(this).parent('.form-group').find('.error-message').show();
                        }
                    } else {
                        $this.removeClass('error');
                    }
                }


            });


            item.find('input[type=checkbox].required').each(function() {
                if ($(this).is(':checked')) {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    $(this).parent('.form-group').find('.error-message').show();
                }
            });


        }

        btn.click(function() {
            checkInput();
            var sizeEmpty = item.find('.error:visible').size();
            if (sizeEmpty > 0) {
                return false;
            } else {
                item.submit();
                $.fancybox.close();
            }
        });

    });
    
    $('select').change(function() {
        if ($(this).val() == '') {
            $(this).parents('.form-group').removeClass('selected');

        } else {
            $(this).parents('.form-group').addClass('selected');
            $(this).parents('.form-group').removeClass('error');
        }
    });

    // end validation 




    // проверка на Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;


    if (isIE) {
        $('body').addClass('ie');
    }
    // end   




    $('.menu-button').click(function() {
        $('.menu-button').toggleClass('active');
        $('.mobile-menu').toggleClass('open');
    });
    $('.mobile-menu, .menu-button').click(function(e) {
        if ($(e.target).hasClass('fancyboxModal') == false) {
            e.stopPropagation();
        }
    });
    $('body').click(function() {
        $('.mobile-menu').removeClass('open');
        $('.menu-button').removeClass('active');
    });


    $('.mobile-menu ul > li').has('ul').addClass('down');
    $('.mobile-menu .down > ul').before('<span class="dropdown-button"></span>');



    $('.mobile-menu .dropdown-button').click(function() {
        $(this).toggleClass('active');
        if ($(this).siblings('ul').is(':visible')) {
            $(this).siblings('ul').slideUp();
        } else {
            $(this).siblings('ul').slideDown();
        }

    });
    
    
    
    $('.anchor-menu-init .mobile-menu ul li a').click(function(){
        $('.mobile-menu').removeClass('open');
        $('.menu-button').removeClass('active');
    });
    
    
    
    
    // fixed top menu
    
    var panel=$('.header-bottom'), pos=panel.offset().top;
        
        
        $(window).scroll(function(){
            if($(this).scrollTop() > pos && !panel.hasClass('fixed')){
                panel.addClass('fixed');
            }else if($(this).scrollTop() < pos && panel.hasClass('fixed')){         
                panel.removeClass('fixed');  
            }
        });
        
        
        window.addEventListener("resize", function() {
        	panel=$('.header-bottom');
            pos=panel.offset().top;
            $(window).scroll(function(){
                if($(this).scrollTop() > pos && !panel.hasClass('fixed')){
                    panel.addClass('fixed');
                }else if($(this).scrollTop() < pos && panel.hasClass('fixed')){         
                    panel.removeClass('fixed');  
                }
            });                
        }, false);
    
    
        window.addEventListener("orientationchange", function() {
            panel=$('.header-bottom');
            pos=panel.offset().top;
            $(window).scroll(function(){
                if($(this).scrollTop() > pos && !panel.hasClass('fixed')){
                    panel.addClass('fixed');
                }else if($(this).scrollTop() < pos && panel.hasClass('fixed')){         
                    panel.removeClass('fixed');  
                }
            });
        }, false);

    
    // /. fixed top menu
    
    
    $('.reviews-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        arrows: false,     
    }); 
    
    $('.product-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 800,
        arrows: true,
        prevArrow: '<a href="#" class="slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>',
        nextArrow: '<a href="#" class="slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>',
    }); 
    
    
    
    // styler
        if($('.select-styler').length > 0){
            $('.select-styler').styler({
                selectSearch: false,
                onSelectOpened: function() { 
                    if ( !$("html").hasClass("touch") ){
                        $(this).find(".jq-selectbox__dropdown ul").jScrollPane({
                            verticalDragMinHeight: 30,
                            verticalDragMaxHeight: 50
                        });
                    }
                    
                }
            }); 
        }
        

    // end styler 
    
    
    
    
/****************************** plus minus goods counter ************************************/        
//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$.fn.globalNumber = function(){
$('.btn-number').click(function(e){
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input#"+fieldName);

    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('id');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('К сожалению, было достигнуто минимальное значение');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('К сожалению, было превышено максимальное значение');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
};$.fn.globalNumber();
/****************************** plus minus goods counter ************************************/ 
    
    
    
// Anchor menu       
                
        
        // Cache selectors
        var lastId,
            topMenu = $(".anchor-menu-init .top-menu, .anchor-menu-init .mobile-menu-inner ul"),
            topMenuHeight = $(".top-menu").outerHeight()+90,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function(){
              var item = $($(this).attr("href"));
              if (item.length) { return item; }
            });
        
        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function(e){
          var href = $(this).attr("href"),
              offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
          $('html, body').stop().animate({ 
              scrollTop: offsetTop 
          }, 500);
          e.preventDefault();
        });
        
        // Bind to scroll
        $(window).scroll(function(){
           // Get container scroll position
           var fromTop = $(this).scrollTop()+topMenuHeight+50;
           
           // Get id of current scroll item
           var cur = scrollItems.map(function(){
             if ($(this).offset().top < fromTop)
               return this;
           });
           // Get the id of the current element
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           
           if (lastId !== id) {
               lastId = id;
               // Set/remove active class
               menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#"+id+"]").parent().addClass("active");
           }                   
        });
        
// End anchor menu      
    
    
    
    
    
        $('.product-info-btn').click(function(e){
            e.stopPropagation();
            $(this).toggleClass('active');
            $(this).parents('.element').find('.element-text').toggleClass('active');
        });
        
        $('.catalog .element-text').click(function(e){
            e.stopPropagation();
        });
        
        $('body').click(function(){
            $('.product-info-btn, .catalog .element-text').removeClass('active');
        });
    
    
}); // end ready

$(window).load(function() { 
    
});

//Оформление заказа - Сами заберём
$('#delivery_3').change(function(){
    if ($(this).is(":checked")) {
       $("#street").addClass('hide') 
       $("#building").addClass('hide')
    }
})

//Оформление заказа - Курьером
$('#delivery_4').change(function(){
    if ($(this).is(":checked")) {
       $("#street").removeClass('hide') 
       $("#building").removeClass('hide')
    }
})

//Оформление заказа - Сделать заказ прогрессбар 
 $('#msOrder').submit(function(){
    setTimeout(function() { 
       if(!$('.form-control').hasClass('error')){
            $('#msOrder').find(':submit').addClass('pending')
        }
        else {
            $('#msOrder').find(':submit').removeClass('pending')
        }
    },500);
})


// При скролле адрес прикрепляется 
var scroll_start = 0;
    $(document).scroll(function() { 
        scroll_start = $(document).scrollTop();
       
        if(scroll_start > 20) {
            $(".header-top").addClass('onsc')
            
        } else if (scroll_start == 0){
            $('.header-top').removeClass('onsc');
        }
});







