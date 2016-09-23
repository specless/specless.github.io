

jQuery( function( $ ) {

	$.fn.exists = function() {
		return $( this ).length > 0;
	};

	// Global vars
	var window_width,
		window_height;

	// Construct the global window variables
	function window_var() {
		window_width = $( window ).width();
		window_height = $( window ).height();
	}

	// Init the window_var function
	window_var();

	// Reinit for resize event
	$( window ).on( 'resize', window_var );


	window.specless = {

		$win : $( window ),
		$doc : $( document),
		$hero: $('#section-hero'),
		$heroTop: $('#hero-top'),
		$heroBottom: $('#hero-bottom'),
		$publishers: $('#section-publishers'),
		$advertisers: $('#section-advertisers'),
		$richmedia: $('#section-richmedia'),
		$details: $('#section-details'),
		$team: $('#section-team'),
		$footer: $('#section-footer'),
		$demo: $('#demo-container'),
		$demoGraffiti: $('#graffiti'),
		$demoControls: $('#demo-controls'),
		$device: $('#device-demo'),
		$deviceGlare: $('#device-demo .device-glare'),
		$deviceAd: $('#device-demo .device-content-ad'),
		$tablet: $('#device-tablet'),
		$laptop: $('#device-laptop'),
		$header: $('#header'),
		$headline: $('#headline'),
		$subhead: $('#subhead'),
		$subheadMain: $('#subhead h2'),
		$subheadSub: $('#subhead h4'),
		$sliderWidth: $('#demo-controls-width'),
		$sliderWidthMessage: $('#demo-message-width'),
		$sliderWidthKnob: $('#demo-controls-width .slider-knob'),
		$sliderHeight: $('#demo-controls-height'),
		$sliderHeightMessage: $('#demo-message-height'),
		$sliderHeightKnob: $('#demo-controls-height .slider-knob'),
		$pubMockupPhone: $('#pub-mockup-phone'),
		$pubMockupBrowser: $('#pub-mockup-browser'),



		init: function() {

			$( document ).on( 'click', '.mobile--icon', specless.mobile_menu );
			$( document ).on( 'click', '.modal--close', specless.modal_close );

			//$(document).foundation();
			//specless.setupAdDemo();
			specless.setupHeroSection();
			specless.setupPubSection();
			specless.setupAdvSection();
			specless.swiper_carousel();
			specless.modal_control();
			specless.load_equal_height();
			specless.map_blocks();

			if ( $( '#rich-media-video' ).exists() ) {
				specless.setupRichMediaSection();
			}

			if ( $( '.field__select' ).exists() ) {
				$( '.field__select select' ).uniform({
					selectAutoWidth: false
				});
			}

			$( '.features-menu a' ).on( 'click', function() {
				var feature_group = $( this ).data( 'feature-filter' );
					clicked_feature = $( '.features-list' ).find( '[data-feature*="' + feature_group + '"]' );

				$( '.features-menu a' ).not( this ).removeClass( 'is-active' );
				$( this ).addClass( 'is-active' );

				if ( 'all' === feature_group ) {
					$( '.features-list' ).find( '.features-group' ).removeClass( 'is-hidden' ).removeClass( 'is-visible' ).removeClass( 'is-first' );
				} else {
					$( '.features-list' ).find( '.features-group' ).addClass( 'is-hidden' ).removeClass( 'is-visible' ).removeClass( 'is-first' );
					$( clicked_feature ).removeClass( 'is-hidden' ).addClass( 'is-visible' );
					$( clicked_feature ).eq(0).addClass( 'is-first' );
				}
			});

		},

		scrollPercent: function($element) {
			var self = this,
				scrollTop = self.$doc.scrollTop(),
				docHeight = self.$doc.height(),
				percent = 0;
			
			if ($element) {
				var height = $element.height(),
					offset = $element.offset().top;

				if (scrollTop <= offset) {
					percent = 0;
				} else if (scrollTop >= offset + height) {
					percent = 1;
				} else {
					percent = (scrollTop - offset) / height;
				}

			} else {
				percent = scrollTop / docHeight;
			}

			return percent;
		},

		setupHeroSection: function() {
			var self = this,
				newOffset,
				timelineTime = 0,
				scrollFinished = false,
				timeline = new TimelineLite({paused: true}),
				lastScroll,
				resizer = new TimelineLite({paused: true}),
				duration = 10,
				widthSlider = Draggable.create(self.$sliderWidthKnob, {type:"x", bounds:self.$sliderWidth})[0],
				heightSlider = Draggable.create(self.$sliderHeightKnob, {type:"y", bounds:self.$sliderHeight})[0];

			function createNewTimeline() {
				timelineTime = timeline.time();
				self.$doc.scrollTop(0);
				updateTransition();

				TweenMax.set(self.$demo, {clearProps: "y,opacity" });
				TweenMax.set(self.$demo, {opacity: 1});
				TweenMax.set(self.$device, { clearProps: "y" });
				TweenMax.set(self.$subhead, { clearProps: "all" });
				TweenMax.set(self.$subheadMain, { clearProps: "opacity" });
				TweenMax.set(self.$subheadSub, { clearProps: "opacity" });
				TweenMax.set(self.$headline, { clearProps: "opacity" });
				TweenMax.set(self.$laptop, { clearProps: "all" });
				TweenMax.set(self.$tablet, { clearProps: "all" });
				TweenMax.set(self.$header, { clearProps: "all" });
				TweenMax.set(self.$demoGraffiti, { clearProps: "all" });
				TweenMax.set(self.$sliderWidth, { clearProps: "all" });
				TweenMax.set(self.$sliderHeight, { clearProps: "all" });


				timeline.clear();

				timeline.from(self.$device, 5, {scale: 0.65})
					.to(self.$demo, 5, {
						y: newOffset
					}, 0)
					.to(self.$device, 5, {
						ease: Back.easeOut.config(1.7),
						y: '-24%'
					}, 0)
					.from(self.$subhead, 5, {
						css: {
							top: '300px'}
					}, 0)
					.from(self.$subheadMain, 5, {
						opacity: 0
					}, 0)
					.from(self.$subheadSub, 1, {
						opacity: 0
					}, 4)
					.to(self.$headline, 0.75, {
						opacity: 0
					}, 0)
					.to(self.$laptop, 5, {
						scale: 0.35,
						x: '200%',
						y: '-100%',
						opacity: 0
					}, 0)
					.to(self.$tablet, 5, {
						scale: 0.35,
						x: '-200%',
						y: '-150%',
						opacity: 0
					}, 0)
					.fromTo(self.$header, 5, {
						css: {
							paddingTop: '40px',
							paddingBottom: '30px',
							backgroundColor: 'rbga(0,0,0,0)'
							}
						}, 
					{
						css: {
							paddingTop: '24px',
							paddingBottom: '15px',
							backgroundColor: 'rbga(0,0,0,0.75)'
						}
					}, 0)
					.from(self.$demoGraffiti, 5, {
						y: '-10%',
						opacity: 0
					}, 0)
					.from(self.$sliderWidth, 3, {
						y: '1000%',
						opacity: 0
					}, 2)
					.from(self.$sliderHeight, 3, {
						x: '1000%',
						opacity: 0
					}, 2)
					.to(self.$sliderWidth, 0.5, {
						opacity: 0
					}, 5)
					.to(self.$sliderHeight, 0.5, {
						opacity: 0
					}, 5)
					.to(self.$demo, 1, {
						ease: Power0.easeNone,
						y: '-' + self.$win.height() + 'px',
						opacity: 0
					}, 5)

				self.$doc.scrollTop(lastScroll);
				updateTransition();
			}

			function resizeHandler() {

				// 1.67 Width 0.59 height Aspect Ratio
				lastScroll = self.$doc.scrollTop();
				var offsetDevices = self.$demo.offset().top - self.$doc.scrollTop();
				var offsetHeadline = self.$headline.offset().top + self.$headline.height();
				var availableHeight = self.$win.height() - offsetHeadline;
				var width = availableHeight * 1.67;
				var top = ((offsetHeadline/self.$win.height()) * 100);
				if (width > 1200) {
					width = 1200
				}
				var left = (self.$win.width() - width) /2;
				self.$demo.css({
					width: width + 'px',
					left: left + 'px',
					top: top + '%'
				});

				newOffset = ((self.$win.height() - self.$demo.height()) /2) - offsetHeadline;
				console.log(newOffset);
				createNewTimeline();
				
			}

			resizeHandler();
			//createNewTimeline();

			// timeline.from(self.$device, 5, {scale: 0.65})
			// 		.to(self.$demo, 5, {y: newOffset}, 0)
			// 		.to(self.$device, 5, {ease: Back.easeOut.config(1.7), y: '-24%'}, 0)
			// 		.from(self.$subhead, 5, {css: {
			// 			top: '300px'
			// 		}}, 0)
			// 		.from(self.$subheadMain, 5, {opacity: 0}, 0)
			// 		.from(self.$subheadSub, 1, {opacity: 0}, 4)
			// 		.to(self.$headline, 0.75, {opacity: 0}, 0)
			// 		.to(self.$laptop, 5, {scale: 0.35, x: '200%', y: '-100%', opacity: 0}, 0)
			// 		.to(self.$tablet, 5, {scale: 0.35, x: '-200%', y: '-150%', opacity: 0}, 0)
			// 		.fromTo(self.$header, 5, {css: {
			// 			paddingTop: '40px',
			// 			paddingBottom: '30px',
			// 			backgroundColor: 'rbga(0,0,0,0)'
			// 		}}, {css: {
			// 			paddingTop: '24px',
			// 			paddingBottom: '15px',
			// 			backgroundColor: 'rbga(0,0,0,0.75)'
			// 		}}, 0)
			// 		.from(self.$demoGraffiti, 5, {y: '-10%', opacity: 0}, 0)
			// 		.from(self.$sliderWidth, 3, {y: '1000%', opacity: 0}, 2)
			// 		.from(self.$sliderHeight, 3, {x: '1000%', opacity: 0}, 2)
			// 		.to(self.$demo, 1, {ease: Power0.easeNone, opacity: 0}, 5)
			// 		.to(self.$device, 0.65, {opacity: 0}, 5)
			// 		//.to(self.$demoControls, 0.5, {opacity: 0}, 5);

			resizer.to(self.$device, 5, {ease: Power0.easeNone, css: {
						width: '100%'
					}}, 0)
					.to(self.$device, 2, {css: {
						top: '-10vh'
					}}, 0)
					.to(self.$deviceGlare, 2, {css: {
						width: '80%',
						height: '60%'
					}}, 0)
					.to(self.$subhead, 0.6, {opacity: 0}, 0);

			function resizeDevice(percent) {
				var newDuration = duration / 2;
				var time = newDuration * percent;
				resizer.time(time);
			}

			function updateDevice() {
				var time = resizer.time(),
					portrait = 0.7,
					landscape = 1.55,
					laptop = 3;

				if (time <= portrait) {
					self.$device.addClass('device__phone');
					self.$device.removeClass('device__tablet-portrait');
					self.$device.removeClass('device__tablet-landscape');
					self.$device.removeClass('device__laptop');
				} else if (time > portrait && time <= landscape) {
					self.$device.addClass('device__tablet-portrait');
					self.$device.removeClass('device__phone');
					self.$device.removeClass('device__tablet-landscape');
					self.$device.removeClass('device__laptop');
				} else if (time > landscape && time <= laptop) {
					self.$device.addClass('device__tablet-landscape');
					self.$device.removeClass('device__tablet-portrait');
					self.$device.removeClass('device__phone');
					self.$device.removeClass('device__laptop');
				} else if (time > laptop) {
					self.$device.addClass('device__laptop');
					self.$device.removeClass('device__tablet-portrait');
					self.$device.removeClass('device__phone');
					self.$device.removeClass('device__tablet-landscape');
				}
			}

			var lastSlidWidth = 0;
			var lastSlidHeight = 0;
			var lastTransitionTime = 0;

			function updateDeviceWidth(noSet) {
				var width = self.$sliderWidth.width();
				var knobWidth = self.$sliderWidthKnob.width();
				var knobPosition = self.$sliderWidthKnob.position().left;
				var percent = knobPosition / (width - knobWidth);
				if (!noSet) {
					resizeDevice(percent);
					lastSlidWidth = percent;
				}

				return {
					width: width,
					knobWidth: knobWidth,
					knobPosition: knobPosition,
					percent: percent
				}
			}

			function updateDeviceHeight(noSet) {
				var height = self.$sliderHeight.height();
				var knobHeight = self.$sliderHeightKnob.height();
				var knobPosition = self.$sliderHeightKnob.position().top;
				var percent = knobPosition / (height - knobHeight);
				if (!noSet) {
					var percentCss = percent * 100 + '%';
					self.$deviceAd.css('height', percentCss);
					lastSlidHeight = percent;
				}

				return {
					height: height,
					knobHeight: knobHeight,
					knobPosition: knobPosition,
					percent: percent
				}
			}

			function updateWidthSlider(percent) {
				var sliderStats = updateDeviceWidth(true);
				var sliderPosition = (sliderStats.width - sliderStats.knobWidth) * percent;
				TweenMax.set(self.$sliderWidthKnob, {x: sliderPosition});
				widthSlider.update();
				updateDeviceWidth();
			}

			function updateHeightSlider(percent) {
				var height = self.$sliderHeight.height();
				var knobHeight = self.$sliderHeightKnob.height();
				var sliderPosition = (height - knobHeight) * percent;
				TweenMax.set(self.$sliderHeightKnob, {y: sliderPosition});
				heightSlider.update();
				var knobPosition = self.$sliderHeightKnob.position().top;
				var percent = knobPosition / (height - knobHeight);
				var percentCss = percent * 100 + '%';
				self.$deviceAd.css('height', percentCss);
			}
			
			updateHeightSlider(1);

			function updateTransition() {
				var percent = self.scrollPercent(self.$heroTop),
					bottomPercent = self.scrollPercent(self.$heroBottom),
					time = duration * percent/2;

				if (time <= duration/2) {
					timeline.time(time);

				}

				var scrollPoint = self.$heroBottom.offset().top + self.$heroBottom.height();
				var currentScroll = self.$doc.scrollTop() + self.$win.height();

				if (currentScroll >= scrollPoint) {
					// if (!scrollFinished) {
						self.$heroBottom.addClass('scroll-completed');
						// var demoOffset = self.$demo.height() + self.$demo.offset().top;
						// var heroHeight = self.$hero.height();
						// console.log(demoOffset, heroHeight);
						// TweenMax.set(self.$demo, {clearProps: 'y', css: {bottom: demoOffset - heroHeight + newOffset}});
						scrollFinished = true;
					// }
				} else {
					self.$heroBottom.removeClass('scroll-completed');
					// TweenMax.set(self.$demo, {css: {bottom: 'auto'}});
					scrollFinished = false;
				}

				if (bottomPercent >= 0.32) {
					var progress = (bottomPercent - 0.32) / 0.68;
					timeline.time(5 + progress);
				}

				if (lastTransitionTime > time) {
					var newWidthPosition = lastSlidWidth * percent;
					var newHeightPosition = 1 - (lastSlidHeight * percent);
					updateWidthSlider(newWidthPosition);
					updateHeightSlider(newHeightPosition);
				}

				if (time === 0) {
					lastSlidWidth = 0;
					lastSlidHeight = 0;
				}

				if (bottomPercent >= 0.03 && bottomPercent <= 0.2) {
					self.$sliderWidthMessage.addClass("show");
					self.$sliderHeightMessage.removeClass("show");
				} else if (bottomPercent > 0.2 && bottomPercent <= 0.5) {
					self.$sliderHeightMessage.addClass("show");

					if (bottomPercent > 0.35) {
						self.$sliderWidthMessage.removeClass("show");
					} else {
						self.$sliderWidthMessage.addClass("show");
					}
				} else {
					self.$sliderWidthMessage.removeClass("show");
					self.$sliderHeightMessage.removeClass("show");
				}

				lastTransitionTime = time;

				if (bottomPercent === 1) {
					self.$demo.css('display', 'none');
				} else {
					self.$demo.css('display', 'block');
				}

			}

			self.$subheadMain.fitText(1.3);
			self.$subheadSub.fitText(1.5);

			self.$sliderWidthKnob.mousedown(function() {
				self.$sliderWidthMessage.css('display', 'none');
			});

			self.$sliderHeightKnob.mousedown(function() {
				self.$sliderHeightMessage.css('display', 'none');
			});

			self.$sliderWidthKnob.on('touchstart', function() {
				self.$sliderWidthMessage.css('display', 'none');
			});

			self.$sliderHeightKnob.on('touchstart', function() {
				self.$sliderHeightMessage.css('display', 'none');
			});


			self.$doc.scroll(updateTransition);

			self.$win.resize(resizeHandler);

			resizer.eventCallback("onUpdate", updateDevice);

			widthSlider.addEventListener('drag', updateDeviceWidth);
			heightSlider.addEventListener('drag', updateDeviceHeight);
		},

		setupPubSection : function() {
			var self = this;
			var timeline = new TimelineLite({paused: true});

			timeline.from(self.$pubMockupPhone, 1, {x: '-500'}, 0)
					.from(self.$pubMockupPhone, 0.5, {opacity: 0}, 0.5)
					.from(self.$pubMockupBrowser, 1, {x: '500'}, 0)
					.from(self.$pubMockupBrowser, 0.5, {opacity: 0}, 0.5);


			self.$doc.scroll(function() {
				var height = self.$publishers.height();
				var offset = self.$publishers.offset().top;
				var winHeight = self.$win.height();
				var currentScroll = self.$doc.scrollTop();
				var scrollPoint = 0.75;

				if (currentScroll + winHeight > offset) {
					var percent = (currentScroll + winHeight - offset)/height;
					percent = percent/scrollPoint;
					if (percent < 0) {
						percent = 0;
					} else if (percent > 1) {
						percent = 1
					}
					timeline.time(percent);
				}
			});
		},

		setupAdvSection : function() {
			var self = this;
			var timeline = new TimelineLite({paused: true});

			timeline.set($(".browser.browser-1"), {scale: 1})
					.set($(".browser.browser-2"), {scale: 0.9})
					.set($(".browser.browser-3"), {scale: 0.8})
					.fromTo($(".browser.browser-1"), 1, {y: '-150', ease: Power0.easeNone}, {y: '30', ease: Power0.easeNone}, 0)
					.fromTo($(".browser.browser-2"), 1, {y: '-100', ease: Power0.easeNone}, {y: '20', ease: Power0.easeNone}, 0)
					.fromTo($(".browser.browser-3"), 1, {y: '-50', ease: Power0.easeNone}, {y: '10', ease: Power0.easeNone}, 0);


			self.$doc.scroll(function() {
				var height = self.$advertisers.height();
				var offset = self.$advertisers.offset().top;
				var winHeight = self.$win.height();
				var currentScroll = self.$doc.scrollTop();
				var scrollPoint = 1;

				if (currentScroll + winHeight > offset) {
					var percent = (currentScroll + winHeight - offset)/height;
					percent = percent/scrollPoint;
					if (percent < 0) {
						percent = 0;
					} else if (percent > 1) {
						percent = 1
					}
					timeline.time(percent);
				}
				console.log(percent);
			});
		},

		swiper_carousel: function() {

			var swiper_autoplay = ( window_width < 768 ) ? 500 : 0;

			$( window ).resize(function() {
				if ( window_width < 768 ) {
					swiper_autoplay = 500;
				} else {
					swiper_autoplay = 0;
				}
			});

			var swiper_args = {
				autoplay: swiper_autoplay,
				slidesPerView: 6,
				paginationClickable: false,
				//centeredSlides: false,
				//slideToClickedSlide: false,
				spaceBetween: 22,
				grabCursor: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				freeMode: true,
				preventClicks: false,
				loop: true,
				speed: 0,
				loopAdditionalSlides: 1,
				onClick: function( swiper, event ) {
					var clicked_slide = swiper['clickedSlide'],
						$slide = $( clicked_slide ),
						slide_iframe = $slide.data( 'iframe' );

					if ( undefined != clicked_slide ) {
						$( '.swiper-slide' ).not( $slide ).removeClass( 'is-clicked' );
						$slide.addClass( 'is-clicked' );

						specless.swiper_iframe( slide_iframe );
					}
				},
				breakpoints: {
					1024: {
						slidesPerView: 4,
						spaceBetween: 22
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 6
					},
				}
			};

			if ( $( '.publishers-swiper' ).exists() ) {
				var publishers_swiper  = new Swiper( '.publishers-swiper', swiper_args );
				publishers_swiper.slidePrev( true, 300 );
				publishers_swiper.slideNext( true, 300 );
			}

			if ( $( '.advertisers-swiper' ).exists() ) {
				var advertisers_swiper = new Swiper( '.advertisers-swiper', swiper_args );
				advertisers_swiper.slidePrev( true, 300 );
				advertisers_swiper.slideNext( true, 300 );
			}

			if ( $( '.team-swiper' ).exists() ) {
				if ( window_width < 1230 ) {
					swiper_args['breakpoints'] = {
						1230: {
							slidesPerView: 4,
							spaceBetween: 40
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20
						},
					};

					var team_swiper = new Swiper( '.team-swiper', swiper_args );
				}
			}
		},


		swiper_iframe: function ( newIframeSrc ) {
			$( '.mockup__iframe .iframe' ).each(function() {
				$( this ).attr( 'src', newIframeSrc );
			});
		},


		setupRichMediaSection: function() {

			var richMediaSection         = $( "#section-rich-media" ),
				richMediaCreative        = $( "#rich-media-creative" ),
				richMediaIcon            = $( "#rich-media-icon" ),
				richMediaIconImage       = $( "#rich-media-icon-image" ),
				richMediaCreativeContent = $( "#rich-media-creative-content" ),
				richMediaSpecs           = $( "#rich-media-specs" ),
				richMediaFeatures        = $( "#rich-media-features" );

			var iconStartWidth    = 25,
				iconStartHeight   = 75,
				iconWidthAmount   = 100 - iconStartWidth,
				iconHeightAmount  = 100 - iconStartHeight,
				creativeTranslate = -350,
				specsTranslate    = -150;

			var video = document.getElementById( 'rich-media-video' );

			$( document ).scroll( function() {

				var viewport   = $( window ).height(),
					startPoint = richMediaSection.offset().top - ( viewport / 3 ),
					endPoint   = richMediaFeatures.offset().top - viewport,
					distance   = $( document ).scrollTop();

				if ( distance <= startPoint ) {
					richMediaCreativeContent.css( 'opacity', 0 );
				}

				if ( distance > startPoint && distance < endPoint ) {
					var amount = ( startPoint - distance ) * -1,
						percent = amount / ( endPoint - startPoint ),
						creativeDistance = creativeTranslate + ( ( creativeTranslate * -1 ) * percent ),
						specsDistance = specsTranslate + ( ( specsTranslate * -1 ) * percent ),
						iconWidth = iconStartWidth + ( iconWidthAmount * percent ),
						iconHeight = iconStartHeight + ( iconHeightAmount * percent );

					richMediaCreative.css( 'transform', 'translate( -50%, ' + creativeDistance + 'px ) rotateX( 10.6deg ) ');
					richMediaSpecs.css( "transform", "translate( -50%, " + specsDistance + "px ) rotateX( 10.6deg )");
					richMediaIcon.css( "width", iconWidth + "%" );
					richMediaIcon.css( "height", iconHeight + "%" );
					richMediaCreativeContent.css( "opacity", percent );
					richMediaIconImage.css( "display", "block" );
					$(video).css( "display", "none" );
					video.pause();
				}

				if ( distance >= endPoint ) {
					richMediaCreative.css( "transform", "translate( -50%, 0px ) rotateX( 10.6deg )" );
					richMediaSpecs.css( "transform", "translate( -50%, 0px ) rotateX( 10.6deg )" );
					richMediaIcon.css( "width", "100%" );
					richMediaIcon.css( "height", "100%" );
					richMediaIconImage.css( "display", "none" );
					richMediaCreativeContent.css( "opacity", 1 );
					$(video).css( "display", "inline-block" );
					video.currentTime = 0;
					video.play();
				}

			});

		},


		mobile_menu: function( event ) {
			event.preventDefault();

			if ( $( this ).is( '.is-active' ) ) {
				$( this ).removeClass( 'is-active' );
				$( '.page' ).removeClass( 'page--no-scroll' );
				$( 'body' ).removeClass( 'menu-open' );
				$( '.menu__primary' ).removeClass( 'is-open' );
			} else {
				$( this ).addClass( 'is-active' );
				$( '.page' ).addClass( 'page--no-scroll' );
				$( 'body' ).addClass( 'menu-open' );
				$( '.menu__primary' ).addClass( 'is-open' );
			}
		},


		modal_control: function( ) {
			$( '[data-modal]' ).on( 'click', function( event ) {
				event.preventDefault();
				var target_modal = $( this ).data( 'modal' );

				$( 'body' ).addClass( 'menu-open' );
				$( target_modal ).addClass( 'is-open' );
			});
		},


		modal_close: function( event ) {
			event.preventDefault();

			$( this ).parent( '.modal' ).removeClass( 'is-open' );
			$( 'body' ).removeClass( 'menu-open' );
		},


		load_equal_height: function() {
			// Load equal height
			$( window ).load( function() {
				specless.equal_height( '.column--equal' );
			});

			// Responsive Equal Height
			if ( window_width >= 1025 ) {
				$( window ).load( function() {
					specless.equal_height( '.column--equal-desktop' );
				});
			}

			// Trigger equal height on resize
			$( window ).resize(function() {
				specless.equal_height( '.column--equal' );

				if ( window_width >= 1025 ) {
					specless.equal_height( '.column--equal-desktop' );
				} else if ( window_width <= 1024 ) {
					$( '.column--equal-desktop' ).css( 'height', '' );
				}
			});
		},


		equal_height: function( container ) {

			var tallest_column = 0,
				row_position = 0,
				row_columns = new Array(),
				top_position = 0;

			$( container ).each(function() {
				$this = $( this );
				$this.height('auto');
				top_position = $this.position().top;

				if ( row_position != top_position ) {
					for ( current_column = 0 ; current_column < row_columns.length ; current_column++ ) {
						row_columns[current_column].height( tallest_column );
					}
					row_columns.length = 0;
					row_position = top_position;
					tallest_column = $this.height();
					row_columns.push( $this );
				} else {
					row_columns.push( $this );
					tallest_column = ( tallest_column < $this.height() ) ? ( $this.height() ) : ( tallest_column );
				}

				for ( current_column = 0 ; current_column < row_columns.length ; current_column++ ) {
					row_columns[current_column].height( tallest_column ).addClass( 'is-equal' );
				}
			});
		},


		map_blocks: function() {

			$( '.map-block' ).each(function() {

				var map_id = $( this ).find( '.map-container' ).attr( 'id' ),
					geocoderContact,
					mapContact,
					geocoder,
					map;

				function initialize_officemap() {
					geocoder = new google.maps.Geocoder();

					if ( document.getElementById( map_id ) && $( '#' + map_id ).data( 'latlong' ) ) {
						var uselatlong = $( '#' + map_id ).data( 'latlong' ),
							temp = new Array(),
							latlong = uselatlong.split( ',' );
							latitude = latlong[0],
							longitude = latlong[1];

					} else {
						var latitude = '-34.397',
							longitude = '150.644';
					}

					var map_styles = [
						{
							"featureType": "all",
							"elementType": "all",
							"stylers":[
								{
									"saturation": -100
								},
								{
									"gamma": 0.5
								}
							]
						}
					];

					var mapOptions = {
						scrollwheel: false,
						zoom: 17,
						center: latlng,
						styles: map_styles,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}

					var latlng = new google.maps.LatLng(latitude, longitude);

					if ( document.getElementById( map_id ) ) {
						var address = $( '#' + map_id ).data( 'address' );

						map = new google.maps.Map( document.getElementById( map_id ), mapOptions );
						codeAddress_officemap( address );
					}

					var currCenter = map.getCenter();
					google.maps.event.trigger( map, 'resize' );
					map.setCenter( currCenter );
				}

				function codeAddress_officemap( address ) {
					geocoder.geocode({
						'address': address
					},
					function ( results, status ) {
						if ( status == google.maps.GeocoderStatus.OK ) {
							map.setCenter( results[0].geometry.location );
							var mapMarker = new google.maps.Marker({
								map: map,
								position: results[0].geometry.location
							});
						} else {
							alert( 'Geocode was not successful for the following reason: ' + status );
						}
					});
				}

				initialize_officemap();
			});
		}

	};

	specless.init();
});