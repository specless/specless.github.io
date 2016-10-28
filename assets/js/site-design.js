var Site = function() {

	var clientId,
		el = {
			$win : $(window),
			$doc : $(document),
			$header : $('#header'),
			$footer : $('#footer'),
			$hero : $('#section-hero'),
			$heroTop : $('#hero-top'),
			$heroAnimation : $('#hero-animation'),
			$publishers : $('#section-publishers'),
			$advertisers : $('#section-advertisers'),
			$richmedia : $('#section-richmedia'),
			$richmediaAnimation : $('#rich-media-animation'),
			$richmediaSpacer : $('#richmedia-spacer'),
			$details : $('#section-details'),
			$products : $('#section-products'),
			$interface : $('#section-interface'),
			$about : $('#section-about'),
			$icon : $('#details-icon')
		},
		scrollPercent = function($element) {
			var scrollTop = el.$doc.scrollTop(),
				docHeight = el.$doc.height(),
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
		isPhone = function() {  
		    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

		    if (isMobile.matches) {
		        return true;
		    } else {
		    	return false;
		    }
		}
		setupHero = function() {
			
			var lastScroll,
				updateTime = function() {
					var percent = scrollPercent(el.$heroTop),
						nextPercent = scrollPercent(el.$richmediaSpacer) * 1.15,
						duration = 5,
						nextDuration = 18.5,
						time = (duration * percent) + 3,
						nextTime = (nextDuration * nextPercent) + 10;
						animation = HYPE.documents["hero"];

					if (!isPhone()) {
						if (nextPercent === 0) {
							if (time <= duration + 3) {
								animation.pauseTimelineNamed('Main Timeline');
								animation.goToTimeInTimelineNamed(time, 'Main Timeline');
								if (time === duration + 3) {
									$('html').addClass('scroll-completed');
								} else {
									$('html').removeClass('scroll-completed');
								}
							}
							if (scrollPercent(el.$publishers) > 0) {
								animation.pauseTimelineNamed('Main Timeline');
								animation.goToTimeInTimelineNamed(10, 'Main Timeline');
								$('html').addClass('hide-controls');
							} else {
								$('html').removeClass('hide-controls');
							}
							
							if (time < 5.5) {
								var $device = $('#device-demo');
								$device.css('width', '100%');
								$('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 1);
								$('#device-ad-slot').css('height', '100%');
								$('#demo-slider-horizontal').val(0);
								$('#demo-slider-vertical').val(0);
								$('#demo-slider-horizontal').rangeslider('update', true);
								$('#demo-slider-vertical').rangeslider('update', true);
								if (!$device.hasClass('device__phone')) {
									$device.addClass('device__phone');
									$device.removeClass('device__laptop');
									$device.removeClass('device__tablet-portrait');
									$device.removeClass('device__tablet-landscape');
								}
							}

						} else {

							if (scrollPercent(el.$products) > 0) {
								animation.goToTimeInTimelineNamed(31, 'Main Timeline');
							} else {
								animation.goToTimeInTimelineNamed(28.5, 'Main Timeline');
							}

							if (nextTime <= nextDuration + 10) {
								animation.pauseTimelineNamed('Main Timeline');
								animation.goToTimeInTimelineNamed(nextTime, 'Main Timeline');

								if (nextTime > 28) {
									$('.scc-icon').addClass("scc-icon-visible");
								} else {
									$('.scc-icon').removeClass("scc-icon-visible");
								}
							}
							
							var $adSlot = $('.rich-media-ad-slot'),
								slotTop = $adSlot.offset().top - el.$doc.scrollTop() + $adSlot.height(),
								detailsTop = el.$details.offset().top - el.$doc.scrollTop();
							if ((detailsTop - slotTop) <= 0) {
								el.$icon.addClass('details-icon-visible');
								el.$icon.width($adSlot.width());
								el.$icon.height($adSlot.height());
								var scrollHeight = (detailsTop - ($adSlot.offset().top - el.$doc.scrollTop()));
								if (scrollHeight <= ($adSlot.height()/2)) {
									scrollHeight = $adSlot.height()/2;
								}
								el.$icon.css('margin-top', -1 * scrollHeight);

							} else {
								el.$icon.removeClass('details-icon-visible');
							}
						}
					} else {
						animation.pauseTimelineNamed('Main Timeline');
						animation.goToTimeInTimelineNamed(3, 'Main Timeline');
					}
				},
				hypeReady = function(hypeDocument, element, event) {
					if (hypeDocument.documentName() === "hero") {
						hypeDocument.startTimelineNamed('Main Timeline');
						el.$doc.scroll(updateTime);
						el.$win.resize(updateTime);
						document.addEventListener('touchmove', updateTime);
					}
				},
				init = function() {
					if ("HYPE_eventListeners" in window === false) {
						window.HYPE_eventListeners = Array();
					}
					window.HYPE_eventListeners.push({"type":"HypeDocumentLoad", "callback":hypeReady});

					var sliderOptions = {
						polyfill: false,
						rangeClass: 'slider',
					    disabledClass: 'slider-disabled',
					    horizontalClass: 'slider-horizontal',
					    verticalClass: 'slider-vertical',
					    fillClass: 'slider-fill',
					    handleClass: 'slider-knob',
					    onSlide: function(position, value) {
					    	var direction = 'horizontal';
					    	var width = 1000;

					    	if (this.$element.attr('data-orientation') === "vertical") {
					    		var percent = 100 - value + "%";
					    		$('#device-ad-slot').css('height', percent);
					    	} else {
					    		var percent = value/100,
					    		$device = $('#device-demo'),
								portrait = 14,
								landscape = 31,
								laptop = 60;

								if (value <= portrait) {
									$device.addClass('device__phone');
									$device.removeClass('device__tablet-portrait');
									$device.removeClass('device__tablet-landscape');
									$device.removeClass('device__laptop');
								} else if (value > portrait && value <= landscape) {
									$device.addClass('device__tablet-portrait');
									$device.removeClass('device__phone');
									$device.removeClass('device__tablet-landscape');
									$device.removeClass('device__laptop');
								} else if (value > landscape && value <= laptop) {
									$device.addClass('device__tablet-landscape');
									$device.removeClass('device__tablet-portrait');
									$device.removeClass('device__phone');
									$device.removeClass('device__laptop');
								} else if (value > laptop) {
									$device.addClass('device__laptop');
									$device.removeClass('device__tablet-portrait');
									$device.removeClass('device__phone');
									$device.removeClass('device__tablet-landscape');
								}
					    		
					    		$device.css('width', (100 + value/100 * 400) + '%');

					    		if ($('#demo-slider-horizontal').val() > 4) {
					    			$('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 0);
					    		} else {
					    			$('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 1);
					    		}
					    	}
					    }
					};

					$('input[type="range"]').rangeslider(sliderOptions);
					$('.slider-knob').click(function() {
						if ($(this).parent().hasClass('slider-horizontal')) {
							$('#demo-message-width').css('opacity', 0);
						} else if ($(this).parent().hasClass('slider-vertical')) {
							$('#demo-message-height').css('opacity', 0);
						}
					});
				};

			init();

		},
		setupHeader = function() {
			var checkScroll = function() {
				var percent = scrollPercent(el.$heroTop);
				
				if (percent >= 1) {
					el.$header.addClass('header-dark');
				} else {
					el.$header.removeClass('header-dark');
				}
			}
			el.$doc.scroll(checkScroll);
		},
		setupPublishers = function() {
			var pubSlider = new Swiper('#pub-slider', {
					slidesPerView: 7,
					spaceBetween: 8,
					breakpoints: {
					    450: {
					      slidesPerView: 3
					    },

					    800: {
					      slidesPerView: 4
					    },
					    1400: {
					      slidesPerView: 5
					    }
					}
				}),
				$pubSlides = $('#section-publishers .swiper-slide');

			$pubSlides.click(function() {
				$pubSlides.removeClass('swiper-slide-selected');
				$(this).addClass('swiper-slide-selected');
			});

			var hypeReady = function(hypeDocument, element, event) {
				if (hypeDocument.documentName() === "formats") {
					$pubSlides.click(function() {
						$pubSlides.removeClass('swiper-slide-selected');
						$(this).addClass('swiper-slide-selected');
						var time = $(this).attr('data-slide-click');
						hypeDocument.goToTimeInTimelineNamed(+time, 'Main Timeline');
						console.log(time);
					});
				}
			}
			if ("HYPE_eventListeners" in window === false) {
				window.HYPE_eventListeners = Array();
			}
			window.HYPE_eventListeners.push({"type":"HypeDocumentLoad", "callback":hypeReady});
		},
		setupAdvertisers = function() {
			var advSlider = new Swiper('#adv-slider', {
					slidesPerView: 7,
					spaceBetween: 8,
					breakpoints: {
					    450: {
					      slidesPerView: 3
					    },

					    800: {
					      slidesPerView: 4
					    },
					    1400: {
					      slidesPerView: 5
					    }
					}
				}),
				$advSlides = $('#section-advertisers .swiper-slide');

			$advSlides.click(function() {
				$advSlides.removeClass('swiper-slide-selected');
				$(this).addClass('swiper-slide-selected');
			});
		},
		setupTracking = function() {

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-41230543-4', 'auto');
			ga('send', 'pageview');

			ga(function(tracker) {
				clientId = tracker.get('clientId');
				FS.identify(clientId, {
					siteVisitor : true
				});
			});

			var hero = false,
				publishers = false,
				advertisers = false,
				richmedia = false,
				details = false,
				products = false, 
				interface = false;

			el.$doc.scroll(function() {

				if (scrollPercent(el.$hero) > 0 && hero === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'hero',
					  eventLabel: 'Scrolled To Hero Section'
					});
					hero = true;
				}

				if (scrollPercent(el.$publishers) > 0 && publishers === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'publishers',
					  eventLabel: 'Scrolled To Publishers Section'
					});
					publishers = true;
				}

				if (scrollPercent(el.$advertisers) > 0 && advertisers === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'advertisers',
					  eventLabel: 'Scrolled To Advertisers Section'
					});
					advertisers = true;
				}

				if (scrollPercent(el.$richmedia) > 0 && richmedia === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'richmedia',
					  eventLabel: 'Scrolled To Rich Media Section'
					});
					richmedia = true;
				}

				if (scrollPercent(el.$details) > 0 && details === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'details',
					  eventLabel: 'Scrolled To Details Section'
					});
					details = true;
				}

				if (scrollPercent(el.$products) > 0 && products === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'products',
					  eventLabel: 'Scrolled To Products Section'
					});
					products = true;
				}

				if (scrollPercent(el.$interface) > 0 && interface === false) {
					ga('send', {
					  hitType: 'event',
					  eventCategory: 'Sections',
					  eventAction: 'interface',
					  eventLabel: 'Scrolled To Interface Section'
					});
					interface = true;
				}

			});
		},
		start = function() {
			setupHero();
			setupHeader();
			setupPublishers();
			setupAdvertisers();
			setupTracking();
		};

	start();

}

var site = new Site();