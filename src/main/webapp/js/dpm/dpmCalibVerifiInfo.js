
/**
  * @File Name : dpmCalibVerifiInfo.js
  * @Description : 교정/검증 처리
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2022.12.06             최초 생성
  *
  *  
  *  ------------------------------------------------
  *  jqGrid 4.7.0  jQuery Grid
  *  Copyright (c) 2008, Tony Tomov, tony@trirand.com
  *  Dual licensed under the MIT and GPL licenses
  *  http://www.opensource.org/licenses/mit-license.php
  *  http://www.gnu.org/licenses/gpl-2.0.html
  *  Date: 2014-12-08  
  *  ------------------------------------------------
 */
var currntPageIndex;
var gridEventFlag;
var selectByGrid;
var onSelistfinger;
var serverDate = modComm.getServerDate();

var modDpmCalibVerifiInfo = (function(){    
    var totRowCnt = 0;
    var gridHeight = '100%';
	/**
	 * 초기화
	 */	
	function init() {
		modComm.setDatepicker("startPrcDt","imgStartDt");
		modComm.setDatepicker("endPrcDt","imgEndtDt");
		//마스터 그리드 초기화 시작
		$("#textPrcDt").val(modComm.getGridDateFormat(serverDate));
		
		//alert(modComm.getGridDateFormat(serverDate));
		
		$("#jqGrid").jqGrid({
	    	//jqGrid url 전송선언
	        url: '/dpm/getDpmCalibVerifiInfo.do',
	        mtype: "POST",
	        datatype: "local",
	        postData: {"textPrcDt" : $("#textPrcDt").val()},
	        //jqGrid 양식선언부        
	        colModel: [
				{ label: '엘리ID',    name: 'elementId', 	   align: 'center', width:'0px', hidden: true},
				{ label: 'm',  name: 'maskPrgStscTxt', align: 'left', width: '0px', hidden: true},
	            { label: 'u',  name: 'userConfirmTxt', align: 'left', width: '0px', hidden: true},
	            { label: 'u2',  name: 'userUpdateYnTxt', align: 'left', width: '0px', hidden: true},
	            { label: 'u3',  name: 'resultImgPath', align: 'left', width: '0px', hidden: true},
	            { label: 'u4',  name: 'imgPathOrg', align: 'left', width: '0px', hidden: true},
	            { label: '파일명',  name: 'imgFileName',	 index:'IMG_FILE_NAME',  align: 'left', width: '150px'},
	            { label: '진행',    name: 'maskPrgStsc',  index:'MASK_PRG_STSC',  align: 'center', width: '50px'},
	            { label: '최.탐',   name: 'fstImrPage',   index:'FST_IMR_PAGE',   align: 'center', width: '50px'},
	            { label: '검증', 	   name: 'userConfirm',  index:'USER_CONFIRM',    align: 'center', width: '50px'},
	            { label: '수정', 	   name: 'userUpdateYn', index:'USER_UPDATE_YN',   align: 'center', width: '50px'},
	            { label: 'intvisionImr',  name: 'intvisionImr', align: 'left',  width: '1250px', sortable: false}
	        ],
	       
	        height: gridHeight,
	        autowidth:true,
	        rowNum: 50,
	        rownumbers: true,
	        sortable : true,
			loadonce : false, //이옵션이 정렬시에 다시쿼리 안날리고 화면에서 하는거
	        viewrecords: true,
	        loadtext: "<img src='/images/loadinfo.net.gif' />",
	        scrollrows: true,
	        shrinkToFit:false,
	        forceFit:true,
	        multiselect: false,
	        //jqGrid 추가옵션영역
	        pager: $("#jqGridPager"),
	        rowList: [50,100,200,300,500,1000],
	        //jsonReader 영역
	        jsonReader : {
	        	repeatitems: false,
	        	root: function(data) {
	        		if(data.rsYn == "N" && !modComm.isEmpty(data.rsMsg)) alert(data.rsMsg);
	        		return data.selList;
	        	},
	        	page: function(data) {return data.pageNumber},	//현재 페이지 번호
	        	total: function(data) {return data.totPageCnt},	//전체 페이지 수
	        	records: function(data) {return data.totRowCnt}	//전체 데이터 수
	        },
	        onSortCol: function(columnName, columnIndex, sortOrder) {
    			var pageNumber = $(".ui-pg-input").val();
				var pageSize   = $("#jqGridPager").find("select.ui-pg-selbox option:selected").val();
    			$('#columnName').val(columnName);
    			$('#sortOrder').val(sortOrder);
    			selListPage(pageNumber,pageSize);
			},
	        
	        //페이지 이벤트
	        onPaging: function(action) {
	        	var curPage  = $("#jqGrid").getGridParam("page");
	        	var lastPage = $("#jqGrid").getGridParam("lastpage");
	        	var userPage = $("#jqGridPager").find("input.ui-pg-input").val();
	        	var pageSize = $("#jqGridPager").find("select.ui-pg-selbox option:selected").val();

	        	switch(action.split("_")[0]) {
	        		case "next" :	//다음페이지
	        			if(!modComm.isEmpty(curPage) && !modComm.isEmpty(lastPage) && curPage<lastPage) selListPage(curPage + 1, pageSize);        			
	        			break;
	        		case "prev" :	//이전페이지
	        			if(!modComm.isEmpty(curPage) && curPage > 1) {
	        				selListPage(curPage - 1, pageSize);
	        			}
	        			break;
	        		case "first" :	//처음페이지
	        			if(!modComm.isEmpty(curPage)) selListPage(1, pageSize);
	        			break;
	        		case "last" :	//마지막페이지
	        			if(!modComm.isEmpty(curPage)) selListPage(lastPage, pageSize);        			
	        			break;
	        		case "user" : //페이지번호 직접 입력시
	        			if(modComm.isEmpty(userPage) || userPage > lastPage || userPage < 1) {
	        				alert("페이지 범위가 올바르지 않습니다.");
	        				return;
	        			} else {
	        				selListPage(userPage, pageSize);	
	        			}	        			
	        			break;
	        		case "records" : //페이지사이즈 변경시
	        			if(!modComm.isEmpty(curPage)) {
	        				$("#jqGrid").setGridParam({rowNum : pageSize});
	        				selListPage(1, pageSize);
	        			}
	        			break;
	        		default : 
	        			break;
	        	}
	        	
	        },
	      //Row클릭 이벤트
	        onSelectRow: function(rowid) {
					dataSelect(rowid);
			},        
	        //셀더블클릭 이벤트 - deprecated
	        ondblClickRow: function(rowid, iRow, iCol) {
	        },
	        
	        loadComplete: function() {
			    var ids = $("#jqGrid").jqGrid('getDataIDs');
			    for (var i=0;i<ids.length;i++) {
			        var id=ids[i];
			        var rowData = $("#jqGrid").jqGrid('getRowData',id);
		        	
		        	//$("#testJqGrid").jqGrid('setCell', rowid, colname, nData, styleObj, cellAttirbuteObj, forceUpdate);
				    $("#jqGrid").jqGrid('setCell', id, 'maskPrgStsc', "", "", {title: rowData.maskPrgStscTxt});
				    $("#jqGrid").jqGrid('setCell', id, 'userConfirm', "", "", {title: rowData.userConfirmTxt});
				    $("#jqGrid").jqGrid('setCell', id, 'userUpdateYn', "", "", {title: rowData.userUpdateYnTxt});
			    }
			}
	        
		});
		//그리드 초기화 종료
		//그리드 resize 
		modComm.resizeJqGridWidth("jqGrid","gridContainer",$("#gridContainer").width(), true);
		
		//엑셀출력을 위한 컬럼정보 생성
		modComm.addGridColEl("jqGrid", "gridLabelList", "gridNameList", "gridWidthList", "gridAlignList");
		
		//열 숨기기
		//$("#jqGrid").jqGrid("hideCol",["elementId", "userUpdateYnTxt", "maskPrgStscTxt", "userConfirmTxt", "resultImgPath", "imgPathOrg"]);
	};
		

    
    /**
	 * 마스터 조회
	 */  
	function selList() {
		dataResetImr();
		viwerIframe.src = '/sfview/viewer.jsp';
		
		$("#jqGrid").jqGrid('clearGridData');
		
		//전체건수 조회
    	var objParam = {};
    	var arrForm = $("#frmCalibVerifiInfo").serializeArray();
    	//console.log(arrForm);
    	if(arrForm) {
    		arrForm.forEach(function(item) {
    			objParam[item.name] = item.value;
    		});
    	}
    	
    	selTotalCount(objParam);
		
    	//전체건수가 있으면 목록조회
		if(totRowCnt < 1) {
			$("#jqGrid > tbody").append("<tr class='ui-widget-content jqgrow ui-ltr'><td colspan='7' class='text-left'>&nbsp; &nbsp; &nbsp;조회된 결과가 없습니다.</td></tr>");
			return;
		} else {
        	$("#columnName").val("");
			$("#sortOrder").val("");
			var pageNumber = 1;
			var pageSize   = $("#jqGridPager").find("select.ui-pg-selbox option:selected").val();
        	objParam.totRowCnt	= totRowCnt;
    		objParam.pageNumber = pageNumber;
    		objParam.pageSize	= pageSize;
    		objParam.totPageCnt	= Math.ceil(totRowCnt/pageSize);
    		objParam.startPageNumber = (((pageNumber - 1) * pageSize));
			$("#jqGrid").setGridParam({datatype : 'json', postData : objParam});
			$("#jqGrid").trigger('reloadGrid');    				
			//selListPage(1, $("#jqGridPager").find("select.ui-pg-selbox option:selected").val());
		}
	
	};
	
    /**
	 * 전체건수 조회
	 */  	
	function selTotalCount(objParam) {
		totRowCnt = 0;
		modAjax.request("/dpm/getDpmDailyProInfoTotRowCnt.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y" && data.hasOwnProperty("totRowCnt")) {
					totRowCnt = data.totRowCnt;	
				}
			},
            error: function(response) {
                console.log(response);
            }
    	});		
	};
	
    /**
	 * 마스터 페이징조회
	 */ 	
	function selListPage(pageNumber, pageSize) {		
		var objParam = $("#jqGrid").getGridParam("postData");    	
    	objParam.pageNumber = pageNumber;
    	objParam.pageSize	= pageSize;
    	objParam.totPageCnt	= Math.ceil(objParam.totRowCnt/pageSize);
    	objParam.startPageNumber = (((pageNumber - 1) * pageSize));
    	objParam.columnName = $("#columnName").val();
    	objParam.sortOrder = $("#sortOrder").val();
    	console.log("objParam.pageNumber:" + objParam.pageNumber + ", objParam.pageSize:" + objParam.pageSize + ", objParam.totPageCnt:" + objParam.totPageCnt + ", objParam.startPageNumber:" + objParam.startPageNumber);
    	$("#jqGrid").setGridParam({datatype : 'json', postData : objParam});
    	$("#jqGrid").trigger('reloadGrid');    	
		//$("#spnTotCnt").text(totRowCnt);
	};	
	

	
    /**
	 * 엑셀출력
	 */ 	
	function excelWrite() {		

		//조회조건
		var objParam = {};
		var arrForm = $("#frmDayPro").serializeArray();
		if(arrForm) {
			arrForm.forEach(function(item) {
				objParam[item.name] = item.value;
			});
		}
		
		selTotalCount(objParam);
		
    	//전체건수가 있으면 엑셀출력
		if(totRowCnt < 1) {
			alert("엑셀출력할 데이터가 없습니다.");
			return;
		} else {			
			var frmDayPro = $("#frmDayPro")[0];
			frmDayPro.action = "/dpm/selListDpmDayProExcel.do";
			frmDayPro.method = "post";
			frmDayPro.submit();			
		}		
	};
	
	return {
		init: init,
		selList: selList,
		selListPage: selListPage,
		excelWrite: excelWrite		
	};

})();
/**
 * 조회버튼 클릭
 */
$("#searchBtn").on("click", function() {
	$("#prcDt").val();
	modDpmCalibVerifiInfo.selList();
});

/**
 * 엑셀버튼 클릭
 */
$("#btnExcel").on("click", function() {
	modDpmCalibVerifiInfo.excelWrite();
});


function dataSelect(rowid) {
	var selRowData = $("#jqGrid").getRowData(rowid);
	var imrFPage = selRowData.fstImrPage;
	if(imrFPage == null || imrFPage == "undefined" || imrFPage == "") {
		imrFPage = 1;
	}
	
	if(selRowData.imgPathOrg != null && selRowData.imgPathOrg != "" && selRowData.imgPathOrg != undefined) {
		$("#viwerIframe").get(0).contentWindow.imrFirstPage = imrFPage;
		//$("#viwerIframe").get(0).contentWindow.viewerSetImg(selRowData.imgFileName);
		$("#viwerIframe").get(0).contentWindow.viewerSetImg(encodeURI(selRowData.imgPathOrg));
		setTimeout(() => $("#viwerIframe").get(0).contentWindow.scrollToSeq(imrFPage), 500);
	}
	
	
	$("#elementId").val(selRowData.elementId);
	
	var intvisionImr = selRowData.intvisionImr;
	if(intvisionImr != null && intvisionImr != undefined && $.trim(intvisionImr) !='' ) {
		var jsonImr = JSON.parse(intvisionImr);
		
		$("#intvisionImr").val(intvisionImr);
		
		$("input:radio[name='A']:radio[value='" + jsonImr.A + "']").prop('checked', true); 
		$("input:radio[name='B']:radio[value='" + jsonImr.B + "']").prop('checked', true);
		$("input:radio[name='C']:radio[value='" + jsonImr.C + "']").prop('checked', true);
		$("input:radio[name='D']:radio[value='" + jsonImr.D + "']").prop('checked', true);
		$("input:radio[name='E']:radio[value='" + jsonImr.E + "']").prop('checked', true);
		
		$("input:radio[name='TM_RECV_YN']:radio[value='" + jsonImr.TM_RECV_YN + "']").prop('checked', true);
		$("input:radio[name='SMS_RECV_YN']:radio[value='" + jsonImr.SMS_RECV_YN + "']").prop('checked', true);
		$("input:radio[name='DM_RECV_YN']:radio[value='" + jsonImr.DM_RECV_YN + "']").prop('checked', true);
		$("input:radio[name='EMAIL_RECV_YN']:radio[value='" + jsonImr.EMAIL_RECV_YN + "']").prop('checked', true);
		$("input:radio[name='TM_OFFER_YN']:radio[value='" + jsonImr.TM_OFFER_YN + "']").prop('checked', true);
		$("input:radio[name='EMAIL_OFFER_YN']:radio[value='" + jsonImr.EMAIL_OFFER_YN + "']").prop('checked', true);
		$("input:radio[name='DM_OFFER_YN']:radio[value='" + jsonImr.DM_OFFER_YN + "']").prop('checked', true);
		$("input:radio[name='SMS_OFFER_YN']:radio[value='" + jsonImr.SMS_OFFER_YN + "']").prop('checked', true);
		
	} else {
		dataResetImr();
	}
}				

function dataResetImr() {
	$("#intvisionImr").val("");
							
	$("input:radio[name='A']").prop('checked', false);
	$("input:radio[name='B']").prop('checked', false);
	$("input:radio[name='C']").prop('checked', false);
	$("input:radio[name='D']").prop('checked', false);
	$("input:radio[name='E']").prop('checked', false);
	
	$("input:radio[name='TM_RECV_YN']").prop('checked', false);
	$("input:radio[name='SMS_RECV_YN']").prop('checked', false);
	$("input:radio[name='DM_RECV_YN']").prop('checked', false);
	$("input:radio[name='EMAIL_RECV_YN']").prop('checked', false);
	$("input:radio[name='TM_OFFER_YN']").prop('checked', false);
	$("input:radio[name='EMAIL_OFFER_YN']").prop('checked', false);
	$("input:radio[name='DM_OFFER_YN']").prop('checked', false);
	$("input:radio[name='SMS_OFFER_YN']").prop('checked', false);
		
}


/**
 * 확정버튼 클릭
 */
$("#btnConfirm").on("click", function() {
		
	if($("#elementId").val() == '') {
		alert("확정할 대상이 없습니다.");
		return;
	}
	if(!confirm("확정하시겠습니까?")) {
		return;
	}
	
	var imrObj = {};
	
	var arrForm = $("#frmImrInfo").serializeArray();
	if(arrForm) {
		arrForm.forEach(function(item) {
			imrObj[item.name] = item.value;
			console.log("name:" + item.name + ", value" + item.value);
		});
	}
	imrObj['flag'] = "con";
	
	// 확정처리
	modAjax.request("/dpm/imrConfirm.do", imrObj, {
		 async : false,
		 success : function(data) {
			var jsonData = JSON.parse(data);
			if(jsonData.updCnt == 1) {
				alert("성공적으로 반영하였습니다.");
			} 
			if(jsonData.errMsg != "success") {
				alert("오류:" + jsonData.errMsg);
			}
			modDpmCalibVerifiInfo.selList();
			
		},
		error : function(data) {
			alert(data);
		}
	});
});

/**
 * 수정버튼 클릭
 */
$("#btnModify").on("click", function() {
		
	if($("#elementId").val() == '') {
		alert("수정할 대상이 없습니다.");
		return;
	}
	if(!confirm("수정하시겠습니까?")) {
		return;
	}
	
	var imrObj = {};
	
	var arrForm = $("#frmImrInfo").serializeArray();
	if(arrForm) {
		arrForm.forEach(function(item) {
			imrObj[item.name] = item.value;
			console.log("name:" + item.name + ", value" + item.value);
		});
	}
	
	imrObj['flag'] = "upd";
	
	// 수정처리
	modAjax.request("/dpm/imrConfirm.do", imrObj, {
		 async : false,
		 success : function(data) {
			var jsonData = JSON.parse(data);
			if(jsonData.updCnt == 1) {
				alert("성공적으로 반영하였습니다.");
			} 
			if(jsonData.errMsg != "success") {
				alert("오류:" + jsonData.errMsg);
			}
			modDpmCalibVerifiInfo.selList();
			
		},
		error : function(data) {
			alert(data);
		}
	});
});




$("#textPrcDt").on("propertychange change keyup paste input", function(){
    var txt = $("#textPrcDt").val();
    if(txt.length == 10) {
		modDpmCalibVerifiInfo.selList();
	}
});
    
    
/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
		
	modDpmCalibVerifiInfo.init();
	modDpmCalibVerifiInfo.selList();
	
	$("#box-center").height($("#gridContainer").height());
	$("#box-right").height($("#gridContainer").height() - 10);
	$("#box-right-1").height($("#gridContainer").height() - 10);
	
	//$("#jqGrid").jqGrid('setFrozenColumns');
	
	//$("#viwerIframe").get(0).contentWindow.viewerSetHeight($("#gridContainer").height());
	
	//$('iframe#embedded.embedded').height($("#gridContainer").height());
	
	
});

$(window).on('resize', function(){
	
	$("#box-center").height($("#gridContainer").height());
	$("#box-right").height($("#gridContainer").height() - 10);
	$("#box-right-1").height($("#gridContainer").height() - 10);
	
	
	//$('#viwerIframe').contents().find('#id_view-box').height($("#gridContainer").height());
	//$('#viwerIframe').contents().find('div.v-board').height($("#gridContainer").height());
	$('#viwerIframe').contents().find('div.v-content').height($("#gridContainer").height());
	$('#viwerIframe').contents().find('iframe#embedded').height($("#gridContainer").height());
	
	//console.log("#id_view-box height:" + $('#viwerIframe').contents().find('#id_view-box').height());
	
	/*	
	var rowid = $("#jqGrid").jqGrid("getGridParam","selrow");
	if(rowid != undefined && rowid != null) {
		var selRowData = $("#jqGrid").getRowData(rowid);
		$("#viwerIframe").get(0).contentWindow.viewerSetImg(selRowData.imgFileName);
		
		console.log("rowid:" + rowid);
	}
	*/
	
	//const height = $("#gridContainer", parent.document).height();
	//$("#viwerIframe").attr('src', '/sfview/viewer.jsp');
	    
});



String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}


//# sourceURL=dpmCalibVerifiInfo.js
