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
		start = function() {
			setupHero();
			setupHeader();
			setupPublishers();
			setupAdvertisers();
		};

	start();

}

var site = new Site();