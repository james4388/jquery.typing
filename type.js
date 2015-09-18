;(function ( $, window, document, undefined ) {

	"use strict";
		
		var pluginName = "typing",
            defaults = {
				strings: ["Hi! this is jQuery typing plugin", "after typing I delete", "then I type again."],
                typeDelay: 20,
                deleteDelay: 1000,
                rewind: false,
                showCursor: true,
                startDelay: 1000,
                caretDelay: 500,
                onComplete: function(){},
                onRewind: function(){}
            };

		function Plugin ( element, options ) {
            this.element = element;
            this.$el = $(element);
            this.isInput = this.$el.is('input');
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
            init: function () {
                if (!window.requestAnimationFrame){
                    window.requestAnimFrame = (function(){
                        return  window.requestAnimationFrame       ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame    ||
                            function( callback ){
                                window.setTimeout(callback, 1000 / 60);
                            };
                    })();
                }
                if(!this.$caret){
                    this.$caret = $('<span class="typing-cursor">|</span>');
                    this.$caret.insertAfter(this.$el);
                }
                this.isRun = true;
                this.currentStr = 0;
                this.currentPrt = 0;
                this.isTyping = true;
                var self = this;
                setTimeout(function(){
                    window.requestAnimationFrame(self.animate.bind(self));
                }, this.settings.startDelay);
                window.requestAnimationFrame(this.animatecaret.bind(this));
            },
            rewind: function(){
                this.settings.onRewind.apply(this);
                this.currentStr = 0;
                this.currentPrt = 0;
                this.isRun = true;
                this.isTyping = true;
                this.animate();
            },
            stop: function(){
                this.isRun = false;
            },
            _val: function(s){
                if (this.isInput){
                    this.$el.val(s);
                }else{
                    this.$el.html(s);
                }
            },
            animatecaret:function(){
                if (this.caretShow){
                    this.$caret.css({ opacity: 0 });
                    this.caretShow = false;
                }else{
                    this.$caret.css({ opacity: 1 });
                    this.caretShow = true;
                }
                var self = this;
                setTimeout(function(){
                    window.requestAnimationFrame(self.animatecaret.bind(self));
                }, this.settings.caretDelay);
            },
            animate : function(){
                if (!this.isRun){
                    return;
                }
                var delay = this.settings.typeDelay;
                if (this.isTyping){
                    if (this.currentPrt < this.settings.strings[this.currentStr].length){
                        this._val(this.settings.strings[this.currentStr].substr(0, this.currentPrt+1));
                        this.currentPrt += 1;
                    }else{
                        if (this.currentStr == this.settings.strings.length - 1){//Last one
                            if (this.settings.rewind){
                                this.rewind();
                                return;
                            }else{
                                this.settings.onComplete.apply(this);
                                this.isRun = false;
                                return;
                            }
                        }
                        this.isTyping = false;
                        this.currentPrt -= 1;
                        delay = this.settings.deleteDelay;
                    }
                }else{
                    if (this.currentPrt > 0){
                        this._val(this.settings.strings[this.currentStr].substr(0, this.currentPrt+1));
                        this.currentPrt -= 1;
                    }else{
                        this.isTyping = true;
                        this.currentPrt = 0;
                        if (this.currentStr < this.settings.strings.length){
                            this.currentStr += 1;
                        }
                    }
                }
                var self = this;
                setTimeout(function(){
                    window.requestAnimationFrame(self.animate.bind(self));
                }, delay);
            }
		});

        //Add to jQuery fn
		$.fn[pluginName] = function (options) {
            return this.each(function() {
                var opts = typeof(options)=="object" ? options : {};
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }
                if (typeof(options)=="string"){
                    var data = $.data(this, "plugin_" + pluginName);
                    if (data[options]){
                        data[options]();
                    }
                }
            });
		};

})( jQuery, window, document );
