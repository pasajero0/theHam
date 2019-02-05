$(document).ready(function(){

	//=========================Anchor
	$(".menu-top-link").on("click", function (event) {
    event.preventDefault();
    let id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
	});

  //=========================navbarSearchBtn
  $("#navbar-search-btn").on("click", function (event) {
  	$(this).toggleClass("navbar-search-btn-clicked");
		$("#navbar-search").animate({
		    opacity: 'toggle',
		    width: 'toggle'
		  }, {
		    duration: 300, 
		    specialEasing: {
	      opacity: 'linear',
	      width: 'swing'
		    }
			}	
		)
  });

	//=========================Our Services
	$(".services-menu-item").on("click",  function (event) {
		let value = event.currentTarget.attributes[1].nodeValue;
		$(".services-menu-item").removeClass('active');
		$(event.currentTarget).addClass('active');
		$("#services-img, #services-txt").empty();
		$("#services-txt").text(ourServices[value].txt);
		$("#services-img").append(ourServices[value].img);
	});

	//=========================Our Amazing Work
	function ourWorksTemplate (start, end) {
		return ourWorks.slice(start, end).map( function(val) {
		 	return $("#our-amazing-work-block").append(`
				<div class="our-amazing-work-block-item ${val.class}">
					<div class="our-amazing-work-block-item-overlay">
						<div class="our-amazing-work-block-item-overlay-roundscontainer">
							<a href="#" class="our-amazing-work-block-item-overlay-link"><i class="fas fa-link"></i></a>
							<a href="#" class="our-amazing-work-block-item-overlay-search"><i class="fas fa-search"></i></a>
						</div>
						<p class="our-amazing-work-block-item-title">${val.title}</p>
						<p class="our-amazing-work-block-item-subtitle">${val.subtitle}</p>
					</div>
					<div class="our-amazing-work-block-imgcontainer">
						${val.img}
					</div>
				</div>
			`);
		});
	}

	ourWorksTemplate(0, ourWorks.length/3);
	
	function itemsFilter (value) {
		if (value === 'graphicDesign') {
			$(".our-amazing-work-block-item").hide();
			$(".graphic-design").fadeIn(100);
		} else if (value === 'webDesign') {
			$(".our-amazing-work-block-item").hide();
			$(".web-design").fadeIn(100);
		} else if (value === 'landingPages') {
			$(".our-amazing-work-block-item").hide();
			$(".landing-pages").fadeIn(100);
		} else if (value === 'wordpress') {
			$(".our-amazing-work-block-item").hide();
			$(".wordpress").fadeIn(100);
		} else {
			$(".our-amazing-work-block-item").fadeIn(300);
		}
	}

	$(".our-amazing-work-menu-item").on("click",  function (event) {
		let value = event.currentTarget.attributes[1].nodeValue;
		$(".our-amazing-work-menu-item").removeClass('chosen');
		$(event.currentTarget).addClass('chosen');
		itemsFilter(value);
	});
	
	$(".loader-container").hide();

	let moreWorksClickCount = 0;

	$("#load-more-works").on("click",  function (event) {
		moreWorksClickCount += 1;
		if (moreWorksClickCount == 1 ) {
			$("#works-loader-container").slideDown(300);
			setTimeout(function(){ 
				$("#works-loader-container").hide();
				ourWorksTemplate(ourWorks.length/3, (ourWorks.length/3*2));
				itemsFilter($('.chosen')[0].attributes.work.nodeValue);
			}, 2000);
		} else if (moreWorksClickCount == 2 ) {
			$("#load-more-works-container").hide();
			$("#works-loader-container").slideDown(300);
			setTimeout(function(){ 
				$("#works-loader-container").hide(); 
				ourWorksTemplate((ourWorks.length/3*2));
				itemsFilter($('.chosen')[0].attributes.work.nodeValue);
			}, 2000);
		}
	});

	//=========================What People Say About theHam
	$('.what-people-say-slider').slick({
		slidesToShow: 4,
	  slidesToScroll: 1,
		infinite: true,
		speed: 1000,
	 	variableWidth: false,
		nextArrow: '<i class="fas fa-chevron-right chevron-right"></i>',
		prevArrow: '<i class="fas fa-chevron-left chevron-left"></i>',
	});

	$(".what-people-say-slide").on("click", function (event) {
		let value = event.currentTarget.attributes[1].nodeValue;
		$(".slider-img-border").removeClass('clicked');
		$(event.currentTarget.firstElementChild).addClass('clicked');
		$("#review-txt, #reviewer-name, #reviewer-position, #reviewer-img").empty();
		$("#review-txt").text(reviewers[value].text);
		$("#reviewer-name").text(reviewers[value].name);
		$("#reviewer-position").text(reviewers[value].position);
		$("#reviewer-img").append(reviewers[value].photo);
	});

	//=========================Gallery of best images
	function gridItemTemplate (start, end) {
		return images.slice(start, end).map( function(val) {
		 	return $("#grid").append(`
				<div class="grid-item">
			  	<img src="${val.src}" alt="">
				</div>
			`);
		});
	}

	function addMasonry () {
		return $('#grid').masonry({
		  itemSelector: '.grid-item',
		  fitWidth: true,
		  gutter: 10,
		  columnWidth: 20,
		}); 
	}
	
	gridItemTemplate(0, images.length/3 );
	setTimeout(function(){addMasonry()}, 100);

	let moreImgClickCount = 0;

	$("#load-more-img").on("click",  function (event) {
		moreImgClickCount += 1;
		if (moreImgClickCount == 1 ) {
			$("#gallery-loader-container").slideDown(300);
			setTimeout(function(){ 
				$("#gallery-loader-container").hide();
				gridItemTemplate(ourWorks.length/3, (ourWorks.length/3*2));
				$('#grid').masonry( 'destroy' );
				addMasonry();
			}, 2000);
		} else if (moreImgClickCount == 2 ) {
			$("#load-more-gallery-container").hide();
			$("#gallery-loader-container").slideDown(300);
			setTimeout(function(){ 
				$("#gallery-loader-container").hide(); 
				gridItemTemplate((ourWorks.length/3*2));
				$('#grid').masonry( 'destroy' );
				addMasonry();
			}, 2000);
		}
	});


});