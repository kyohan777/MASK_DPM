var modEportReason = (function(){    
	/**
	 * 초기화
	 */	
	function init()
	{	
		$("#chrrId").text(opener.$("#CHRR_ID").val());	
		$("#chrrNm").text(opener.$("#CHRR_NM").val());
		$("#elementId").text(opener.$("#EMEMENT_ID").val());		
	};
	return {
		init: init,		
		//objectEventInit:objectEventInit
	};
})();

/**
 * 확인 클릭
 */
$("#insert").on("click", function() {
		
	if($("#purpose").val() == '') {
		alert("목적을 입력해주세요.");
		return;
	}
	if($("#queryReason").val() == '') {
		alert("사유를 입력해주세요.");
		return;
	}
	
	var imrObj = {};
	
	var arrForm = $("#frmExportReason").serializeArray();
	if(arrForm) {
		arrForm.forEach(function(item) {
			imrObj[item.name] = item.value;
			console.log("name:" + item.name + ", value" + item.value);
		});
	}
	imrObj['chrrId']    = $("#chrrId").text();
	imrObj['elementId'] = $("#elementId").text();
	imrObj['chrrNm']    = $("#chrrNm").text();
	
	// 확정처리
	modAjax.request("/dpm/insertSearchLog.do", imrObj, {
		 async : false,
		 success : function(data) {
			if(data.rsYn == "Y") {
				 imgWindowPopupOpen();
				 window.close();  
			} 
		},
		error : function(data) {
			alert(data);
		}
	});
	
	
});
//취소 버튼
$("#cancel").on("click", function() {
	window.close();  
});

function imgWindowPopupOpen(){
		
		var strOption = "";
		//strOption += "left=" + nLeft + "px,";
		//strOption += "top=" + nTop + "px,";
		strOption += "width=" + screen.width + "px,";
		strOption += "height=" + screen.height + "px,";
		strOption += "toolbar=no,menubar=no,location=no,";
		strOption += "resizable=yes,status=yes";	
		
		var winImgView = window.open("/dpm/dpmImgViewerPopup.do?elementId="+$("#elementId").text(), "", strOption);
	};


$(document).ready(function() 
{
	try
	{	
		modEportReason.init();	
		//modEportReason.objectEventInit();
	}
	catch(e)
	{
		alert(e);
	}
	
});