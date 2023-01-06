
/**
  * @File Name : dpmUserManageInfo.js
  * @Description : 사용자 관리 화면
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2022.12.12             최초 생성
 */
var currntPageIndex;
var gridEventFlag;
var selectByGrid;
var onSelistfinger;
var chgPwdYn='N';
var modDpmUserManageInfo = (function(){    
    var totRowCnt = 0;
    var gridHeight = '100%';
	/**
	 * 초기화
	 */	
	function init() {
		//마스터 그리드 초기화 시작
		$("#jqGrid").jqGrid({
	    	//jqGrid url 전송선언
	        url: '/dpm/getdpmUserManageInfo.do',
	        mtype: "POST",
	        datatype: "local",
	        postData: {},
	        //jqGrid 양식선언부        
	        colModel: [
	            { label: '담당자 ID',    name: 'chrrId',    index:'CHRR_ID',align: 'center',width:'100'},
	            { label: '담당자명', 	   name: 'chrrNm',    index:'CHRR_NM',align: 'center',width:'100'},
	            { label: '부서명', 	   name: 'deptnm',    index:'DEPTNM' ,align: 'center',width:'100'},
	            { label: '사용여부', 	   name: 'uyn',       index:'UYN' 	 ,align: 'center',width:'70'},
	            { label: '등록자 ID',    name: 'rgId',      index:'RG_ID'  ,align: 'center',width:'100'},	  
	            { label: '등록자명', 	   name: 'rgNm',      index:'RG_NM'  ,align: 'center',width:'100'},
	            { label: '등록 일자', 	   name: 'rgDt',      index:'RG_DT'  ,align: 'center',width:'100'},
	            { label: '등록 시간', 	   name: 'rgTm',      index:'RG_TM'  ,align: 'center',width:'80'},
	            { label: '사유', 	       name: 'rgReason',  index:'RG_REASON',align: 'left',width:'400'},
	            { label: '회사 번호', 	   name: 'companyId', align: 'center', hidden:true },
	            { label: '연번', 	   	   name: 'idNo', 	  align: 'center', hidden:true }
	        ],
	       
	        height: gridHeight,
	        autowidth:true,
	        rowNum: 100,
	        sortable : true,
			loadonce : false, //이옵션이 정렬시에 다시쿼리 안날리고 화면에서 하는거
	        rownumbers: true,
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
				var rowdata = 	$("#jqGrid").getRowData(rowid);
				$(".join_form #newChrrId").val(rowdata.chrrId);
				$(".join_form #newChrrId").prop('disabled',true)
				$(".join_form #newCompanyId").val(rowdata.companyId);
				$(".join_form #newChrrNm").val(rowdata.chrrNm);
				$(".join_form #newDeptnm").val(rowdata.deptnm);
				$(".join_form #NewRgReason").val(rowdata.rgReason);
				$(".join_form #idNo").val(rowdata.idNo);
				
				$("#insert").hide();
				$("#pwdTr").hide();
				$("#update").show();
				$("#delete").show();
				$("#chgPwd").show();
        		layer_popup('#layer');
	        },
	        //셀더블클릭 이벤트 - deprecated
	        ondblClickRow: function(rowid, iRow, iCol) {
	        },
	        
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
    	var arrForm = $("#frmUserManageInfo").serializeArray();
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
			$("#jqGrid > tbody").append("<tr class='ui-widget-content jqgrow ui-ltr'><td colspan='12' class='text-center'>조회된 결과가 없습니다.</td></tr>");
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
		modAjax.request("/dpm/getdpmUserManageInfoTotRowCnt.do", objParam,  {
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
		$("#spnTotCnt").text(totRowCnt);
	};	
	
	
	
    /**
	 * 엑셀출력
	 */ 	
	function excelWrite() {		
		//조회조건
		var objParam = {};
		var arrForm = $("#frmUserManageInfo").serializeArray();
		if(arrForm) {
			arrForm.forEach(function(item) {
				objParam[item.name] = item.value;
			});
		}
		
		selTotalCount(objParam);
		
    	//전체건수가 있으면 엑셀출력
		if(totRowCnt < 1) {
			alert("조회된 결과가 없습니다.");
			//$("#jqGrid > tbody").append("<tr class='ui-widget-content jqgrow ui-ltr'><td colspan='12' class='text-center'>조회된 결과가 없습니다.</td></tr>");
			return;
		} else {			
			var frmLogin = $("#frmUserManageInfo")[0];
			frmLogin.action = "/dpm/selListUserInfoExcel.do";
			frmLogin.method = "post";
			frmLogin.submit();			
		}		
	};
	
	return {
		init: init,
		selList: selList,
		selListPage: selListPage,
		excelWrite: excelWrite,
		newUser: newUser		
	};

})();
/**
 * 조회버튼 클릭
 */
$("#searchBtn").on("click", function() {
	modDpmUserManageInfo.selList();
});

/**
 * 엑셀버튼 클릭
 */
$("#btnExcel").on("click", function() {
	modDpmUserManageInfo.excelWrite();
});
	
	//레이어팝업 오픈
    function layer_popup(el){

        var $el = $(el);    //레이어의 id를 $el 변수에 저장
        var isDim = $el.prev().hasClass('dimBg'); //dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('#close').click(function(){
            isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
            return false;
        });

        $('.layer .dimBg').click(function(){
            $('.dim-layer').fadeOut();
            return false;
        });

    }
    //신규 등록 레이어팝업 오픈
	function newUser(){
		dataReSet();
		$("#insert").show();
		$("#pwdTr").show();
		$("#chgPwd").hide();
		$("#update").hide();
		$("#delete").hide();
		$(".join_form #newChrrId").prop('disabled',false)
        layer_popup('#layer');
	};
	//레이어 폼 data 초기화
	function dataReSet(){
		chgPwdYn="N";
		$(".join_form #newChrrId").val('');
		$(".join_form #newCompanyId").val('');
		$(".join_form #newChrrNm").val('');
		$(".join_form #newChrrPwd").val('');
		$(".join_form #newDeptnm").val('');
		$(".join_form #idNo").val('');
		$(".join_form #NewRgReason").val('');
	}
	
    //등록 버튼
    $("#insert").on("click", function() {
		var objChrr;
		if(modComm.isEmpty($(".join_form #newChrrId").val())) {
			alert("ID를 입력하십시오.");
			$(".join_form #newChrrId").focus();
			return;
		}
		
		if(modComm.isEmpty($(".join_form #newCompanyId").val())) {
			alert("사번을 입력하십시오.");
			$(".join_form #newCompanyId").focus();
			return;
		}
		
		if(modComm.isEmpty($(".join_form #newChrrPwd").val())) {
			alert("비밀번호를 입력하십시오.");
			$(".join_form #newChrrPwd").focus();
			return;
		}
		
		if(modComm.isEmpty($(".join_form #newChrrNm").val())) {
			alert("담당자명을 입력하십시오.");
			$(".join_form #newChrrNm").focus();
			return;
		}
		
		if(modComm.isEmpty($(".join_form #newDeptnm").val())) {
			alert("부서명을 입력하십시오.");
			$(".join_form #newDeptnm").focus();
			return;
		}
		if(modComm.isEmpty($(".join_form #NewRgReason").val())) {
			alert("사유를 입력하십시오.");
			$(".join_form #NewRgReason").focus();
			return;
		}else{
			$(".join_form #NewRgReason").val().split("\n").join("\\n");
		}
		//등록 아이디 유무 검사
		objChrr = userLoginCheck($(".join_form #newChrrId").val());
		if(!modComm.isEmpty(objChrr) && objChrr.hasOwnProperty("chrrId") && !modComm.isEmpty(objChrr.chrrId)) {
			alert("동일한 담당자ID가 있습니다. 다시 입력하시기 바랍니다.");
			$(".join_form #newChrrId").focus();
			return;
		}else{
    		var objParam = {};
    		var arrForm = $("#frmUserInfo").serializeArray();
    		//console.log(arrForm);
    		if(arrForm) {
    			arrForm.forEach(function(item) {
    				objParam[item.name] = item.value;
    			});
    		}
    		
    		modAjax.request("/dpm/insertUserInfo.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y") {
					alert("등록에 성공했습니다.");
					dataReSet();// 등록 폼 리셋
					closePopup('#layer');
					modDpmUserManageInfo.selList(); //페이지 리로드
				}							
			},
            error: function(response) {
                console.log(response);
            }
    		});		
			
		}
	
	});
	
	
	 //변경 버튼
    $("#update").on("click", function() {
		var objChrr;
		if(modComm.isEmpty($(".join_form #newCompanyId").val())) {
			alert("사번을 입력하십시오.");
			$(".join_form #newCompanyId").focus();
			return;
		}
		if(chgPwdYn =="Y"){
			if(modComm.isEmpty($(".join_form #newChrrPwd").val())) {
			alert("비밀번호를 입력하십시오.");
			$(".join_form #newChrrPwd").focus();
			return;
			}
		}
		
		if(modComm.isEmpty($(".join_form #newChrrNm").val())) {
			alert("담당자명을 입력하십시오.");
			$(".join_form #newChrrNm").focus();
			return;
		}
		
		if(modComm.isEmpty($(".join_form #newDeptnm").val())) {
			alert("부서명을 입력하십시오.");
			$(".join_form #newDeptnm").focus();
			return;
		}
		if(modComm.isEmpty($(".join_form #NewRgReason").val())) {
			alert("사유를 입력하십시오.");
			$(".join_form #NewRgReason").focus();
			return;
		}

    		var objParam = {};
    		var arrForm = $("#frmUserInfo").serializeArray();
    		//console.log(arrForm);
    		if(arrForm) {
    			arrForm.forEach(function(item) {
    				objParam[item.name] = item.value;
    			});
    		}
    		
    		modAjax.request("/dpm/updateUserInfo.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y") {
					alert("등록에 성공했습니다.");
					dataReSet();// 등록 폼 리셋
					closePopup('#layer');
					modDpmUserManageInfo.selList(); //페이지 리로드
				}							
			},
            error: function(response) {
                console.log(response);
            }
    		});		
	
	});
	
	 //삭제 버튼
    $("#delete").on("click", function() {
		if(confirm("삭제하시겠습니까?")){
			
			var objParam = {};
    		var arrForm = $("#frmUserInfo").serializeArray();
    		//console.log(arrForm);
    		if(arrForm) {
    			arrForm.forEach(function(item) {
    				objParam[item.name] = item.value;
    			});
    		}
    		
    		modAjax.request("/dpm/deleteUserInfo.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y") {
					alert("삭제하였습니다.");
					dataReSet();// 등록 폼 리셋
					closePopup('#layer');
					modDpmUserManageInfo.selList(); //페이지 리로드
				}							
			},
            error: function(response) {
                console.log(response);
            }
    		});		
			
		}
	
	});
	//비밀번호 변경 클릭 이벤트
	 $("#chgPwd").on("click", function() {
		chgPwdYn = "Y";
		$("#pwdTr").show();
		$("#newChrrPwd").focus();
	});
	
	//등록 후 레이어 닫기
	function closePopup(el){
		var $el = $(el);   
        var isDim = $el.prev().hasClass('dimBg'); 
        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); 
	}
	
	/**
	 * 담당자ID 유무 검사 
	 */	
	function userLoginCheck(userId) {
		var objParam = {"chrrId" : userId};
		var objResult;
		
		modAjax.request("/login/loginCheck.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y" && data.hasOwnProperty("selOne")) {
					objResult = data.selOne;	
				}							
			},
            error: function(response) {
                console.log(response);
            }
    	});					
		
		return objResult;

	};	
	
	//검색조건 초기화
	 $("#resetBtn").on("click", function() {
		$("#chrrId").val('');
		$("#chrrNm").val('');
		$("#deptnm").val('');
	});
	

/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
	modDpmUserManageInfo.init();
	modDpmUserManageInfo.selList();
});

//# sourceURL=dpm1010.js
