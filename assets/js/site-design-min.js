var Site=function(){var e,i,s={$win:$(window),$doc:$(document),$header:$("#header"),$footer:$("#footer"),$hero:$("#section-hero"),$heroTop:$("#hero-top"),$heroAnimation:$("#hero-animation"),$publishers:$("#section-publishers"),$advertisers:$("#section-advertisers"),$richmedia:$("#section-richmedia"),$richmediaAnimation:$("#rich-media-animation"),$richmediaSpacer:$("#richmedia-spacer"),$details:$("#section-details"),$products:$("#section-products"),$interface:$("#section-interface"),$about:$("#section-about"),$icon:$("#details-icon")},t=function(e){var i=s.$doc.scrollTop(),t=s.$doc.height(),a=0;if(e){var o=e.height(),n=e.offset().top;a=i<=n?0:i>=n+o?1:(i-n)/o}else a=i/t;return a},a=function(){var e=window.matchMedia("only screen and (max-width: 760px)");return!!e.matches};setupHero=function(){var e,i=function(){var e=t(s.$heroTop),i=1.15*t(s.$richmediaSpacer),o=5,n=18.5,l=o*e+3,r=n*i+10;if(animation=HYPE.documents.hero,a())animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(3,"Main Timeline");else if(0===i){if(l<=o+3&&(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(l,"Main Timeline"),l===o+3?$("html").addClass("scroll-completed"):$("html").removeClass("scroll-completed")),t(s.$publishers)>0?(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(10,"Main Timeline"),$("html").addClass("hide-controls")):$("html").removeClass("hide-controls"),l<5.5){var d=$("#device-demo");d.css("width","100%"),$("#hero-headline-two > h2, #hero-headline-two > h4").css("opacity",1),$("#device-ad-slot").css("height","100%"),$("#demo-slider-horizontal").val(0),$("#demo-slider-vertical").val(0),$("#demo-slider-horizontal").rangeslider("update",!0),$("#demo-slider-vertical").rangeslider("update",!0),d.hasClass("device__phone")||(d.addClass("device__phone"),d.removeClass("device__laptop"),d.removeClass("device__tablet-portrait"),d.removeClass("device__tablet-landscape"))}}else{t(s.$products)>0?animation.goToTimeInTimelineNamed(31,"Main Timeline"):animation.goToTimeInTimelineNamed(28.5,"Main Timeline"),r<=n+10&&(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(r,"Main Timeline"),r>28?$(".scc-icon").addClass("scc-icon-visible"):$(".scc-icon").removeClass("scc-icon-visible"));var c=$(".rich-media-ad-slot"),m=c.offset().top-s.$doc.scrollTop()+c.height(),v=s.$details.offset().top-s.$doc.scrollTop();if(v-m<=0){s.$icon.addClass("details-icon-visible"),s.$icon.width(c.width()),s.$icon.height(c.height());var h=v-(c.offset().top-s.$doc.scrollTop());h<=c.height()/2&&(h=c.height()/2),s.$icon.css("margin-top",-1*h)}else s.$icon.removeClass("details-icon-visible")}},o=function(e,t,a){"hero"===e.documentName()&&(e.startTimelineNamed("Main Timeline"),s.$doc.scroll(i),s.$win.resize(i),document.addEventListener("touchmove",i))},n=function(){"HYPE_eventListeners"in window==!1&&(window.HYPE_eventListeners=Array()),window.HYPE_eventListeners.push({type:"HypeDocumentLoad",callback:o});var e={polyfill:!1,rangeClass:"slider",disabledClass:"slider-disabled",horizontalClass:"slider-horizontal",verticalClass:"slider-vertical",fillClass:"slider-fill",handleClass:"slider-knob",onSlide:function(e,i){var s="horizontal",t=1e3;if("vertical"===this.$element.attr("data-orientation")){var a=100-i+"%";$("#device-ad-slot").css("height",a)}else{var a=i/100,o=$("#device-demo"),n=14,l=31,r=60;i<=n?(o.addClass("device__phone"),o.removeClass("device__tablet-portrait"),o.removeClass("device__tablet-landscape"),o.removeClass("device__laptop")):i>n&&i<=l?(o.addClass("device__tablet-portrait"),o.removeClass("device__phone"),o.removeClass("device__tablet-landscape"),o.removeClass("device__laptop")):i>l&&i<=r?(o.addClass("device__tablet-landscape"),o.removeClass("device__tablet-portrait"),o.removeClass("device__phone"),o.removeClass("device__laptop")):i>r&&(o.addClass("device__laptop"),o.removeClass("device__tablet-portrait"),o.removeClass("device__phone"),o.removeClass("device__tablet-landscape")),o.css("width",100+i/100*400+"%"),$("#demo-slider-horizontal").val()>4?$("#hero-headline-two > h2, #hero-headline-two > h4").css("opacity",0):$("#hero-headline-two > h2, #hero-headline-two > h4").css("opacity",1)}}};$('input[type="range"]').rangeslider(e),$(".slider-knob").mousedown(function(){$(this).parent().hasClass("slider-horizontal")?$("#demo-message-width").css("opacity",0):$(this).parent().hasClass("slider-vertical")&&$("#demo-message-height").css("opacity",0)})};n()},setupHeader=function(){var e=function(){var e=t(s.$heroTop);e>=1?s.$header.addClass("header-dark"):s.$header.removeClass("header-dark")};s.$doc.scroll(e)},setupPublishers=function(){var e=new Swiper("#pub-slider",{slidesPerView:7,spaceBetween:8,breakpoints:{450:{slidesPerView:3},800:{slidesPerView:4},1400:{slidesPerView:5}}}),i=$("#section-publishers .swiper-slide");i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected")});var s=function(e,s,t){"formats"===e.documentName()&&i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected");var s=$(this).attr("data-slide-click");e.goToTimeInTimelineNamed(+s,"Main Timeline"),console.log(s)})};"HYPE_eventListeners"in window==!1&&(window.HYPE_eventListeners=Array()),window.HYPE_eventListeners.push({type:"HypeDocumentLoad",callback:s})},setupAdvertisers=function(){var e=new Swiper("#adv-slider",{slidesPerView:7,spaceBetween:8,breakpoints:{450:{slidesPerView:3},800:{slidesPerView:4},1400:{slidesPerView:5}}}),i=$("#section-advertisers .swiper-slide");i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected")})},setupTracking=function(){!function(e,i,s,t,a,o,n){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,o=i.createElement(s),n=i.getElementsByTagName(s)[0],o.async=1,o.src=t,n.parentNode.insertBefore(o,n)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-41230543-4","auto"),ga("send","pageview"),ga(function(s){e=s.get("clientId"),FS.identify(e,{displayName:"Site Visitor",siteVisitor:!0}),i=FS.getCurrentSessionURL(),console.log(i)});var a=!1,o=!1,n=!1,l=!1,r=!1,d=!1,c=!1;s.$doc.scroll(function(){t(s.$hero)>0&&a===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"hero",eventLabel:"Scrolled To Hero Section"}),a=!0),t(s.$publishers)>0&&o===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"publishers",eventLabel:"Scrolled To Publishers Section"}),o=!0),t(s.$advertisers)>0&&n===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"advertisers",eventLabel:"Scrolled To Advertisers Section"}),n=!0),t(s.$richmedia)>0&&l===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"richmedia",eventLabel:"Scrolled To Rich Media Section"}),l=!0),t(s.$details)>0&&r===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"details",eventLabel:"Scrolled To Details Section"}),r=!0),t(s.$products)>0&&d===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"products",eventLabel:"Scrolled To Products Section"}),d=!0),t(s.$interface)>0&&c===!1&&(ga("send",{hitType:"event",eventCategory:"Sections",eventAction:"interface",eventLabel:"Scrolled To Interface Section"}),c=!0)})},start=function(){setupHero(),setupHeader(),setupPublishers(),setupAdvertisers(),setupTracking()},start()},site=new Site;