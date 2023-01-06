class Toolbar {
	static $view;
	static $thumbnails;
	
	static  init($view, $thumbnails) {
		Toolbar.$view = $view;
		Toolbar.$thumbnails = $thumbnails;	

		function isDualView() {
			return $('#view_dual').children().hasClass('selected');
		}
	
		$view.on('zoom', function(ratio, id) {
			if (id == 'zoom_in' || id == 'zoom_out') {
				const $option = $('#size-percent option:first');

				$option.text(Math.floor(ratio * 100));
				$('#size-percent').val('label');
			}
		});

		$view.on('load', function(width, height, filename) {
			$('#imageSize').text(width + ' x ' + height);
			$('#filename').text(filename);
			$view.scaleIndex = 3;
		});

		$view.on('fit', function(fit, ratio) {
			$('#size-percent').val(fit);
			$view.scaleIndex = 3;
		});
			
		$('ul.radio li').click(function(){
			$(this).siblings().children('.selected').removeClass('selected');
			$(this).children().addClass('selected');
		});
		
		$('ul.check li').click(function(){
			$(this).toggleClass('checked');
			$(this).children().toggleClass('selected');
		});
		
		$('ul.v-view-wrap li, ul.v-quick-view-wrap li, ul.v-zoom-wrap li, ul.v-quick-zoom-wrap li, ul.v-rotate-wrap li').click(function(){
			const $li = $(this);
			const id = $li.attr('class');
			const group = id.split('_')[0];

			switch(group) {
			case 'rotate':
				$view.rotate({'rotate_ccw': -90, 'rotate_cw': 90, 'rotate_180': 180}[id]);
				break;
			case 'zoom':
				$view.zoom(id);
				break;
			case 'fit':			
				$view.setFit(id);
				$('#size-percent').val(id); 
				break;
			case 'v-size-percent':
				// do nothing			
				break;
			default:
				if (id == 'print') {
					$('#printImage').attr('src', $('#sfimg').attr('src'));
					$('#printImage').removeClass('no-print');
					window.print();
					$('#printImage').addClass('no-print');
				} else {
					console.log('click id:', id, $li)
				}
				break;
			}
		});

		$('#size-percent').change(function(){
			const id = $(this).val();
			const group = id.split('_')[0];
			switch(group) {
			case 'zoom':
				$view.zoom(id);
				break;
			case 'fit':			
				$view.setFit(id); 
				break;
			default:
				console.log(id);
				break;	
			}
		});

		$('.v-wide-wrap li').click(function(){
			switch (this.getAttribute('id')) {
			case 'view_fullscreen':
				if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen();
				} else {
					if (document.exitFullscreen) {
					  document.exitFullscreen();
					}
				}
				$(this).children().toggleClass('selected');
				break;		
			case 'view_single':
				if (!isDualView())
					return;
				$('#view_dual').children().toggleClass('selected');
				$('#view_single').children().toggleClass('selected');
				$view.viewSingle();
				break;
			case 'view_dual':
				if (isDualView())
					return;
				$('#view_dual').children().toggleClass('selected');
				$('#view_single').children().toggleClass('selected');
				$view.viewDual($thumbnails.getNextSrc());
				break;
			}
		});

		$('.v-quick-toggle').click(function(){  // quick bar on/off
			$('.v-quick-wrap').fadeToggle();
			$(this).toggleClass('selected');
		});	

		//quick
		$(".v-quick-close").click(function(){
			$(".v-quick-wrap").fadeOut();
			$(".v-quick-toggle").removeClass('selected');
		});
		//side
		$(".v-page-list-more").click(function(){
			Toolbar.showThumbnails(!$(this).hasClass("aa"));
		});
		

		window.addEventListener('resize', function( e ) {
			$view.redraw();
		});
	}
			
	static showThumbnails(show) {
		if ($(".v-page-list-more").hasClass("aa") == show) {
			return;
		}
		
		let width = $(window).width() - $('.v-main').width();
		if(show){
			width = 'calc(100vw - ' + width + 'px - 171px)';
			$(".v-side").css("width","171px");
			$(".v-main").css({"padding-left":'171px'});
			$(".v-wrap .v-main .v-anno-wrap").css({"left":'171px'});
			$(".v-page-list-more").removeClass("slide-out")
			$(".v-page-list-more").addClass("slide-in");
			$(".v-page-list-more").addClass("aa");   
			$('.v-page-list-more').addClass('selected');
		}else{
			width = 'calc(100vw - ' + width + 'px + 171px)';
			$(".v-side").css("width","0");
			$(".v-main").css({"padding-left":'0'});
			$(".v-wrap .v-main .v-anno-wrap").css({"left":'0'});
			$(".v-page-list-more").removeClass("slide-in")
			$(".v-page-list-more").addClass("slide-out");
			$(".v-page-list-more").removeClass("aa");            
			$('.v-page-list-more').removeClass('selected');
		}
		this.setWidth(width);
		
		this.$view.redraw();

		this.$thumbnails.setThumbnailStatus(show);
	}

	static showMin(min) {
		$('div.v-page-name-wrap, ul.v-wide-wrap, ul.v-navi-wrap, div.v-quick-wrap').css('display', min ? 'none' : '');	
		this.showThumbnails(!min);		
	}

	static showToolbar(show) {
		if ($('div.v-side-toolbar').is(':visible') == show) {
			return;			
		}
		
		$('div.v-side-toolbar, div.v-toolbar').css('display', show ? '': 'none');	
		const height = $('div.v-page-thumb-list').height() + $('div.v-side-toolbar').height()*(show ? -1 : 1)  + 'px';
		
		$('div.v-page-thumb-list, div.v-content').css('height', height);
	}
	
	static showControl(show) {
		$('ul.v-pass-wrap ~ ul').css('display', show ? '': 'none');			
	}

	static setWidth(width) {
		$(".v-main, iframe.embedded, .v-wrap .v-main .v-toolbar, .v-wrap .v-main .v-anno-wrap").css('width', width);
	}
}