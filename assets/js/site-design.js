var Site = function() {
	
	var el = {
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
			$richmediaSpacer : $('#richmedia-spacer'),
			$details : $('#section-details'),
			$interface : $('#section-interface'),
			$about : $('#section-about')
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

					if (nextPercent === 0) {
						if (time <= duration + 3) {
							animation.pauseTimelineNamed('Main Timeline');
							animation.goToTimeInTimelineNamed(time, 'Main Timeline');
						}
						if (scrollPercent(el.$advertisers) > 0) {
							animation.pauseTimelineNamed('Main Timeline');
							animation.goToTimeInTimelineNamed(10, 'Main Timeline');
						}
						el.$heroAnimation.css('margin-top', 0);
					} else {
						if (nextTime <= nextDuration + 10) {
							animation.pauseTimelineNamed('Main Timeline');
							animation.goToTimeInTimelineNamed(nextTime, 'Main Timeline');
							el.$heroAnimation.css('margin-top', 0);
						} else {
							if (lastScroll) {
								var distance = (el.$doc.scrollTop() - lastScroll);
								if (distance >= 0) {
									el.$heroAnimation.css('margin-top', '-' + distance + 'px');
								} else {
									el.$heroAnimation.css('margin-top', 0);
								}
							} else {
								lastScroll = el.$doc.scrollTop();
							}
						}
					}
				},
				hypeReady = function(hypeDocument, element, event) {
					hypeDocument.startTimelineNamed('Main Timeline');
					el.$doc.scroll(updateTime);
					document.addEventListener('touchmove', updateTime);
					el.$win.resize(function() {
						lastScroll = undefined;
						updateTime();
					});
				},
				init = function() {
					if ("HYPE_eventListeners" in window === false) {
						window.HYPE_eventListeners = Array();
					}
					window.HYPE_eventListeners.push({"type":"HypeDocumentLoad", "callback":hypeReady});
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
				$(this).addClass('swiper-slide-selected');;
			});
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
				$(this).addClass('swiper-slide-selected');;
			});
		},
		start = function() {
			setupHero();
			setupHeader();
			setupPublishers();
			setupAdvertisers();
		};

	start();

}

var site = new Site();