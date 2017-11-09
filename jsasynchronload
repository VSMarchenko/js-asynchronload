(function($){
    jQuery.prototype.jsasynchronload = function(options){
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
        $(that).parent().css({background:'url('+options.preloaderImage+') no-repeat center center'});
        var countColor = options.blockColors.length;
        
        $(thisClass+" img").each(function(i){
            $(this).hide();
            $(this).parent().css({background:'rgba('+options.blockColors[Math.round( Math.random(0,(countColor - 1)) )]+', '+Math.random(5,10)+') url('+options.preloaderImage+') no-repeat center center'});
        });
		
        var init = function(){
            var t;
            var h = new Array();
            var key = false; // Ключ чекає заватаження всіх файлів
            var img = new Array();
            
            function heightImg(){
                $(thisClass+" img").each(function(i){
                    h[i] = $(this).height();                    
                })
            }
            
            function imgLoaded(images) {                         
                images.parent().css({background:'none'});
                images.animate({opacity:1},500);
				setTimeout(function(){
					options.after()
				},200)
            }
            
            heightImg();
            
            $(thisClass+" img").each(function(i){
                img[i] = $(this);
            })
                        
            t = setInterval(function(){
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
                heightImg();
            },10);
        };
        return this.each(init);       
    };
})(jQuery);
