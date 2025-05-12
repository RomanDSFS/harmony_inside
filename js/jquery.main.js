// page init
jQuery(function(){
	initBoxSize();
	initSideContent();
	initTabs();
	initSmoothScroll();
});

function initTabs(){
	jQuery('.content-left .tabs').tabs({
		animSpeed : 300,
		activeClass : 'active',
		links: '.link-left'
	});
	jQuery('.content-right .tabs').tabs({
		animSpeed : 300,
		activeClass : 'active',
		links: '.link-right'
	});
}

function initBoxSize(){
	var box = jQuery('.square'),
		content = jQuery('.square-content'),
		boxWidth = box.width(),
		boxHeight = box.height();

	function setProportion(){
		boxWidth = box.width();
		boxHeight = box.height();

		if(boxWidth >= boxHeight){
			content.css({
				'width': boxHeight,
				'height': '100%'
			});
		} else{
			content.css({
				'width': '100%',
				'height': boxWidth
			});
		}
	}

	setProportion();

	jQuery(window).on('resize orientationchange', setProportion);
}

function initSideContent(){
	var linkLeft = jQuery('.link-left'),
		linkRight = jQuery('.link-right'),
		contentLeft = jQuery('.content-left'),
		contentRight = jQuery('.content-right'),
		leftIsOpen = false,
		rightIsOpen = false;

	linkLeft.one('click', function(e){
		e.preventDefault();
		if(!leftIsOpen){
			contentLeft.addClass('is-open');
			leftIsOpen = true;
		}
	});

	linkRight.one('click', function(e){
		e.preventDefault();
		if(!rightIsOpen){
			contentRight.addClass('is-open');
			rightIsOpen = true;
		}
	});
}

jQuery.fn.tabs = function(options){

	options = jQuery.extend({
		animSpeed : 500,
		activeClass : 'active',
		links: '.tabset a'
	}, options);

	return this.each(function(){
		var links = jQuery(options.links),
			activeTab,
			isAnimated;

		links.each(function(){
			var link = jQuery(this),
				linkUrl = link.attr('href'),
				currentTab = jQuery(linkUrl);

			if(link.hasClass(options.activeClass)){
				currentTab.show().addClass('active');
				activeTab = currentTab;
			} else{
				currentTab.hide();
			}

			link.on('click',function(e){
				e.preventDefault();
				if (isAnimated || activeTab == currentTab) return;
				links.removeClass(options.activeClass);
				link.addClass(options.activeClass);
				isAnimated = true;

				function showTab(){
					currentTab.addClass('active').fadeIn(options.animSpeed, function(){
						isAnimated = false;
					});
				}
				if(activeTab){
					activeTab.removeClass('active').fadeOut(options.animSpeed, function(){
						showTab();
					});
				} else{
					showTab();
				}
				activeTab = currentTab;
			});
			
		});
	});
}

function initSmoothScroll(){
	var links = jQuery('.square-content .link'),
		page = jQuery('html, body'),
		pageWidth = window.innerWidth,
		isAdd = (pageWidth >= 1025) ? false : true,
		btnTop = jQuery('.btn-top'),
		$window = jQuery(window),
		pageIsTop = ($window.scrollTop() > 50) ? false : true;

		function smoothScroll(e){
			var href = jQuery.attr(this, 'href');

			page.animate({
				scrollTop: jQuery(href).offset().top
			}, 700);

		}

	function switchHandler(){
		pageWidth = window.innerWidth;

		if(pageWidth >= 1024 && !isAdd){
			links.each(function(){
				jQuery(this).off('click', smoothScroll);
				isAdd = true;
			});
		} else if(pageWidth < 1024 && isAdd){
			links.each(function(){
				jQuery(this).on('click', smoothScroll);
				isAdd = false;
			});
		}
	}

	switchHandler();

	function checkPos(){
		if($window.scrollTop() >= 50 && !pageIsTop){
			page.addClass('is-bottom');
			pageIsTop = true;
		} else if($window.scrollTop() < 50 && pageIsTop) {
			page.removeClass('is-bottom');
			pageIsTop = false;
		}
	}

	checkPos();

	$window.on('resize orientationchange', switchHandler);

	$window.on('scroll', checkPos);

	btnTop.on('click', function(e){
		page.scrollTop(0);
	});
}
