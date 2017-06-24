$(document).ready(function () {
	
	$(".scrollTo").click(function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 1000);
	});
	
    $("#scroll").click(function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("section:eq(1)").offset().top
		}, 1000);
	});
	/* --- ОТПРАВКА E-MAIL--- */

    $(".contact").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "http://www.smmbombardier16.ru/js/mail.php",
            data: $(this).serialize(),
        }).done(function (data) {
            if (data == "1") {
                alert("Спасибо, скоро Вам ответят");
                $(this).children("[type='submit]").attr("disabled", "disabled");
            }
            else {
                console.log(data);
                alert ("Что-то пошло не так");
            }
        })

    });
	
	

    /* --- RANGE SLIDER --- */
    var minRange = 1000;
    var maxRange = 10000;
    $("#range").ionRangeSlider({
        type: "single",
        min: minRange,
        max: maxRange,
        from: 5000,
        onChange: function (data) {
            var price =  $('#pay_modal .per-1').val();
            $('.modal-price > span').html(parseFloat(data.from * price).toFixed(2));
        }
    });

    $('input[name=text-range]').on('input', function() {
        var rangeVal = $(this).val();
        if (rangeVal < minRange) {
            rangeVal = minRange;
        } else if (rangeVal > maxRange) {
            rangeVal = maxRange;
        }
        var instance = $("#range").data("ionRangeSlider");
        instance.update({from:rangeVal});
        var price =  $('#pay_modal .per-1').val();
        console.log(price);
        console.log(instance);
        $('.modal-price > span').html(parseFloat(instance.options.from * price).toFixed(2));
    });
	
});

/** СПИН **/

$(document).ready(function(){
    var show = true;
    var countbox = "#counts";
    $(window).on("scroll load resize", function(){
 
        if(!show) return false;                   // Отменяем показ анимации, если она уже была выполнена
 
        var w_top = $(window).scrollTop();        // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top;     // Расстояние от блока со счетчиками до верха всего документа
 
        var w_height = $(window).height();        // Высота окна браузера
        var d_height = $(document).height();      // Высота всего документа
 
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
 
        if(w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 2000
            });
 
            show = false;
        }
    });
});

/** Accordeon **/

jQuery(document).ready(function() {
	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});
});

/* --- MODAL --- */
$(document).ready(function() { // вся магия после загрузки страницы
    $('a#go').click( function(event){ // ловим клик по ссылки с id="go"
        event.preventDefault(); // выключаем стандартную роль элемента
        $('#overlay').fadeIn(400, // сначала плавно показываем темную подложку
            function(){ // после выполнения предъидущей анимации
                $('#modal_form')
                    .css('display', 'block') // убираем у модального окна display: none;
                    .animate({opacity: 1, top: '50%'}, 200); // плавно прибавляем прозрачность одновременно со съезжанием вниз
            });
    });

	/* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
    $('#modal_close, #overlay').click( function(){ // ловим клик по крестику или подложке
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,  // плавно меняем прозрачность на 0 и одновременно двигаем окно вверх
                function(){ // после анимации
                    $(this).css('display', 'none'); // делаем ему display: none;
                    $('#overlay').fadeOut(400); // скрываем подложку
                }
            );
    });
});

/* --- PAY-MODAL --- */
$(document).ready(function() { // вся магия после загрузки страницы
	$('a#go_pay').click( function(event){ // ловим клик по ссылки с id="go"
		event.preventDefault(); // выключаем стандартную роль элемента
        // код вставки начало
        var title = "";
        if($(this).attr('data-header')) {
            title = $(this).attr('data-header');
        } else {
            title = $(this).parent().children('h4').text();
        }

        $('#pay_modal .modal-pay-content h4').html(title);

        var type = $(this).attr('data-type');
        $('#pay_modal input[name=type]').val(type);
        var price = $(this).attr('data-price');
        $('#pay_modal .per-1').val(price);
        var id = $(this).attr('data-id');
        $('#pay_modal .modal-id').val(id);


        var pack = $(this).attr('data-pack');
        $('#pay_modal .modal-pack').val(pack);

        price =  $('#pay_modal .per-1').val();
        var temp =  $("#range").data();
        $('.modal-price > span').html(parseFloat(temp.from * price).toFixed(2));
        var instance = $("#range").data("ionRangeSlider");
        instance.update({from:4500});


        // код вставки конец
		$('#overlay').fadeIn(400, // сначала плавно показываем темную подложку
		 	function(){ // после выполнения предъидущей анимации
				$('#pay_modal') 
					.css('display', 'block') // убираем у модального окна display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плавно прибавляем прозрачность одновременно со съезжанием вниз
		});
	});
	/* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
	$('#modal_close, #overlay').click( function(){ // ловим клик по крестику или подложке
        $('#form').trigger('reset');
		$('#pay_modal')
			.animate({opacity: 0, top: '45%'}, 200,  // плавно меняем прозрачность на 0 и одновременно двигаем окно вверх
				function(){ // после анимации
					$(this).css('display', 'none'); // делаем ему display: none;
					$('#overlay').fadeOut(400); // скрываем подложку
				}
			);
	});
});
/* --- MANUAL-MODAL --- */
$(document).ready(function() { // вся магия после загрузки страницы
	$('a#go_manual').click( function(event){ // ловим клик по ссылки с id="go"
		event.preventDefault(); // выключаем стандартную роль элемента
        var id = $(this).attr('data-id');
        $('#pay_manual .modal-id').val(id);
        var price = $(this).attr('data-price');
        $('#pay_manual .sum').html(price+'p');

		$('#overlay').fadeIn(400, // сначала плавно показываем темную подложку
		 	function(){ // после выполнения предъидущей анимации
				$('#pay_manual') 
					.css('display', 'block') // убираем у модального окна display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плавно прибавляем прозрачность одновременно со съезжанием вниз
		});
	});
	/* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
	$('#modal_close, #overlay').click( function(){ // ловим клик по крестику или подложке
        $('#form-manual').trigger('reset');
		$('#pay_manual')
			.animate({opacity: 0, top: '45%'}, 200,  // плавно меняем прозрачность на 0 и одновременно двигаем окно вверх
				function(){ // после анимации
					$(this).css('display', 'none'); // делаем ему display: none;
					$('#overlay').fadeOut(400); // скрываем подложку
				}
			);
	});
});
/* --- PACKAGE-MODAL --- */
$(document).ready(function() { // вся магия после загрузки страницы
	$('a#go_box').click( function(event){ // ловим клик по ссылки с id="go"
		event.preventDefault(); // выключаем стандартную роль элемента
        var id = $(this).attr('data-id');
        $('#pay_box .modal-id').val(id);
		$('#overlay').fadeIn(400, // сначала плавно показываем темную подложку
		 	function(){ // после выполнения предъидущей анимации
				$('#pay_box') 
					.css('display', 'block') // убираем у модального окна display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плавно прибавляем прозрачность одновременно со съезжанием вниз
		});
	});
	/* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
	$('#modal_close, #overlay').click( function(){ // ловим клик по крестику или подложке
        $('#form-box').trigger('reset');
		$('#pay_box')
			.animate({opacity: 0, top: '45%'}, 200,  // плавно меняем прозрачность на 0 и одновременно двигаем окно вверх
				function(){ // после анимации
					$(this).css('display', 'none'); // делаем ему display: none;
					$('#overlay').fadeOut(400); // скрываем подложку
				}
			);
	});
});

/* Инициализируем карусель */

$(function() {
$(".owl-carousel").owlCarousel();
});

/* Тултип */

new Tippy('.flag', {
    position: 'top',
    animation: 'fade',
    duration: 200,
    theme: 'light',
    arrow: true
})
