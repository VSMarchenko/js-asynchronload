(function($){
    jQuery.prototype.jssynchronization = function(options){
	options = $.extend({
		thisClass:'item',
		preloaderImageUrl:'',
		blockColors:['223, 58, 62', '72, 193, 196'],    
		after:function(){return true;}
        }, options);
        
        var that = $(this);
	var thisSelector = this.selector;
        var thisClass = thisSelector + " ." + options.thisClass;
        var img = [];
	$(that).parent().css({background:'url('+options.preloaderImageUrl+') no-repeat center center'});
        
	// Створюємо масив картинок, ховаємо каритнку в блоці й заповнюємо сам блок кольорами з опції options.blockColors
        $(thisClass+" img").each(function(i){
		img[i] = $(this);
	    	$(this).hide().parent().css({background:'rgba('+options.blockColors[Math.round( Math.random(0,(options.blockColors.length - 1)) )]+', '+Math.random(5,10)+') url('+options.preloaderImageUrl+') no-repeat center center'});
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
			// Перевіряємо чи почала картинка завантажуватися, функція оновлюється через заданий проміжок часу. Коли всі картинки завантажаться, функція зупиниться
			var t = setInterval(function(){
				//
				heightImg();
				for(var i = 0; i < $(thisClass+" img").length; i++) {
					if (h[i] === 0) {
						key = false;
						break;
					}else{
						key = true;	
					}
				}
				if(key){
					// Коли фото вже завантажилися, вмикаємо функцію показу, але для ефекту анімації робимо їх непрозорими
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
