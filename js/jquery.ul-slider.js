/*
 *  jQuery UL Slider - v1.0.0
 *  A simple slider that will animate a UL and anything inside the LIs.
 *  https://github.com/styphon/jquery-ul-slider
 *
 *  Made by Styphon
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

	"use strict";

	// Create the defaults once
	var pluginName = "ulSlider",
		defaults = {
			speed: 10
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this._width = 0;
		this._maxLeft = 0;
		this._interval = null;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend( Plugin.prototype,
	{
		init: function ()
		{
			this.calculateWidth.call(this);
			this.bindEvents.call(this);
		},
		calculateWidth: function ()
		{
			var $this = this;

			$(this.element).find('li').each(function ()
			{
				$this._width += $(this).outerWidth();
			});
			var $ul = $(this.element).find('.ul-slider-window > ul');
			$ul.width(this._width);
			this._maxLeft = - Math.abs( this._width - $(this.element).find('.ul-slider-window').width() );

			$(this.element).children().height( $ul.height() );
		},
		bindEvents: function ()
		{
			var $this = this;
			$(this.element).find('.ul-slider-left').mouseenter(function ()
			{
				$this._interval = setInterval(function ()
				{
					$this.animateRight.call($this);
				}, 50)
			})
				.mouseleave(function ()
				{
					clearInterval($this._interval);
				});

			$(this.element).find('.ul-slider-right').mouseenter(function ()
			{
				$this._interval = setInterval(function ()
				{
					$this.animateLeft.call($this);
				}, 50)
			})
				.mouseleave(function ()
				{
					clearInterval($this._interval);
				});
		},
		animateLeft: function ()
		{
			var $ul = $(this.element).find('.ul-slider-window > ul');
			var pos = parseInt($ul.css('left')) - this.settings.speed;
			if ( pos < this._maxLeft )
				pos = this._maxLeft;

			$ul.stop().animate({"left": pos}, 50);
		},
		animateRight: function ()
		{
			var $ul = $(this.element).find('.ul-slider-window > ul');
			var pos = parseInt($ul.css('left')) + this.settings.speed;
			if ( pos > 0 )
				pos = 0;

			$ul.stop().animate({"left": pos}, 50);
		}
	} );

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn.ulSlider = function( options ) {
		return this.each( function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" +
					pluginName, new Plugin( this, options ) );
			}
		} );
	};

} )( jQuery, window, document );