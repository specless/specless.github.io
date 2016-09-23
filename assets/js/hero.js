/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2016. MIT licensed.
 */
(function ($, window, document, undefined) {

	'use strict';

	$(function () {

		// Elements
		var demoAd = $( '#demo-ad' ),
			demoAdContents = $( '#demo-ad-contents' ),
			demoAdMocksite = $( '#demo-ad-mocksite' ),
			demoAdDevice = $( '#demo-ad-device' ),
			demoWidthSlider = $( '#demoWidthSlider' ),
			demoWidthValue = $( '#demoWidthValue' ),
			demoHeightSlider = $( '#demoHeightSlider' ),
			demoHeightValue = $( '#demoHeightValue' );


		var site = {

			setupAdDemo : function() {
				var currentW,
					currentH,
					minW,
					minH,
					widthRange,
					heightRange,
					tabletWidth,
					phoneWidth;

				function setDefaults() {
					currentW = demoAd.width();
					currentH = demoAdContents.height();
					minW = 300;
					minH = 50;
					widthRange = currentW - minW;
					heightRange = currentH - minH;
					tabletWidth =  currentW * 0.75;
					phoneWidth = currentW * 0.4;
					console.log(phoneWidth);
				}

				function updateWidth() {
					var currentV = demoWidthValue.val();
					var newW = widthRange * (currentV/10000) + minW;
					demoAd.width(newW);

					if (newW <= tabletWidth && newW > phoneWidth) {
						demoAdDevice.attr("data-device", "tablet");
					} else if (newW <= phoneWidth) {
						demoAdDevice.attr("data-device", "phone");
					} else {
						demoAdDevice.attr("data-device", "desktop");
					}
				}

				function updateHeight() {
					var currentV = 10000 - demoHeightValue.val();
					var newH = heightRange * (currentV/10000) + minH;
					var mocksiteH = currentH - newH;
					demoAdContents.height(newH);
					demoAdMocksite.height(mocksiteH);
				}

				function init() {
					setDefaults();

					$(window).on('resize', function() {

						demoAd.width('');
						demoAdContents.height('');
						demoAdMocksite.height('');

						demoWidthSlider.attr("data-initial-start", "10000");
						Foundation.reInit(demoWidthSlider);

						demoHeightSlider.attr("data-initial-start", "10000");
						Foundation.reInit(demoHeightSlider);

						setDefaults();
					});

					demoWidthSlider.on('moved.zf.slider', function(){
					    updateWidth();
					});

					demoHeightSlider.on('moved.zf.slider', function(){
					    updateHeight();
					});
				}

				init();

			},


		}

		var startSite = function() {
			$(document).foundation();
			site.setupAdDemo();
		};

		startSite();

	});

})(jQuery, window, document);
