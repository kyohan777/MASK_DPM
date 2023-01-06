 // copyright: minervasoft 2022
 $.fn.extend({	
	sfview: function() { // 21.11 dwa.kang@gmail.com
	
		const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
		const root = this;
		const sfwork = root[0];
		const sfcrop = $('#sfcrop')[0];
		const sfwrap = $('#sfwrap')[0];
		const sfimg = $('#sfimg')[0];
		const SCROLLBAR_WIDTH = 18;

		const Module = (typeof exports !== 'undefined') ? exports : (root.Module = {});
		const _imgBuff = new Image();
		const eventMap = new EventMap();
		
		const scales = [0.1, 0.3, 0.5, 1, 1.5, 2, 3];
		let scaleIndex = 3;
		let baseRatio = 1;
		
		setEvent();
		let curRatio = 1;
		let	angle = 0;		
		let pointStart = null;
		let scrollStart = null;
		let loadEvent = null;
		let initFit = 'fit_vert';
		let curFit = initFit;
		let areaZoom = false;
		let curFilename = '';
		let fileChanged = false;
		let canPanning = false;
		let imageRatio = 1;
		let isViewDual = false;
		let imgMargin = 15;
		let imgSelector = '#sfimg';
		let isFitDirt = false;
		let dragImg;
		
		let page = 0;
		let imgUrl = "";

		function setEvent() {

			$(_imgBuff).on('load', function() {
				$('#sfimg').attr('src', _imgBuff.src);
				imageRatio =  _imgBuff.height /  _imgBuff.width;
				document.body.style.cursor = 'auto';
								
				if (fileChanged) {
					Module.setFit(initFit);
				}
											
				if (loadEvent) {
					loadEvent(_imgBuff.width,  _imgBuff.height, Module.getRatio(), curFit);
				}
				
				imgUrl = _imgBuff.dataSrc;
				page = _imgBuff.page;
				eventMap.run('load', _imgBuff.width,  _imgBuff.height, curFilename, _imgBuff.src, imgUrl, page);
				
				$('iframe#embedded').hide();								
			});
			
			$('.sfimg').dblclick( _ =>  Module.redraw());
				
			$('.sfimg').mousedown(function(e) {
				if (canPanning) {
					e.preventDefault();
					pointStart = {x:e.clientX, y:e.clientY};
					const r = root[0];
					scrollStart = {x:r.scrollLeft, y:r.scrollTop};
					r.style.cursor = 'grabbing';
					return;
				}
				if (curRatio <= 5) {
					e.preventDefault();
					pointStart = {x:e.offsetX, y:e.offsetY};
					dragImg = this;
					$('#areaMarker').css({
						"display":"block",
						"left": pointStart.x + dragImg.offsetLeft, 
						"top": pointStart.y + dragImg.offsetTop,
						"width": 0, 
						"height":0
					});
				}
			})
			.mousemove(function(e) {
				if (e.buttons != 1) {
					return;
				}

				if (canPanning) {
					root[0].scroll(scrollStart.x -(e.clientX - pointStart.x), scrollStart.y -(e.clientY - pointStart.y));
					return;
				}

				if (pointStart != null) {
					$('#areaMarker').css({
						"left": Math.min(pointStart.x, e.offsetX) + dragImg.offsetLeft, 
						"top": Math.min(pointStart.y, e.offsetY) + dragImg.offsetTop,
						"width": Math.abs(e.offsetX - pointStart.x), 
						"height": Math.abs(e.offsetY - pointStart.y)
					});
				}
			})
			.mouseup(function(e) {
				if (canPanning) {
					root[0].style.cursor = 'auto';
					return;
				}
				pointStart = null;
				const position = $('#areaMarker').position();
				const width = $('#areaMarker').width();
				const height = $('#areaMarker').height();
				$('#areaMarker').css({
					"display":"none",
					"left": 0, 
					"top": 0,
					"width": 0, 
					"height":0
				});
				if (width < 20 || height < 20) {
					return;				
				}
				
				let ratio = $(root).width()/(width/curRatio);
				if (ratio > 5)
					ratio = 5;
				
				const oldRatio = curRatio;
				const oldIsFitDirt = isFitDirt;
				if (angle == 0 || angle == 180) {
					const x = position.left - dragImg.offsetLeft;
					const y = position.top - dragImg.offsetTop;
					Module.zoom(ratio);
					$(root).scrollLeft(x/oldRatio*ratio + dragImg.offsetLeft);
					$(root).scrollTop(y/oldRatio*ratio + dragImg.offsetTop);
				} else {
					const x = position.left - dragImg.offsetTop;
					const y = position.top - dragImg.offsetLeft;
					Module.zoom(ratio);
					$(root).scrollLeft(x/oldRatio*ratio + dragImg.offsetTop);
					$(root).scrollTop(y/oldRatio*ratio + dragImg.offsetLeft);
				}
				curRatio = oldRatio;
				isFitDirt = oldIsFitDirt;

				areaZoom = true;
			});
		};
		
		function alignCenter() {
			const width = isViewDual ? (sfimg.offsetWidth * 2 + imgMargin*4) : (sfimg.offsetWidth +  imgMargin*2);
	
			if (sfcrop.clientWidth > width) {
				sfwrap.style.left = `${(sfcrop.clientWidth - width) / 2}px`;
			} else {
				sfwrap.style.left = 0;
			}

			const height = sfimg.height + 2*imgMargin;
			if (sfcrop.clientHeight > height) {
				sfwrap.style.top = `${(sfcrop.clientHeight - height) / 2}px`;
			} else {
				sfwrap.style.top = '0px';
			}	
		}

		function getOffset(element) {
			const rect = element.getBoundingClientRect();
			return [rect.x, rect.y];
		}

		function crop() {
			let width =  Math.max(sfwork.clientWidth, sfwrap.clientWidth) ;
			let height = Math.max(sfwork.clientHeight, sfwrap.clientHeight) ;

			if ((sfwork.scrollHeight > sfwork.clientHeight) != (height > sfwork.clientHeight)) { //cur and next scrollbar diference
				width += SCROLLBAR_WIDTH * (sfwork.scrollHeight > sfwork.clientHeight ? 1 : -1);
			}

			$('#sfcrop').css({
				'width': width  - 3 + 'px',
				'height': height - 3 + 'px',
			})
		}
		
		Module.loadImage = function (url, filename, dataSrc, page, loadEventFunction) {
			
			document.body.style.cursor = 'wait';
			$("iframe#embedded").contents().find("body").empty();

			fileChanged = (curFilename != filename);
			curFilename = filename;
			_imgBuff.dataSrc = dataSrc;
			_imgBuff.page = page;
			_imgBuff.src = url; //loading image
			
			loadEvent = loadEventFunction; //called when image load complete			
		}
		
		Module.loadEmbedded = function (url) {
			const $body = $("iframe#embedded").contents().find("body");
			const bg = $('iframe.embedded').css('background');
			//const height = $('iframe.embedded').css('height');
			const height = $("#gridContainer", parent.document).height();
			console.log("body:" + $body + " bg:" + bg + " height:" + height);
			console.log("url:" + url);
			
			$body.empty();
			$body.css({'background':bg, 'height':height});
			$('iframe#embedded').show();
			if (url != null) {
				$('iframe#embedded').attr('src', url);
				$('iframe#embedded').height(height);
			}
		}
		
		Module.getRatio = _ =>$('#sfimg').width()/$('#sfimg')[0].naturalWidth;	
		Module.setInitFit =  fit => initFit = fit;
		
		Module.setFit = function (fit) {
			angle = 0;
			Module.rotate(0);

			switch (fit) {
			case 'fit_vert':
				const workHeight = (sfwork.scrollWidth > sfwork.clientWidth) ? sfwork.clientHeight : (sfwork.clientHeight - 16);
				const height = workHeight - imgMargin*2;
				$(imgSelector).css({'width': height/imageRatio, 'height': height});
				break;
			case 'fit_hori':
				const workWidth = (sfwork.scrollHeight > sfwork.clientHeight) ? sfwork.clientWidth : (sfwork.clientWidth - 16);
				const width = (isViewDual ? (workWidth - imgMargin*4)/2 : workWidth - imgMargin*2);
				$(imgSelector).css({
					'width': width, 
					'height': width*imageRatio,
					'margin': imgMargin
				});
				break;
			case 'fit_100':
				$(imgSelector).css({'width' : _imgBuff.width, 'height': _imgBuff.height});
				break;
			default:
				console.log('unkown fit');
				break;
			}

			$(root).scrollTop(0);
			$(root).scrollLeft(0);			
			scaleIndex = 3;

			Module.setCurRatio();
			curFit = fit;
			areaZoom = false;
			crop();
			alignCenter();

			isFitDirt = false;

			eventMap.run('fit', fit, curRatio);
			const r = sfwork;
			eventMap.run('resize', r.clientWidth, r.clientHeight, r.scrollWidth, r.scrollHeight);
			
			baseRatio = curRatio;
			return curRatio;
		}
		
		Module.rotate =  function(change) {
			angle = (angle + change + 360) % 360;
			switch (angle) {
			case 90:
			case 270:
				const sign = angle == 90 ? 1 : -1;
				const offset = (sfwrap.clientWidth - sfwrap.clientHeight)/2;
				const ox = (sfwork.clientWidth >= sfwrap.clientHeight) ? 0 : (offset - sfwrap.offsetLeft)*sign;
				const oy = (sfwork.clientHeight > sfwrap.clientWidth) ? 0 : (offset - sfwrap.offsetTop)*sign;

//console.log(offset, ox, oy, sfwrap.offsetLeft, sfwrap.offsetTop,[sfwork.clientWidth, sfwrap.clientHeight],[sfcrop.clientWidth, sfcrop.clientHeight]);				
				$('#sfwrap').css({'transform': `rotate(${angle}deg) translate(${oy}px, ${ox}px)`});
				
				$('#sfcrop').css({
					'width': (ox == 0 ? sfcrop.clientWidth: Math.min(sfcrop.clientHeight, sfwrap.clientHeight)) + 'px',
					'height':(oy == 0 ? sfcrop.clientHeight: Math.min(sfcrop.clientWidth, sfwrap.clientWidth))+ 'px',
				});
				
				break;
			case 180:
			case 0:
				$('#sfwrap').css({'transform': 'rotate(' + angle + 'deg)'});
				crop();
				break;
			}

			isFitDirt = true;

			const r = sfwork;
			eventMap.run('rotate', angle);
			eventMap.run('resize', r.clientWidth, r.clientHeight, r.scrollWidth, r.scrollHeight);
		}  
		
		Module.zoom = function (val) {
			let ratio;
			if (typeof val == 'string') {
				if (val == 'zoom_in' || val == 'zoom_out') {
					const newVal = scaleIndex + (val == 'zoom_in' ? 1 : -1);
					if (newVal >= 0 && newVal < scales.length) {
						scaleIndex = newVal;
						ratio = baseRatio * scales[scaleIndex];
						if (ratio > 5)
							ratio = 5;
					} else {
						return;
					}
				} else {
					baseRatio = ratio = parseInt(val.substring(5))/100;
					scaleIndex = 3;
				}
			} else {
				ratio = val;
			}

			if (angle == 90 || angle == 270 ) {
				const temp = angle;
				Module.rotate(360 - angle);
				$(imgSelector).css({'width' : _imgBuff.width * ratio, 'height': _imgBuff.height * ratio});
				crop();
				alignCenter();
				Module.rotate(temp);
			} else {
				$(imgSelector).css({'width' : _imgBuff.width * ratio, 'height': _imgBuff.height * ratio});
				crop();
				alignCenter();
			}

			
			curRatio = ratio;
			isFitDirt = true;
			
			eventMap.run('zoom', ratio, val);
			const r = sfwork;
			eventMap.run('resize', r.clientWidth, r.clientHeight, r.scrollWidth, r.scrollHeight);
		}
		
		Module.clear =  function()  {
			$('iframe#embedded').hide();								
			$('#sfimg').attr('src', EMPTY_IMG);	
		}
						
		Module.setCurRatio = function() {
			curRatio = Module.getRatio();
			return curRatio;
		}
						
		Module.on = (name, handler) => eventMap.add(name, handler);
		Module.setCanPanning = val => canPanning = val;
		Module.getAngle = _ => angle;

		Module.viewSingle = function(){
			isViewDual = false;
			imgSelector = '#sfimg'
			$('#sfimg2').css({
				'margin': 0 + 'px',
			});
			$('#sfimg2').hide();
			Module.redraw();			
		}
		
		Module.viewDual = function(src){
			isViewDual = true;
			imgSelector = '.sfimg';
			$('#sfimg2').css({
				'margin': imgMargin + 'px'
			});

			Module.loadSecondImage(src);
			$('#sfimg2').show();
			Module.redraw();			
		}
		
		Module.isViewDual = _ => isViewDual;

		Module.loadSecondImage = function(src) {
			if (src == null) {
				src = EMPTY_IMG;
			}
			$('#sfimg2').attr('src', src);			
		}

		Module.redraw = function(){
			//console.log('v-main', $('.v-main').css('width'));
			$('#sfwork').css({'width': $('.v-main').css('width')});
			if (isFitDirt) {
				Module.zoom(curRatio);
			} else {
				Module.setFit(curFit);
			}
		}
		
		Module.triggerEvent = (...args) => eventMap.run(...args);
		Module.getPage = _ => page;
		Module.getImgUrl = _ => imgUrl;
		Module.setMargin = margin => imgMargin = margin;
		Module.getMargin = _ => imgMargin;
		Module.setAnnoArea = function() {
			const $anno = $('canvas#sfanno'); 
			if (sfwork.clientWidth == sfwork.scrollWidth || sfwork.clientHeight == sfwork.scrollHeight) {
				$anno.css({
					'top': 0,
					'left': 0,
					'width': $('#sfimg').width(),
					'height': $('#sfimg').height(),
					'margin': imgMargin,
				});
				if ($anno.parent() != sfwrap) {
					$('#sfwrap').append($anno);
				}
			} else {
				$anno.css({
					'top': 0,
					'left': 0,
					'width': sfwork.clientWidth,
					'height': sfwork.clientHeight,
					'margin': 0
				});
				if ($anno.parent() != sfwork) {
					$('#sfwork').append($anno);
				}
			} 
		}
		Module.getImageSize = _ => [sfimg.naturalWidth, sfimg.naturalHeight];

		return Module;
	}
});