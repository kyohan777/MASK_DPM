
/**
  * @File Name : dpmDailyPro.js
  * @Description : 일일 처리 현황
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2022.12.06             최초 생성
  *  ------------------------------------------------
 */
var currntPageIndex;
var gridEventFlag;
var selectByGrid;
var onSelistfinger;
var serverDate = modComm.getServerDate();
var modDpmDailyPro = (function(){    
    var totRowCnt  = 0;
    var gridHeight = '100%';
	/**
	 * 초기화
	 */	
	function init() {
		modComm.setDatepicker("textPrcDt","imgStartDt");
		console.log($("#prcDt").val());
		if($("#prcDt").val() != ''){
			$("#textPrcDt").val($("#prcDt").val().replaceAll('/','-'));
		}else{
			$("#textPrcDt").val(modComm.getGridDateFormat(serverDate));	
		}
		//마스터 그리드 초기화 시작
		$("#jqGrid").jqGrid({
	    	//jqGrid url 전송선언
	        url: '/dpm/getDpmDailyProInfo.do',
	        mtype: "POST",
	        datatype: "local",
	        postData: {},
	        //jqGrid 양식선언부        
	        colModel: [
	            { label: '엘리먼트 ID', 	 name: 'elementId',    index:'ELEMENTID'      , width:'80',	 align: 'left'},
	            { label: '파일명',         name: 'imgFileName',  index:'IMG_FILE_NAME'  , width:'160', align: 'left'},
	            { label: '포맷',          name: 'imgFormatType',index:'IMG_FORMAT_TYPE',width:'65',   align: 'center'},
	            { label: '상태코드', 		 name: 'maskPrgStsc',  index:'MASK_PRG_STSC'  , width:'65',  align: 'center'},
	            { label: '사용자 확인',     name: 'userConfirm',  index:'USER_CONFIRM'   , width:'80',  align: 'center'},	  
	            { label: '금융안내', 	  	 name: 'ayn', 		    width:'80',	  align: 'center',sortable: false },
	            { label: '금융이외', 		 name: 'byn', 		    width:'80',	  align: 'center',sortable: false },
	            { label: '보험제공', 	  	 name: 'cyn', 		    width:'80',	  align: 'center',sortable: false },
	            { label: '딜러제공', 		 name: 'dyn', 		    width:'80',   align: 'center',sortable: false },
	            { label: 'KB제공', 		 name: 'eyn', 		    width:'80',   align: 'center',sortable: false },
	            { label: '수집-전화', 		 name: 'tmRecvYn', 	    width:'80',   align: 'center',sortable: false },
	            { label: '수집-문자', 		 name: 'smsRecvYn',     width:'80',   align: 'center',sortable: false },
	            { label: '수집-DM', 		 name: 'dmRecvYn', 	    width:'80',   align: 'center',sortable: false },
	            { label: '수집-메일', 		 name: 'emailRecvYn',   width:'80',   align: 'center',sortable: false },
	            { label: '제공-전화', 		 name: 'tmOfferYn',     width:'80',   align: 'center',sortable: false },
	            { label: '제공-DM', 		 name: 'dmOfferYn',     width:'80',   align: 'center',sortable: false },
	            { label: '제공-메일', 		 name: 'emailOfferYn',  width:'80',   align: 'center',sortable: false },
	            { label: '',  			 name: 'maskPrgStscTxt',width:'0',    align: 'left', hidden:true},
	            { label: '',  			 name: 'userConfirmTxt',width:'0',    align: 'left', hidden:true},
	        ],
	       
	        height: gridHeight,
	        autowidth:true,
	        rowNum: 100,
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
	        //로드완료 시 (조회 시 reloadGrid 후에도 호출)  
	        loadComplete: function() {
	        	
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

	        },
	        //셀더블클릭 이벤트 - deprecated
	        ondblClickRow: function(rowid, iRow, iCol) {
	        },
	        loadComplete: function() {
			}
	        
		});

		//그리드 초기화 종료
		//그리드 resize 
		modComm.resizeJqGridWidth("jqGrid","gridContainer",$("#gridContainer").width(), true);
		
		//엑셀출력을 위한 컬럼정보 생성
		modComm.addGridColEl("jqGrid", "gridLabelList", "gridNameList", "gridWidthList", "gridAlignList");
	};
		
	


    
    /**
	 * 마스터 조회
	 */  
	function selList() {
		$("#jqGrid").jqGrid('clearGridData');
		
		//전체건수 조회
    	var objParam = {};
    	var arrForm = $("#frmDailyPro").serializeArray();
    	//console.log(arrForm);
    	if(arrForm) {
    		arrForm.forEach(function(item) {
    			objParam[item.name] = item.value;
    			console.log(item.value);  
    		});
    	}
    	
    	selTotalCount(objParam);
		
    	//전체건수가 있으면 목록조회
		if(totRowCnt < 1) {
			$("#jqGrid > tbody").append("<tr class='ui-widget-content jqgrow ui-ltr'><td colspan='18' class='text-center'>조회된 결과가 없습니다.</td></tr>");
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
		var arrForm = $("#frmDailyPro").serializeArray();
		if(arrForm) {
			arrForm.forEach(function(item) {
				objParam[item.name] = item.value;
			});
		}
		
		selTotalCount(objParam);
		
    	//전체건수가 있으면 엑셀출력
		if(totRowCnt < 1) {
			alert("조회된 결과가 없습니다.");
			//$("#jqGrid > tbody").append("<tr class='ui-widget-content jqgrow ui-ltr'><td colspan='18' class='text-center'>조회된 결과가 없습니다.</td></tr>");
			return;
		} else {			
			var frmLogin = $("#frmDailyPro")[0];
			frmLogin.action = "/dpm/selListDpmDailyProExcel.do";
			frmLogin.method = "post";
			frmLogin.submit();			
		}		
	};
	 /**
	 * 배치 건수 조회
	 */  
	function batchTotCheck(){
		if(confirm("배치를 돌리시겠습니까?")){
			modAjax.request("/dpm/getBatchTotCnt.do","",{
			async: false,
			success: function(data) {
				if(data.responseStatisticsVo.rsYn == "Y") {
					batchStart();
				}else{
					alert("처리 할 데이터가 없습니다.");
					return;
				}
			},
            error: function(response) {
                console.log(response);
            }
    		});		
			
    	}		
	};
	
	  /**
	 * 배치 시작
	 */  	
	function batchStart() {
		modAjax.request("/dpm/dpmBatchStart.do","",{
			async: false,
			success: function(data) {
			},
            error: function(response) {
            console.log(response);
            }
    	});
	};
	
	return {
		init: init,
		selList: selList,
		selListPage: selListPage,
		excelWrite: excelWrite,
		batchTotCheck: batchTotCheck		
	};

})();


/**
 * 엑셀버튼 클릭
 */
$("#btnExcel").on("click", function() {
	modDpmDailyPro.excelWrite();
});

$("#searchBtn").on("click", function() {
	$("#prcDt").val();
	modDpmDailyPro.selList();
});

$("#textPrcDt").keydown(function(key){
	if(key.keyCode == 13) {
		modDpmDailyPro.selList();
	}
});


/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
	modDpmDailyPro.init();
	modDpmDailyPro.selList();
});
//# sourceURL=dpm1010.js
