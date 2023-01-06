// copyright: minervasoft 2022
$.fn.extend({
	thumbnails: function(clickImageCallback) {
		const root = this;
		let $container;
		const Module = (typeof exports !== 'undefined') ? exports : (root.Module = {});
		let tick = 0;
		let $activeImg = null;
		const eventMap = new EventMap();
		const EXTS = ['doc', 'docx', 'htm' , 'html', 'hwp', 'm4a', 'mp3', 'mp4', 'pdf', 'ppt', 'pptx', 'txt', 'xls', 'xlsx', 'zip'];
		let imgWrap = '$img';
		let wrapTag = '';
		const FAKE_ZIP = 'image/x-icon';// if unknown mime type or not begin with image/, browser download data automatically, so set image/x-icon instead of application/zip
		let thumbnailStatus = true;

		let debugMode = false;
		if (clickImageCallback == null) {
			clickImageCallback = _ => {}; //do nothing
			console.log('clickImageCallback handler does not set.');
		}
		
		init();
		
		function init() {
			if (root.length == 0) {
				console.error('thumbnails() selector not found');
				return;
			}
			$container = root[0].tagName == 'DIV' ? root : root.parents('DIV');
			console.log('thumbnails created', 'top:', root.offset().top, 'height', root.height());
			
			// event handler
			$container.scroll(function() {
				setTimeout(function(oldTick) { // remove continued scroll (get new one only)
					if (oldTick == tick) {
					    $.each($('img'), function() {
					        if (!this.working && this.src == '' && Module.isVisible($(this)) ) {
					        	this.working = 1; // not work twice
					        	let $item = $(this);
					        	this.onerror = function() {
									$item.attr({
										'src':'/sfview/img/v-noimg.svg',
										'isimg': false, // not to be print or zip
										'ext': 'NON'
									});
					        		debug('no image or conversion fail:', this.src );					        		
					        	};
					        	fetchImg(this);
					        }
					    });
					}
				}, 100, ++tick);		
			});
			
		 	$(document).on('click', 'img.thumbnail', function(event, bufferNextImg) {
				event.preventDefault();
		 		let $img = $(this);						 		

		 		if (event.ctrlKey) {
					eventMap.run('select', 'toggle', $img);
				} else {
					findThumbnail('selected').each(function(index, img) {
						eventMap.run('select', 'remove', $(img));
					});	
			 		if (event.shiftKey) {
			 			if ($activeImg) {
			 				let seq1 = $activeImg.attr('seq');
			 				let seq2 = $img.attr('seq');
			 				let end = Math.max(seq1, seq2);
		 					
			 				for (let i = Math.min(seq1, seq2); i <= end; i++ ) {
								const $img = findThumbnail('[seq=' + i +']');
								eventMap.run('select', 'add', $img);
			 				}
			 			}
			 		} else {
				 		if ($activeImg != null) {
				 			if (equals($img, $activeImg)) {
				 				return;
				 			}
				 			$activeImg.removeClass('active selected');
						}
				 		$img.addClass('active');
						eventMap.run('select', 'add', $img);
				 		$activeImg = $img;
				 		const isImgFile = isImg($img);
				 		const src = ($img.attr('seperatedThumbnail') || !isImgFile) ? $img.attr("data-src") : ($img.attr("src") ?? $img.attr("data-src"));
				 		
				    	clickImageCallback(src, $img.attr("title"), $img, isImgFile);
						eventMap.run('click', src, $img, isImgFile);
						if (equals($img, $(root).children(':first'))) {
							eventMap.run('first', src, $img, isImgFile);
						}
						if (equals($img, $(root).children(':last'))) {
							eventMap.run('last', src, $img, isImgFile);
						}
				    	
				 		if (!thumbnailStatus) {	
							const $next = findThumbnail('next');
					        if ($next != null && $next.length > 0 && bufferNextImg && $next.attr('src') == null) {
								fetchImg($next[0])
				 			}
				 		}
			 		}
		 		}
		 	});			
		}
		
		function fetchImg(img) {
			let $img = $(img);
			let contentType; 
	    	let dataSrc = $img.attr('data-src');
	    	if (!dataSrc) {
				return;
			}
        	$img.one('load', function(){
				if (img.naturalWidth > img.naturalHeight) {
					let $wrap = $img.parents(wrapTag);
					$img.addClass('v-wide');
					if ($wrap) {
						$wrap.addClass('v-wide');
					}					
				}
			});
			
			fetch(dataSrc).then(function(response) {
				contentType = response.headers.get('content-type');
				let	ext = response.headers.get('file_ext');
				$img.attr('ext', ext);
				if (contentType.startsWith('image/')) {
					$img.attr('isimg', true);
					return response.blob();
				} else {
					$img.attr('isimg', false);
					img.src = '/sfview/ext/' + (EXTS.includes(ext) ? ext : 'default') + '.png';
					
					return null;
				}
			}).then(blob => {
				if (blob != null) {
					if (contentType == FAKE_ZIP) { 
						let zip = new JSZip();
						zip.loadAsync(blob)
						.then(function (zip) {
							let $wrap = $img.parents(wrapTag);
							let $img0 = $img;
							const title = $img.attr('title');
							let $element = $wrap;
							let promises = [];
							zip.forEach(function(_, file) {
								promises.push(file.async('blob'));
								
							});
							
							Promise.all(promises).then(values => {
								let i = 0;
								values.forEach(function(data){
									if (i != 0) {
										$element = makeImg(null, title);
									}
									$img = $element.find('img.thumbnail');
									$img.attr('src', URL.createObjectURL(data));
									$img.attr('isimg', true);
									$img.attr('page', i);
									if (i != 0) {//add after $img set
										$img.attr('data-src', dataSrc);
										$img.attr('selected', $img0.attr('selected'));
										$img.attr('class', $img0.attr('class'));
										$img.attr('ext', $img0.attr('ext'));
										
										$element.attr('class', $wrap.attr('class'));
										$wrap.after($element); 
										$wrap = $element;
									}
									i++;
								});
																		
								resetSeq();
							});
							
						}, function (e) {
							console.log('zip error', e);
						});
					} else {										
						img.src = URL.createObjectURL(blob);
					}
				} 
			}).catch((error) => {
				console.log('fetch error', error, dataSrc); 
			});							
		}
		
		function showThumbnail(pos) {
			const $img = findThumbnail(pos);

			if ($img != null && $img.length > 0) {
				const src = $img.attr('src');
				if (src == null) {
					$img.on('load', function() {
						$img.trigger('click', pos == 'next');
					});
					
					if (!thumbnailStatus) {
						fetchImg($img[0]);
						return;
					}
				} else {
					$img.trigger('click', pos == 'next');								
				}
				
				if (!Module.isVisible($img) || src == null) {
					Module.scrollToItem($img);
				} 				
			}
		}
		
		function findThumbnail(cmd) {
			switch (cmd) {
			case 'first':
				return $(root).find('img.thumbnail:first');	
			case 'last':
				return $(root).find('img.thumbnail:last');	
			case 'selected':
				return $(root).find('img.thumbnail.selected');	
			case 'all':
				return $(root).find('img.thumbnail');	
			case 'next':
				if ($activeImg) {
					const $imgs =  $(root).find('img.thumbnail');
					const index = $imgs.index($activeImg);
					if (index < $imgs.length - 1) {
						return $($imgs.get(index + 1));
					}
				}
				break;	
			case 'prev':
				if ($activeImg) {
					const $imgs =  $(root).find('img.thumbnail');
					const index = $imgs.index($activeImg);
					if (index > 0) {
						return $($imgs.get(index - 1));
					}
				}
				break;
			default:
				if (cmd.startsWith('[')) {
					return  $(root).find('img.thumbnail' + cmd);
				} else {
					return  $(root).find(cmd);
				}
			}
			
			return null;
		}


		function makeImg(src, title, tag, thumbnail) {
			const $img = $('<img>');
			$img.attr('data-src', src);
			$img.attr('title', title);
			$img.addClass('thumbnail');
			if (tag) {
				$img.attr('tag', tag);
			}
			if (thumbnail) {
				$img.attr('src', thumbnail);
				$img.attr('isimg', true);
				$img.attr('seperatedThumbnail', true);
			}

			return $(imgWrap.replace('$img', $img[0].outerHTML).replace('$title', title));
		}
		
		function add(src, title, tag, thumbnail) {
			$(root).append(makeImg(src, title, tag, thumbnail));
		}
		
		function remove(src) {
			const $img = findThumbnail('[data-src="' + src +  '"]');
			if ($img.length > 0) {
				const $wrap = $img.parents(wrapTag);
				if ($wrap.length > 0) {
					$wrap.remove();
					
					return 1;
				}
			}
			
			return 0;
		}
		
		function debug(...msgs) {
			if (debugMode)
				console.log(msgs);
		}
		function equals($img1, $img2) {
			return $img1 == $img2;
		}
		
		function isImg($img) {
			return $img.attr('isimg') == 'true';
		}
		
		function getFilename(url) {  
			const pos = url.lastIndexOf('=');
			return url.substr(pos > 0 ? pos + 1 : url.lastIndexOf('/') + 1); 
		}

		function zipDownload($imgs) {
			const zip = new JSZip();

			let processed = 0;
			$imgs.each(function(index, img) {
				if (!$('#printModal').is(':visible')) { // cancel button pressed
					return;
				}
	
				const url =  img.getAttribute('data-src');
				let contentType;
				let ext;

				fetch(url)
				.then(function(response) {
					contentType = response.headers.get('content-type');
					ext = response.headers.get('file_ext');

					return response.blob()
				})
				.then(function(blob) {
					let filename = img.getAttribute('title');				
					filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '');
					if (filename.indexOf('.') < 0 && ext != null) {
						filename += '.' + ext;
					}
					const last4 = filename.substring(filename.length - 4).toLowerCase();
					if (['.tif', '.j2c'].includes(last4)) {
						filename = filename.substring(0, filename.length - 3) + 'jpg';
					}
						
					let fileCount = 0;
					
					if (contentType == FAKE_ZIP) { // if unknown mime type or not begin with image/, browser download data automatically, so set image/x-icon instead of application/zip
						let unzip = new JSZip();
						unzip.loadAsync(blob)
						.then(function (unzip) {
							let i = 0;
							const pos = filename.lastIndexOf('.');
							unzip.forEach(function(_, file) {
								file.async('blob').then(function(data) {
									let curName;
									if (pos > 0) {
										curName = filename.substring(0, pos - 1) + '_' + i + filename.substring(pos);
									} else {
										curName = filename + '_' + i;
									}						
									zip.file(curName, data, { binary: true });			  
									i++;
									if (i == fileCount) {
										processed++;
									}
								});
								fileCount++;									
							});
							
						}, function (e) {
							console.log('unzip error', e);
						});
					} else {
						const page = img.getAttribute('page');
						if (page != null) {
							const pos = filename.lastIndexOf('.');
							if (pos > 0) {
								filename = filename.substring(0, pos - 1) + '_' + page + filename.substring(pos);
							} else {
								filename += '_' + page;
							}						
						} 
						zip.file(filename, blob, { binary: true });	
						processed++;		  
					}					
					

                	$('#printModal .seq').text(index);
                	$('#printModal .progress').attr('value', processed);
				})
				.then(function(){
					if (processed >= $imgs.length) {
						zip.generateAsync({type:"blob"}).then(function(content) {
							const dt = new Date();
							const yyyymmddhhmmss = `${dt.getFullYear()}${("0" + (dt.getMonth() + 1)).slice(-2)}${("0" + dt.getDate()).slice(-2)}`
													+ `${("0" + dt.getHours()).slice(-2)}${("0" + dt.getMinutes()).slice(-2)}${("0" + dt.getSeconds()).slice(-2)}`;
							const elm = document.createElement('a');  
							elm.href = URL.createObjectURL(content);  
							elm.setAttribute('download', yyyymmddhhmmss); 
							elm.click();
						});

						$('#printModal').css('display', 'none');
					}
				})
				.catch((error) => {
					console.log('download error', error); 
				});				
			});

		}

    	function loadThumbnailSequence(imgs, index) {
    		if (!$('#printModal').is(':visible')) { // cancel button pressed
    			return;
    		}
    		
    		if (index == imgs.length) {
            	$('#printModal').css('display', 'none');
				window.print();
				 
    			return;
    		}
    		
    		const $img = $(imgs[index]);
        	if ($img.attr('src') == null) {
        		$img.one('load', function(){
        			index++;
                	$('#printModal .seq').text(index);
                	$('#printModal .progress').attr('value', index);
                	
                	const $x = $(this);
                	if (!isImg($x)) {
						$x.removeClass('print');
						$x.addClass('no-print');
					}
                	
                	loadThumbnailSequence(imgs, index);
        		});
        		fetchImg(imgs[index]);
        	} else {
    			index++;
            	$('#printModal .seq').text(index);
            	$('#printModal .progress').attr('value', index);
        		
            	loadThumbnailSequence(imgs, index);
        	}
		}

		function showProgress(imgs, message) {
        	$('#printModal .total').text(imgs.length);
        	$('#printModal .progress').attr('max', imgs.length);
        	
        	$('#printModal .seq').text(0);
        	$('#printModal .progress').attr('value', 0);
        	$('#printModal').css('display', 'inline-block');
        	if ($('#printModal').width() != 287) { // old style printModal
	           	$('#printModal').css({
	           		"left": ($(window).width() - $('#printModal').width())/2, 	
	           		"top": ($(window).height() - $('#printModal').height())/2 	
	           	});
			}
			$('#printModal .title').text(message);           	                    	
		}
		
		function exportTo(target) { // print or download
			
			let imgs = null;
	        if (target == 'print') {
				findThumbnail('all').each((_, x) => {
					const $x = $(x);
					const isImg = $x.attr('isimg');
					if ($x.hasClass('selected') && (isImg == null || isImg == 'true')) {
						$x.removeClass('no-print');
						$x.addClass('print');
					} else {					
						$x.removeClass('print');
						$x.addClass('no-print');
					}
				});
				
				imgs = findThumbnail('img.print');
				if (imgs.length == 0) {
					alert('이미지를 선택하고 실행하세요');
				} else {
					showProgress(imgs, '인쇄 준비중')		
					loadThumbnailSequence(imgs, 0);
				}					
			} else {
				imgs = findThumbnail('img.selected');				
				if (imgs.length == 0) {
					alert('자료를 선택하고 실행하세요');
				} else {
					showProgress(imgs, '파일 다운로드')		
					zipDownload(imgs);
				}
			}			
		}
		
		function resetSeq() {
			let count = 0;
			findThumbnail('all').each((_, x) => {
				$(x).attr('seq', count + 1);
				count++;
			});
			
			eventMap.run('show', count);
		}
		
		function getImgData(target) {
			const $imgs = findThumbnail(target);
			let data = [];
			$imgs.each(function(_, img){
				const $img = $(img);
				data.push([$img.attr('data-src'), $img.attr('title'), $img.attr('tag')]);
			});
			
			return data;			
		}
	
		// API		
		Module.isVisible = $img =>  thumbnailStatus && $img.offset().top + $img.height() >= $container.offset().top && $img.offset().top < $container.offset().top + $container.height();
		Module.scrollToItem =  $img => $container.scrollTop($container.scrollTop() + $img.offset().top - 70);
		Module.scrollToSeq = seq => showThumbnail(`[seq=${seq}]`);
		Module.empty = _ => { 
			$(root).empty();
			debug('empty');
			seqIndex = 1;
		};	
		Module.addImg = (src) => {
			debug('addImg', src, typeof src);
			if ((typeof src) == 'string') { // 'aa/a.jpg'
				add(src, getFilename(src));
			} else if (Array.isArray(src) && src.length > 0) {
				if (Array.isArray(src[0])) {   // [['/aa/a.jpg', 'a.jpg'], ['/bb/b.pdf', 'b.pdf']]
					src.forEach(x => {
						add(x[0], x[1], x.length > 2 ? x[2] : null, x.length > 3 ? x[3] : null);
					});			 					
				} else { // ['/aa/a.jpg', '/bb/b.jpg']
					src.forEach(x => {
						add(x, getFilename(x));
					});			 															
				}
			} else {
				debug('img is empty or invalid type', src);
			}
		}
		
		Module.removeImg = (src) => {
			debug('removeImg', src, typeof src);
			let count = 0;
			if ((typeof src) == 'string') { // 'aa/a.jpg'
				count = remove(src);
			} else if (Array.isArray(src)) {
				src.forEach(x => {
					count += remove(x);
				});			 															
			} else {
				debug('img is empty or invalid type', src);
			}
			
			return count;
		}
		
		Module.setImg = function(src) {
			Module.empty();
			Module.addImg(src);
	
			Module.show();
			let $img = $(root).find('img.thumbnail:first');
			$img.on('load', function(){
				$img.trigger('click', true);
			});

			if (!thumbnailStatus) {
				fetchImg($img[0]);
			}
		};
		
		Module.show = _ => {
			$container.scroll();
			resetSeq();
			eventMap.run('show', $(root).children().length);
		};
		
		Module.setLeftRightKey = _ => {
			$('body').keyup(function(event) {
				if (event.target.tagName != 'INPUT') {
					switch(event.key){
					case 'ArrowRight':
						showThumbnail('next');
						break;
					case 'ArrowLeft':
						showThumbnail('prev');
						break;
					}
				}
			});
		};
		
		Module.getImgs = _ => getImgData('all');
		Module.getSelectedImgs = _ => getImgData('selected');	
		Module._getImgs = _ => $(root).children();	// old for compatibility *deprecatged
		Module._getSelectedImgs = _ => $(root).children('.selected');	// old for compatibility *deprecatged		
				
		Module.setSelectAll = check => findThumbnail('all').each(function(index, img) {
			eventMap.run('select', check ? 'add': 'remove', $(img));
		});
		Module.on = (name, handler) => eventMap.add(name, handler);
		
		Module.first = _ => showThumbnail('first');			
		Module.next = _ => showThumbnail('next');	
		Module.prev = _ => showThumbnail('prev');	
		Module.last = _ => showThumbnail('last');
		Module.print = _ => exportTo('print');		
		Module.download = _ => exportTo('download');
		Module.setDebug = on => debugMode = on;
		Module.setImgWrap = (wrap, tag) => { 
			imgWrap = wrap;
			wrapTag = tag;
		}
		
		Module.getNextSrc = function() {
			if ($activeImg) {
				const $imgs =  $(root).find('[isimg="true"]');

				const index = $imgs.index($activeImg);
				if (index < $imgs.length - 1) {
					const $img = $($imgs.get(index + 1)); 
					return $img.attr('src') ?? $img.attr('data-src');
				}
			}

			return null;
		};

		Module.check = function($img) {
			eventMap.run('select', 'toggle', $img);
		}
		
		Module.setThumbnailStatus = function(status) {
			thumbnailStatus = status;
			if (status) {
				$container.scroll();
			}
		}
		
		Module.getWrap = $img => $img.parents(wrapTag);
		
		return Module;
	}
});