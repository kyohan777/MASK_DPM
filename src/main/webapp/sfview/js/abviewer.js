// abviewer compatible version
var AbViewerAPI = null;
$(document).ready(function(){
	AbViewerAPI = (function() {
		const root = this;
		const Module = (typeof exports !== 'undefined') ? exports : (root.Module = {});
		let $thumbnails = null;
		let $view = null;
	
		initThumbnailsAndView(function(_thumbnails, _view){
			$thumbnails = _thumbnails;
			$view = _view;
			
			console.log("init", $view);
		});
		
		
		Module.view = function(imagePath) {
			const url = "/sfview/show_file.jsp?filename=" + encodeURI(imagePath);
			$view.loadImage(url, imagePath, url, 0);
		}
		
		Module.showImageListView = function(doShow) {
			$view.showThumbnails(doShow);
		}
		
		Module.viewClear = function() {
			$view.clear();
		}
		
		Module.viewFileList = function(param) {
			if (typeof param === 'object') { //json
				const imgs = new Array();
				
				param['fileList'].forEach(x => {
					imgs.push(x['imagePath']);
				});
				
				$.post('/sfview/split_page.jsp',{'filenames': imgs} , function(splited){
					$thumbnails.setImg(splited);
				});			
			} else {
				$.post('/sfview/list_file.jsp',{'folder': param} , function(splited){
					$thumbnails.setImg(splited);
				});							
			}
		}
		
		Module.getSelectedFilenames = function() {
			const imgs = $thumbnails.getSelectedImgs();
			const filenames = new Array();
		
			for (let i = 0; i < imgs.length; i++) {
				filenames.push($(imgs[i]).attr('title'));
			}
		
			return filenames;
			
		}
		
		Module.getSelectedImgs = function() {
			return $thumbnails.getSelectedImgs();
		}
		
		
		return Module;
	}());
});

