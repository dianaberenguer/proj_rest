$(function(){

	var windowHeight = $(window).height();
	$('.windowHeight').css('height', windowHeight);

	$(window).resize(function() {
		var windowHeight = $(window).height();
		$('.windowHeight').css('height', windowHeight);	  
	});

	$("#slides").slidesjs({
        play: {
	      active: false,
	      effect: "slide",
	      interval: 5000,
	      auto: true,
	      swap: true,
	      pauseOnHover: false,
	      restartDelay: 2500
	    },
	    pagination: {
      		active: false,
      	}
     });
	
	$.stellar({responsive: true, verticalScrolling:true, hideDistantElements:false});
	STELLARJS.init();

	$('#map-continents').cssMap({
		'size' : 1280,
		'onClick' : function(e){ 
			animateTo('#meals');
			$('#continentSpan, #continentH3').text(e.children('a').text());
		},
	});
	
	var animateTo = function(whereto){
		$('html, body').animate({
			        scrollTop: $(whereto).offset().top
		}, 600, 'easeInOutExpo');
	}

	$('.toMap').click( function(e){ e.preventDefault(); animateTo('#map'); });
	$('.toDesign').click( function(e){ e.preventDefault(); animateTo('#design'); });
	$('.toMeals').click( function(e){ e.preventDefault(); animateTo('#meals'); });
	$('.toContact').click( function(e){ e.preventDefault(); animateTo('#contact'); });
	
	$('.dish').click( function(e){ 
		e.preventDefault();
		animateTo('#book'); 
		var text = $(this).attr('class').split(' ');
		$('#dishDesign').text(text[1]);
	});

	var money = 0;
	var menuItems = "";

	$('.selectMenu').click( function(e){ 
		e.preventDefault();
		var text = $(this).attr('href').split('/');
		
		money = money + parseInt(text[1], 10);
		menuItems = menuItems + ' ' + text[0];

		$('#delete').remove();
		$('.orderList').append('<li>'+ text[0] +'<span>$'+ text[1] +'</span></li>');

		$('#menuItems').text(menuItems);
		$('.int').text(money);
	});

	$('.fade, .upper').hide();
	$('#bookingBtn').click( function(e){ e.preventDefault(); $('.fade, .upper').fadeIn(); $('#book_container').fadeOut(); });

});