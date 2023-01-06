function setPageControl($thumbnails) {
	$('input#selectAll').change(function(){
		$thumbnails.setSelectAll(this.checked);		
	});
	
	$('button.firstImage').click(function(){
		$thumbnails.first();		
	});
	
	$('button.nextImage').click(function(){
		$thumbnails.next();		
	});
	$('button.prevImage').click(function(){
		$thumbnails.prev();		
	});
	$('button.lastImage').click(function(){
		$thumbnails.last();		
	});
	
	$('input#seq').keypress(function(e) {
 	    if(e.which == 13) {
 	        $thumbnails.scrollToSeq($(this).val());
 	    }
 	});
	
	$('button#download').click(function(){
		$thumbnails.download();
	});
	
	$('button#print').click(function(){
		$thumbnails.print();		
	});

	$('input#theme').click(function(){ //toggle theme
		$('#top').hide();
		$('link.alternative').each(function(){
			$(this).prop('disabled', !$(this).prop('disabled'));
		});

		setTimeout(function() {$('#top').show();}, 30);
	});

	$('#cancelPrint').click(function() {
		$('#printModal').hide();
	}) ;
	
	$thumbnails.on('show', function(length){
		$('span#totalCount').text(length);
		$('input#seq').attr('max', length);		
	});

	$thumbnails.on('select', function(cmd, $img){
		const $item = $img.parents('li');
		switch (cmd) {
			case 'add': $img.addClass('selected'); $item.addClass('v-selected'); break;
			case 'remove': $img.removeClass('selected'); $item.removeClass('v-selected'); break;
			case 'toggle': $img.toggleClass('selected'); $item.toggleClass('v-selected'); break;
			default: console.log('on select', cmd);
		}
	});

    $thumbnails.setImgWrap(
`<li>
    <a href="#">
        <div>
        	<button class="v-thumb-check no-print"></button>			
            <span class="v-thumb">$img</span>
            <span class="v-list-tit no-print">$title</span>
        </div>
    </a>
</li>`, 'li');

	$(document).on('click','button.v-thumb-check', function(){
		const $img = $(this).siblings('span.v-thumb').children('img');
		$thumbnails.check($img);
	});
}


var imrFirstPage = 1;

function initViewer(completed, initFit = 'fit_hori', setNextPrevKey = true) {
	$('div.view-box').load('/sfview/theme/view.html', function(){
		const $view = $('#sfwork').sfview();
		$('#sfwork').css({'width': $('.v-main').css('width')});

		const $thumbnails = $('#thumbnails').thumbnails(function(src, filename, $img, isImage){
			if (isImage) {
				Toolbar.showControl(true);
				$view.loadImage(src, filename, $img.attr('data-src'), $img.attr('page') ?? 0);
				if ($view.isViewDual()) {
					$view.loadSecondImage($thumbnails.getNextSrc());
				}
			} else {
				Toolbar.showControl(false);
				if ($img.attr('ext') == 'NON') {
					$view.loadEmbedded(null);
					alert('없는 자료 입니다');				
				} else {
					console.log("loadEmbedded src:" + src + '#page=' + imrFirstPage);
					$view.loadEmbedded(src);
					//$view.loadEmbedded(src + '#page=' + imrFirstPage);
				}
			}
	
			$('input#seq').val($img.attr('seq'));
			$('.v-page-name').text(filename);
			const $icon = $('.v-page-icon');
			const classes = $icon.attr("class");
			classes.split(' ').forEach(x => {
				if (x != 'v-page-icon') {
					$icon.removeClass(x);
				}
			});
			
			$icon.addClass($img.attr("ext"));
		});
		$thumbnails.setDebug(true);
	
		if (setNextPrevKey)
			$thumbnails.setLeftRightKey();
		
		setPageControl($thumbnails);	

		Toolbar.init($view, $thumbnails);
		$view.on('resize', (clientWidth, _, scrollWidth, __) => $view.setCanPanning(clientWidth < scrollWidth));
		$view.setInitFit(initFit);

		completed($thumbnails, $view);
	});
}