(function($){
    jQuery.prototype.jssynchronization = function(options){
	options = $.extend({
		thisClass:'item',
		preloaderImage:'https://martphoto.com.ua/wp-content/themes/martphoto/img/preloaderImg.gif',
		blockColors:['223, 58, 62', '72, 193, 196'],    
		after:function(){return true;}
        }, options);
        
        var that = $(this);
	var thisSelector = this.selector;
        var thisClass = thisSelector + " ." + options.thisClass;
	var total = $(thisClass+" img").length;
        var countColor = options.blockColors.length;
        var img = [];
	$(that).parent().css({background:'url('+options.preloaderImage+') no-repeat center center'});
        
        $(thisClass+" img").each(function(i){
		img[i] = $(this);
	    	// Ховаємо каритнку в блоці й заповнюємо сам блок кольорами з опції options.blockColors
		$(this).hide().parent().css({background:'rgba('+options.blockColors[Math.round( Math.random(0,(countColor - 1)) )]+', '+Math.random(5,10)+') url('+options.preloaderImage+') no-repeat center center'});
        });	
		
	var synchronize = function(){
		var key = false; // Ключ чекає заватаження всіх файлів
		var h = [];

		var imgLoaded = function(images) {                         
			images.parent().css({background:'none'});
			images.animate({opacity:1},500);
			setTimeout(function(){
				options.after();
			},200);
		};

		var heightImg = function(){
			$(thisClass+" img").each(function(i){
				h[i] = $(this).height();                    
			});
		};

		this.start= function(){
			// Перевіряємо чи почала картинка завантажуватися, функція оновлюється серез заданий проміжок часу. Коли всі картинки завантажаться, функція зупиниться
			var t = setInterval(function(){
				heightImg();
				for(var i = 0; i < total; i++) {
					if (h[i] === 0) {
						key = false;
						break;
					}else{
						key = true;	
					}
				}
				if(key){
					options.after();
					$(thisClass+" img").show().css({opacity:0});
					$(that).parent().css({background:'none'});

					for(var i = 0; i < img.length; i++){
						var image = new Image();
						image.onload = imgLoaded.bind(this, img[i]);
						image.src = img[i].attr('src');
						if (image.complete){
							setTimeout(function(){
								imgLoaded.bind(this, img[i]);
							},200);
						}
					}
					clearInterval(t);                    
				}
			},10);

		};
        };
		
        var init = function(){
		var js = new synchronize();
		js.start();
        };
	    
        return this.each(init);       
    };
})(jQuery);
