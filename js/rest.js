$(function(){

	var windowHeight = $(window).height();
	$('.windowHeight').css('height', windowHeight);

	$(window).resize(function() {
		var windowHeight = $(window).height();
		$('.windowHeight').css('height', windowHeight);	  
	});

	var animateTo = function(whereto){
		$('html, body').animate({
			        scrollTop: $(whereto).offset().top
		}, 600, 'easeInOutExpo');
	}

	var STELLARJS = {
	init: function() {
	    var self = this;
	    $(function(){
	        self.$sections = $('#introduction, #map, #meals, #design, #book, #contact, #footer').each(function(index){
	            $(this).data('sectionIndex', index);
	        });

	        self.handleEvents();

	    });
	},
	handleEvents: function() {
	    var self = this,
	        //Debounce function from Underscore.js
	        debounce = function(func, wait) {
	            var timeout;
	            return function() {
	                var context = this, args = arguments;
	                var later = function() {
	                    timeout = null;
	                    func.apply(context, args);
	                };
	                clearTimeout(timeout);
	                timeout = setTimeout(later, wait);
	            }
	        },
	        handleScroll = function() {
	            var scrollTop = $(window).scrollTop(),
	                sectionIndex = Math.round((scrollTop) / self.$sections.first().outerHeight()),
	                $activeSection = self.$sections.eq(sectionIndex);

	            if ($activeSection.length === 0) {
	                $activeSection = self.$sections.last();
	            }

	            if ($activeSection.length === 0) return;

	            $(window).unbind('scroll.stellarsite');

	            if (scrollTop === 0) {
	                $(window).unbind('scroll.stellarsite').bind('scroll.stellarsite', debounce(handleScroll, 500));
	            } else {
	                $('html,body').animate({
	                    scrollTop: $activeSection.offset().top
	                }, 600, 'easeInOutExpo', function() {
	                    setTimeout(function(){
	                        $(window).unbind('scroll.stellarsite').bind('scroll.stellarsite', debounce(handleScroll, 500));
	                    }, 10);
	                });
	            }

	            $(window).bind('mousewheel', function(){
	                $('html,body').stop(true, true);
	            });

	            $(document).bind('keydown', function(e){
	                var key = e.which;

	                if (key === 37 || key === 39) {
	                    $('html,body').stop(true, true);
	                }
	            });
	        };

	    if (window.location.href.indexOf('#show-offset-parents-default') === -1) {
	        $(window).bind('scroll.stellarsite', debounce(handleScroll, 500));
	    }
	} }; 


	STELLARJS.init();

	$("#slides").slidesjs({
        play: {
	      active: false,
	        // [boolean] Generate the play and stop buttons.
	        // You cannot use your own buttons. Sorry.
	      effect: "slide",
	        // [string] Can be either "slide" or "fade".
	      interval: 5000,
	        // [number] Time spent on each slide in milliseconds.
	      auto: true,
	        // [boolean] Start playing the slideshow on load.
	      swap: true,
	        // [boolean] show/hide stop and play buttons
	      pauseOnHover: false,
	        // [boolean] pause a playing slideshow on hover
	      restartDelay: 2500
	        // [number] restart delay on inactive slideshow
	    },
	    pagination: {
      		active: false,
      	}
     });
	
	$.stellar({responsive: true, verticalScrolling:true, hideDistantElements:false});

	$('#map-continents').cssMap({
		'size' : 1280,
		'onClick' : function(e){ 
			animateTo('#meals');
			$('#continentSpan, #continentH3').text(e.children('a').text());


			/* alert(e.children('a').text());*/ 
		},
	});

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
	var menuitems = "";

	$('.selectMenu').click( function(e){ 
		e.preventDefault();
		var text = $(this).attr('href').split('/');
		
		money = money + parseInt(text[1], 10);
		menuitems = menuitems + ' ' + text[0];

		$('#delete').remove();
		$('.orderList').append('<li>'+ text[0] +'<span>$'+ text[1] +'</span></li>');

		$('#menuItems').text(menuitems);
		$('.int').text(money);

	});

	$('.fade, .upper').hide();
	$('#bookingBtn').click( function(e){ e.preventDefault(); $('.fade, .upper').fadeIn(); $('#book_container').fadeOut(); });

});