
/**
 * DOM  load 완료 시 실행
 */
 var imrFPage = $("#totalPageCnt").val();
 var imgPathOrg = $("#imgPathOrg").val();
 var imgPathMask = $("#imgPathOrg").val();

 
 function test() {
		if(imrFPage == null || imrFPage == "undefined" || imrFPage == "") {
			imrFPage = 1;
		}
		
		if(imgPathOrg != null && imgPathOrg != "" && imgPathOrg != undefined) {
			$("#viewerOne").get(0).contentWindow.imrFirstPage = imrFPage;
			$("#viewerOne").get(0).contentWindow.viewerSetImg(encodeURI(imgPathOrg));
			setTimeout(() => $("#viewerOne").get(0).contentWindow.scrollToSeq(imrFPage), 500);
		}
		
		if(imgPathMask != null && imgPathMask != "" && imgPathMask != undefined){
			$("#viewerTwo").get(0).contentWindow.imrFirstPage = imrFPage;
			$("#viewerTwo").get(0).contentWindow.viewerSetImg(encodeURI(imgPathMask));
			setTimeout(() => $("#viewerTwo").get(0).contentWindow.scrollToSeq(imrFPage), 500);
		}
}

function loaded(){
	var imrFPage = $("#totalPageCnt").val();
	var imgPathOrg = $("#imgPathOrg").val();
	
	if(imrFPage == null || imrFPage == "undefined" || imrFPage == "") {
		imrFPage = 1;
	}
	
	if(imgPathOrg != null && imgPathOrg != "" && imgPathOrg != undefined) {
			$("#viewerOne").get(0).contentWindow.imrFirstPage = imrFPage;
			$("#viewerOne").get(0).contentWindow.viewerSetImg(encodeURI(imgPathOrg));
			setTimeout(() => $("#viewerOne").get(0).contentWindow.scrollToSeq(imrFPage), 500);
	}
}

function loaded2(){
	var imrFPage = $("#totalPageCnt").val();
	var imgPathMask = $("#imgPathOrg").val();
	
	if(imrFPage == null || imrFPage == "undefined" || imrFPage == "") {
		imrFPage = 1;
	}
	
	if(imgPathMask != null && imgPathMask != "" && imgPathMask != undefined){
			$("#viewerTwo").get(0).contentWindow.imrFirstPage = imrFPage;
			$("#viewerTwo").get(0).contentWindow.viewerSetImg(encodeURI(imgPathMask));
			setTimeout(() => $("#viewerTwo").get(0).contentWindow.scrollToSeq(imrFPage), 500);
	}
	
}


String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

