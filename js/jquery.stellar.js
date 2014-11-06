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