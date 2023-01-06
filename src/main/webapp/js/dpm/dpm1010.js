
/**
  * @File Name : dpm1010.js
  * @Description : 이미지검증
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.04.01             최초 생성
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

var modDpm1010 = (function(){    
    var serverDate = modComm.getServerDate();
    var totRowCnt = 0;
    var axAllViewCtlC1;	//이미지뷰어 OBJECT
    var objCommUtil;	//파일제어 및 Multipart 전송 OBJECT
    var objMagicLock;   //매직락 폴더보안 OBJECT
    var winImgView;    
    var MultiThumbnailIndex;
    
    var userListSelected = true;
    var gridHeight = 632;
	/**
	 * 초기화
	 */	
	function init() {
		//calendar

		modComm.setDatepicker("txtStartDt","imgStartDt");
		modComm.setDatepicker("txtEndDt","imgEndDt");
		//$("#txtStartDt").val(modComm.getGridDateFormat(serverDate));	
		$("#txtStartDt").val(modComm.getGridDateFormat(modComm.addDate(serverDate,-7)));
		$("#txtEndDt").val(modComm.getGridDateFormat(serverDate));		
		
		//검증기간 임시
		//$("#txtStartDt").val("2019-07-09");
		
		//업무구분코드
		modComm.setSelectboxByCd("EDMS_JOB_CFCD","selBizCd", "cId", "cnm", "전체", "AL");		
		modComm.setSelectboxByCd("IMG_STYL_ID","selImgStylId", "cId", "cnm", "전체", "0000000", "Y");
		
		//지문score
		var i;
		for(i=0; i<=100; i++) {
			$("#selFpScore").append("<option value='" + i + "'>" + i + "</option>");	
		}
		$("#selAgentCn").val(0);		
		
		//마스터 그리드 초기화 시작
		$("#jqGrid").jqGrid({
	    	//jqGrid url 전송선언
	        url: '/dpm/selListImageVerify.do',
	        mtype: "POST",
	        //styleUI: "Bootstrap",	        
	        datatype: "local",
	        postData: {},
	        
	        //jqGrid 양식선언부        
	        colModel: [
	        	//{ name:"cb",width:25,sortable:false,resizable:false,hidedlg:true,search:true,align:"center",fixed:true,title:true,lso:"",hidden:false,widthOrg:25},
	        	
	            { label: '처리일자', name: 'prcDt', width: 100, align: 'center', formatter:currencyFmatterDate},
	            { label: '업무', name: 'bizBsnNm', width: 60, align: 'center' },
	            { label: '검증', name: 'verifySts', width: 50, align: 'center'},
	            { label: '페이지수', name: 'imgCountInfo', width: 80, align: 'center', formatter:'integer' },
	            { label: '마스킹수', name: 'fpCn', width: 80, align: 'center', formatter:'integer' },
	            { label: '마스킹페이지', name: 'imgMaskCountInfo', width: 90, align: 'center', formatter:'integer' },	  
	            { label: '최종수정자', name: 'chrrNm', width: 100, align: 'center'},
	            { label: '엘리먼트ID', name: 'elementid', width: 140, align: 'center' },
	            { label: '마스크엘리먼트ID', name: 'elementidMask', width: 140, align: 'center', formatter:'string'},
	            { label: '검출결과', name: 'cgnRzt', width: 80, align: 'center', formatter:'integer', hidden:true },
	            { label: '마스크진행상태코드', name: 'maskPrgStsc', width: 0, align: 'center', hidden:true },
	            { label: '처리서버', name: 'maskSvrnm', width: 100, align: 'center', hidden:true },
	            { label: '처리에이전트', name: 'maskAgent', width: 100, align: 'center',  hidden:true },
	            { label: '이미지저장경로', name: 'imgPath', width: 0, align: 'center', hidden:true },
	            { label: '처리시스템분류', name: 'bprBsnDsc', width: 0, align: 'center', hidden:true },
	            { label: 'EDMS업무구분코드', name: 'edmsJobCfcd', width: 0, align: 'center', hidden:true },
	            { label: '기타5', name: 'etc5', width: 0, align: 'center', hidden:true },
	            { label: '기타4', name: 'etc4', width: 0, align: 'center', hidden:true },
	            { label: '기타3', name: 'etc3', width: 0, align: 'center', hidden:true },
	            { label: '확장자', name: 'etc2', width: 0, align: 'center', hidden:true },
	            { label: '썸네일인덱스', name: 'thumbnailIndex', width: 0, align: 'center', hidden:true },
	            { label: '전환일자', name: 'crtDt', width: 0, align: 'center', hidden:true }
	            
	        ],
	        
	        height: gridHeight,
	        //autowidth:true,
	        rowNum: 100,
	        rownumbers: true,
	        rownumWidth : 40,
	        viewrecords: false,
	        loadtext: "<img src='/images/loadinfo.net.gif' />",
	        //emptyrecords:"조회된 데이터가 없습니다.",
	        //emptyrecords:"",
	        //viewrecords : false,
	        scrollrows: true,
	        shrinkToFit:false,
	        forceFit:true,
	        multiselect: true,

	        
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
	        	//console.log("그리드 load complete");
	        	if($("#jqGrid").getGridParam("reccount") > 0) {
	        		addThumbnailMaskFile();
	        		
	        		if(onSelistfinger != undefined && onSelistfinger != null && onSelistfinger != ""){
	        			axAllViewCtlC1.SelectThumbnailbyIndex(onSelistfinger);
	        			onSelistfinger = undefined;
	        		}else{
	        			axAllViewCtlC1.SelectThumbnailbyIndex(0);
	        		}

	            	

	        	}
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
	        //셀클릭 이벤트
	        onCellSelect: function(rowid, iCol, data, event){
	        	console.log("rowid : " +rowid.toString());
	        	if(rowid < 1) return;

	        	if (axAllViewCtlC1.imageFilePath == "" || axAllViewCtlC1.imageFilePath == "/"){
        			$("#btnMasking").prop("disabled", true);
    				$("#btnMaskingCancel").prop("disabled", true);
        		}
        		var arrGridData = $('#jqGrid').getRowData();
        		if(arrGridData.length > 1){
        			$("#btnMasking").prop("disabled", true);
    				$("#btnMaskingCancel").prop("disabled", true);
        		}
	        	if(iCol == 1){
	        		return;
	        	}else{
	        		selectByGrid = true;	        		
	        	}
	        	
	        	if (gridEventFlag == false) {
	        		console.log("gridEventFlag : " +gridEventFlag.toString());
	        		gridEventFlag = true;
	        		return;
	        		
	        	}else{
	        		console.log("axAllViewCtlC1.SelectThumbnailbyIndex 호출 : rowid = " + (rowid-1).toString());
	        		
	        		if($("#selCategory").val() != "5") {
	        			var arrGridData = $('#jqGrid').getRowData();
	        			var currRow = 0;
		        		var maskCount = 1;
		        		arrGridData.forEach(function(item) {
		        			currRow++;
		        			if (currRow != rowid){
		        				maskCount = maskCount + parseInt(item.fpCn);
		        			}else{
		        				axAllViewCtlC1.SelectThumbnailbyIndex(maskCount-1);		        				
		        			}
		        			
		        		});
	        		}else{
	        			axAllViewCtlC1.SelectThumbnailbyIndex(rowid-1);
	        		}
	
	        	}

	        },
	        
	        onSelectAll: function(){
	        	if (axAllViewCtlC1.imageFilePath == "" || axAllViewCtlC1.imageFilePath == "/"){
        			$("#btnMasking").prop("disabled", true);
    				$("#btnMaskingCancel").prop("disabled", true);
        		}
        		var arrGridData = $('#jqGrid').getRowData();
        		if(arrGridData.length > 1){
        			$("#btnMasking").prop("disabled", true);
    				$("#btnMaskingCancel").prop("disabled", true);
        		}
	        },
	        
	      //Row클릭 이벤트
	        onSelectRow: function(rowid) {

	        },
	        
	        getChecked : function(listObj){
	        	return $(listObj + ':checkbox[name^=jqg_list]:checked');
	        },
	        	
	        //셀더블클릭 이벤트 - deprecated
	        ondblClickRow: function(rowid, iRow, iCol) {
//	        	if(rowid < 1 || iCol <0 ) return;
//	        	
//	        	var sMask = $("#jqGrid").jqGrid('getRowData',rowid).etc4;
//	        	var sThumbnail = $("#jqGrid").jqGrid('getRowData',rowid).etc5;
//	        	var sOrigin = $("#jqGrid").jqGrid('getRowData',rowid).imgPath;
//	        	var sEID = $("#jqGrid").jqGrid('getRowData',rowid).elementid;
//	        	var sIDXID = $("#jqGrid").jqGrid('getRowData',rowid).idxId;
//	        	var sJobID = $("#jqGrid").jqGrid('getRowData',rowid).edmsJobCfcd;
//
//	        	pSubLoadImgView(sOrigin, sMask, sIDXID, sEID, sJobID, sThumbnail);
	        },
	        
	        //멀티셀렉트 사용시 체크박스 선택 시에만 체크되도록 함
	        
//	        beforeSelectRow: function(rowid, e) {
//	            var $jqGrid = $(this),
//	            i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
//	            cm = $jqGrid.jqGrid('getGridParam', 'colModel');
//	            return (cm[i].name === 'cb');
//	        }
	        
		}); //.hideCol('cb');	//.hideCol('cb')는 multiselect: true인 경우 앞의 체크박스를 숨기기 위함
		//그리드 초기화 종료
		
			
		//그리드 resize 
		//modComm.resizeJqGridWidth("jqGrid","gridContainer",$("#gridContainer").width(), (parseInt($(window).height())-gridHeight), false);	
		modComm.resizeJqGridWidth("jqGrid","gridContainer",$("#gridContainer").width(), true);
		
		//엑셀출력을 위한 컬럼정보 생성
		modComm.addGridColEl("jqGrid", "gridLabelList", "gridNameList", "gridWidthList", "gridAlignList");
	};
		
	/**
	 * 그리드항목 포맷정의 일자
	 */		
    function currencyFmatterDate(celval, opts , el) {
    	return modComm.getGridDateFormat(celval);
    };
    
    /**
	 * 그리드항목 포맷정의 일시
	 */    
    function currencyFmatterDateTime(celval, opts , el) {
    	return modComm.getGridDateFormat(celval,"date_time");
    };	
	
    /**
	 * 조건유효성검사
	 */    
    function getValidation(){
		if(!modComm.isValidBetweenDate("txtStartDt", "txtEndDt")) return false;		
		if($("#txtEndDt").val().replace(/-/gi,"") > serverDate) {
			alert("당일 이후는 조회가 불가합니다.");
			$("#txtEndDt").focus();
			return false;    					
		}
		
		return true;
    };
    
    /**
	 * 마스터 조회
	 */  
	function selList() {
		
		axAllViewCtlC1.ClearThumbnails();
    	axAllViewCtlC1.RemoveTempFolder();
	    axAllViewCtlC2.imageFilePath = "/";
		axAllViewCtlC2.DrawImage();
		
		$("#jqGrid").jqGrid('clearGridData');
		
	      //조회조건 확인
		if(!getValidation()) return;
		
		//전체건수 조회
    	var objParam = {};
    	var arrForm = $("#frm1010").serializeArray();
    	//console.log(arrForm);
    	if(arrForm) {
    		arrForm.forEach(function(item) {
    			objParam[item.name] = item.value;
    			//console.log(item.value);  
    		});
    	}
    	
    	//console.log(objParam);
    	selTotalCount(objParam);
		
    	//전체건수가 있으면 목록조회
		if(totRowCnt < 1) {
			alert("조회된 데이터가 없습니다.");
			return;
		} else {
			console.log($("#selVerifyYn").val());
			if ($("#selVerifyYn").val() != 1 && $("#selVerifyYn").val() != 9 ){ //&& $("#selVerifyYn").val() != 3
				$("#btnMasking").prop("disabled", true);
				$("#btnMaskingCancel").prop("disabled", true);
				//$("#btnVerity").prop("disabled", true);
			}else{
				$("#btnMasking").prop("disabled", false);
				$("#btnMaskingCancel").prop("disabled", false);
				//$("#btnVerity").prop("disabled", false);
			}
        	objParam.totRowCnt	= totRowCnt;
			$("#jqGrid").setGridParam({datatype : 'json', postData : objParam});			
			selListPage(1, $("#jqGridPager").find("select.ui-pg-selbox option:selected").val());
		}
	
	};
	
    /**
	 * 전체건수 조회
	 */  	
	function selTotalCount(objParam) {
		totRowCnt = 0;
		modAjax.request("/dpm/selOneImageVerifyTotRowCnt.do", objParam,  {
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
	function selListPage(pageNumber, pageSize, selIdx) {		
		var objParam = $("#jqGrid").getGridParam("postData");    	
    	objParam.pageNumber = pageNumber;
    	objParam.pageSize	= pageSize;
    	objParam.totPageCnt	= Math.ceil(objParam.totRowCnt/pageSize);
    	
    	$("#jqGrid").setGridParam({datatype : 'json', postData : objParam});
    	$("#jqGrid").trigger('reloadGrid');    	
		$("#spnTotCnt").text(totRowCnt);

    			
	};	
	

	
    /**
	 * 엑셀출력
	 */ 	
	function excelWrite() {		
		//조회조건 확인
		if(!getValidation()) return;	
		
		//조회조건
		var objParam = {};
		var arrForm = $("#frm1010").serializeArray();
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
			var frmLogin = $("#frm1010")[0];
			frmLogin.action = "/dpm/selListImageVerifyExcel.do";
			frmLogin.method = "post";
			frmLogin.submit();			
		}		
	};
	
    /**
	 * 이미지조회 팝업창 open
	 */ 	
	function pSubLoadImgView(sOrigin, sMask, sIDXID, sEID, sJobID, sThumbnail) {
		//팝업창에서 참조할 값 set
		$("#txt1010PopupOrigin").val(sOrigin);
		$("#txt1010PopupMask").val(sMask);
		$("#txt1010PopupIDXID").val(sIDXID);
		$("#txt1010PopupEID").val(sEID);
		$("#txt1010PopupJobID").val(sJobID);
		$("#txt1010PopupThumbnail").val(sThumbnail);
				
		var nWidth = "700";
		var nHeight = "700";
		  
		// 듀얼 모니터 고려한 윈도우 띄우기
		var curX = window.screenLeft;
		var curY = window.screenTop;
		var curWidth = document.body.clientWidth;
		var curHeight = document.body.clientHeight;
		  
		var nLeft = curX + (curWidth / 2) - (nWidth / 2);
		var nTop = curY + (curHeight / 2) - (nHeight / 2);

		var strOption = "";
		strOption += "left=" + nLeft + "px,";
		strOption += "top=" + nTop + "px,";
		strOption += "width=" + nWidth + "px,";
		strOption += "height=" + nHeight + "px,";
		strOption += "toolbar=no,menubar=no,location=no,";
		strOption += "resizable=yes,status=yes";		
		
		var winImgView = window.open("/dpm/dpm0010Pop.ui", "frm1010Popup", strOption);
	};	
	
    /**
	 *************************************************************************************************************
	 * 이미지뷰어 dll OBJECT 제어
	 *************************************************************************************************************
	 */ 	
	
    /**
     *  Function :  작업 폴더를 생성하고 썸네일 경로를 초기화한다.
	    Param    :	없음
	    Return	 :	없음
     */	
    function objectInit() {    	
        /// Viewer Create
//        var divViewer = document.getElementById("divAllView");        
//        var viewerHTML = 
//        f_createObjectToHTML("MImgView", "99%", "420px", MALLVIEW_OCX_CLSID, "", "");
//        divViewer.innerHTML = viewerHTML;

        axAllViewCtlC1 = document.getElementById("MImgView");
        axAllViewCtlC2 = document.getElementById("MImgView2");
        
        ThumbnailViewerInit(axAllViewCtlC1, 1);
        ThumbnailViewerInit(axAllViewCtlC2, 2);
        
        
        /// CommUtil Create
        var divCommUtil = document.getElementById("divCommUtil");
        var commUtilHTML = 
        f_createObjectToHTML("CommUtil", "1", "1", COMMUTIL_OCX_CLSID, "", "");
        divCommUtil.innerHTML = commUtilHTML;
        objCommUtil = document.getElementById("CommUtil");
        //xMaskConnect(objCommUtil);
        	
        /// FileManager Create
        var divFileManager = document.getElementById("divFileManager");
        var fileManagerHTML = 
        f_createObjectToHTML("MFileManager", "0", "0", MFILEMANAGER_OCX_CLSID, "", "");
        divFileManager.innerHTML = fileManagerHTML;
        
        axALLViewFileManagerCtlC1 = document.getElementById("MFileManager");

        gFunFolderLockConn(objCommUtil);
        fnDestroyThemAll();
        fnCreateThemAll();
    };
    
    
    /**
     *  Function :  HTML에 OBJECT를 Write한다.
	    Param    :	id       - Object ID
	    			width    - Object Size
	    			height   - Object Size
	    			classid  - Object CLASSID
	    			codebase - Object CODEBASE
	    			version  - Object version
	    Return	 :	strHTML
     */	    
    function f_createObjectToHTML (id, width, height, classid, codebase, version) {
    	var strHTML = '';
    	
    	
    	
    	
    	
    	if (width  == "") width = 0;
    	if (height == "") height = 0;

    	strHTML += '<OBJECT  ID="' + id + '" WIDTH="' + width + '" HEIGHT="' + height + '" ';
    	strHTML += 'CLASSID="' + classid;

    	if (codebase != "") {
    		strHTML += '" CODEBASE="' + codebase;
    		if (version != "")
    			strHTML += '#version=' + version;
    	}

    	strHTML += '">';
    	strHTML += '</OBJECT>';
    	//alert("strHTML: " + strHTML);

    	//document.writeln(strHTML);
//    	if (id == "MImgView" ){
//    		strHTML += '<SCRIPT FOR="' + id + '" EVENT="OnThumbnailMouseEvent(thumbnailType, buttonType, thumbnailIndex, x, y)" LANGUAGE="javascript">';
//        	strHTML += 'MImgView_OnThumbnailMouseEvent(thumbnailType, buttonType, thumbnailIndex, x, y)';
//        	strHTML += '</SCRIPT>';
//        	
//        	strHTML += '<SCRIPT FOR="' + id + '" EVENT="OnSelectedThumbnail(index)" LANGUAGE="javascript">';
//        	strHTML += 'MImgView_OnSelectedThumbnail(index)';
//        	strHTML += '</SCRIPT>';
//    	}
    	//alert(strHTML);
    	//document.writeln(strHTML);
    	return strHTML;
    };    
    
    /**+
     * 
     *  Function :  특정 경로에 폴더 보안을 건다.
	    Param    :	obj - 폴더보안 object
	    Return	 :	없음
     */	     
    function xMaskConnect(obj)
    {
    	
    	var nRet = obj.xMaskConnect(XMASK_TARGET);
    	
    	if (nRet != 0)
        {
            if (nRet == -1)
            {
            	
                alert("연결 실패(" + nRet + ")" + "＊ PC를 재부팅후 다시 로그인해 주십시오.\n"+"※ 재부팅후에도 보안폴더 연결이 되지 않을경우 프로그램을 재설치해 주십시오.");
            }
            else
            {
                alert("연결 실패(" + nRet + ")");
            }
        }
    };
    
    /**
     *  Function :  특정 경로에 폴더 보안을 건다.
	    Param    :	obj - 폴더보안 object
	    Return	 :	없음
     */	     
    function gFunFolderLockConn(obj)
    {
    	

    	var nRet = obj.gFunSecuFolderLock();
    	console.log("nRet : " + nRet);

    	
    	if (nRet != 0)
        {
            if (nRet == 1)
            {
                alert("연결 실패(" + nRet + ")" + "＊ PC를 재부팅후 다시 로그인해 주십시오.\n"+"※ 재부팅후에도 보안폴더 연결이 되지 않을경우 프로그램을 재설치해 주십시오.");
            }
            else
            {
                alert("연결 실패(" + nRet + ")");
            }
        }
    };
    
    /**
     *  Function :  썸네일 화면을 초기화 한다.
	    Param    :	obj - 올뷰 object
	    Return	 :	없음
     */	     
    function ThumbnailViewerInit(obj, no)
    {
    	if (no == 1) {
			obj.AutoCreateThumbnails = 1;
			obj.ShowThumbnailsView = true;	// 썸네일 전용 뷰어 (썸네일 보이기)
			obj.ShowMainView = false;	// 썸네일 전용 뷰어 (베인뷰어 숨김)
			obj.LockThumbnailPosition = 1;	// 드래그 허용 불가 | 0 : 변경가능 , 1 : 변경불가
			obj.SetOnOffOption(2);		// 썸네일 클릭시 빨간박스 생기도록
			obj.MultiPageThumbnailsMultiSelectMode = 0;// 썸네일 다중선택 | 0 : 단일 , 1 : 다중
			//obj.ReDrawThumbnails();		// 썸네일 화면 다시 그리기
			obj.setThumbnailsViewFrameSize = 120;
			obj.DrawImage();
			obj.ReDrawThumbnails();		// 썸네일 화면 다시 그리기
    	}else if (no ==2){

			obj.MergeBlackMaskImageMode = false;
			obj.ShowMainView = true; // 이미지뷰 화면 유무
			obj.ShowThumbnailsView = false; // 썸네일뷰 화면 유무
			obj.AutoSaveImage = false; // 이미지 자동저장 유무
			obj.ShowToolbar = true; // 뷰어 툴바 보기
			//obj.SetCustomizeToolbar("001120000021121111"); // 뷰어 툴바 설정
			obj.SetCustomizeToolbar("001120000001120000"); // 뷰어 툴바 설정
			obj.ShowAnnotationToolbar = false;
			obj.SetAnnotationSelectionMode = true; // 주석 선택
			obj.setThumbnailsViewFrameSize = 150; // 썸네일 사이즈
			obj.ShowMultiPageThumbnailsView = true;
			obj.SelectImageMode = 1;
			obj.MultiPageThumbnailsMultiSelectMode = 0;
			obj.VisibleWatermark = false;
			obj.ReDrawThumbnails();		// 썸네일 화면 다시 그리기
			obj.DrawImage(); // 뷰어 그리기
			obj.UpdateMainWindow();
    	}
    };
    
    /**
     *  Function :  썸네일 추가
     */	    
    function addThumbnailMaskFile()
    {
    	var arrGridData = $('#jqGrid').getRowData();
    	objCommUtil.gFun_Bar("이미지 다운로드 중입니다.@@잠시만 기다려 주세요.");
    	
    	var rowid = 0;
    	axAllViewCtlC1.ClearThumbnails();
    	axAllViewCtlC1.RemoveTempFolder();
    	objCommUtil.xMaskDisConnect();
    	arrGridData.forEach(function(item) {
    		
    		if($("#selCategory").val() == "5") {	// 이미지
    			rowid ++;
    			var elementId = item.elementid;
    			var elementIdMask = item.elementidMask;
    			//var elementId = "8019051713280200";
    			var unFolder = "D:\\MaskPath\\Masking\\UNMASK\\";
    			var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
    			var isOri = "O";
    			if (elementIdMask != null && elementIdMask != undefined && elementIdMask != "" && $("#selVerifyYn").val() != "3" && $("#selVerifyYn").val() != "4"){
    				var sFile = mskFolder + elementId + ".tif";
    				var targerElementId =  elementIdMask;
    				var sFolder = mskFolder;
    				isOri = "N";
    				//alert(isOri);
    			}else{
    				var sFile = unFolder + elementId +"." +item.etc2;
    				//var sFile = unFolder + elementId +".tif";
    				var targerElementId =  elementId;
    				var sFolder = unFolder;
    				isOri = "O";
    			}
    			

    			
    			//alert(sFile);
                if (!objCommUtil.ExistFolder(sFolder)){
                	objCommUtil.FolderCreate(sFolder);
                }
                
                if (targerElementId.length == 16){

                	if (!objCommUtil.ExistFile(sFile)){
                		if ((isOri == "O" &&  (item.crtDt >= CONVERTDAY)) || $("#selVerifyYn").val() == "3" || $("#selVerifyYn").val() == "4"){
                			console.log("다운엘리먼트 V: " + targerElementId);
                			bResult = objCommUtil.xMaskImgDown(targerElementId, sFile,"V", XMASK_TARGET);   //다운로드    
                			console.log("다운성공 : " + targerElementId);
                		}else {
                			console.log("다운엘리먼트 "+isOri+": " + targerElementId);
                			bResult = objCommUtil.xMaskImgDown(targerElementId, sFile, isOri, XMASK_TARGET);   //다운로드    
                		}
                		
                		
                	}
//20190628 주석                	
                	axALLViewFileManagerCtlC1.SetImageFile = sFile;
                	var multiImageCount = axALLViewFileManagerCtlC1.GetImagePageCount;
                	if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
                		var format = axALLViewFileManagerCtlC1.GetImageFormat;
                		console.log("format : " + format.toString());
                		if (format == 9){
                			//var newSfile = sFile.replace("." +item.etc2,".tif");
                			//axALLViewFileManagerCtlC1.ConvertPDF2TIFF(sFile,newSfile,3.0,7,100);
                			//sFile = newSfile;
                			//axALLViewFileManagerCtlC1.SetImageFile = sFile;
                		}
//                		var compressOrigin = axALLViewFileManagerCtlC1.GetImageCompress;
//                		if (compressOrigin == 34712 || compressOrigin == 34713 || compressOrigin == 33004 || compressOrigin == 34663){ //jpeg2000일 경우
//                			var FolderPath = objCommUtil.GetFolderName(sFile); 
//                    		var purename = objCommUtil.GetFileName(sFile, false); 
//                    		var tempFolder = FolderPath + "\\" + purename;
//                    		
//                    		if (!objCommUtil.ExistFolder(tempFolder)){
//               	             	objCommUtil.FolderCreate(tempFolder);
//                    		}
//
//                    		axALLViewFileManagerCtlC1.SplitMultipageTIFFFile(sFile, tempFolder, purename);
//                    		for (var i = 0; i < multiImageCount; i++) {
//                    			var pageName = tempFolder +"\\"+ purename + "_"+pad((i+1),5).toString() + ".tif";
//                    			
//                    			axALLViewFileManagerCtlC1.SetImageFile =pageName;
//                        		
//                        		var compress = axALLViewFileManagerCtlC1.GetImageCompress;
//                        		console.log("compress : " + compress.toString());
//                        		var imagePixel = axALLViewFileManagerCtlC1.GetBitPerPixel;
//                        		var j2kFlag = false;
//                        		if (compress == 34712 || compress == 34713 || compress == 33004 || compress == 34663){ //jpeg2000일 경우
//                        			j2kFlag = true;
//                        		} 
//                        		if (format == 1 || format == 2 || format == 3 || format == 4 || format == 5 || format == 6 || format == 7 || format == 8 ){ //이미지일 경우
//                        			if (j2kFlag){
//                        				if (imagePixel ==1){
//                        					//var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(sFile, sFile, 200, 1 ,1);
//                        					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(pageName, pageName, 4, 1 ,1);
//                        				}else{
//                        					//var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(sFile, sFile, 101, 24, 100);
//                        					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(pageName, pageName, 7, 24, 100);
//                        				}
//                        				
//                        				console.log("ret : " + ret.toString());
//                        			} else {
//                        				if (imagePixel ==1 && format != 1){
//                        					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(pageName, pageName, 4, 1 ,1);
//                        				}else if (imagePixel !=1 && format != 1){
//                        					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(pageName, pageName, 7, 24, 100);
//                        				}
//                        			}
//                        			
//                        		}
//                    			
//                    		}
//                    		var ret = axALLViewFileManagerCtlC1.MergeTIFFsInFolder(sFile, tempFolder);
//                    		if (ret == 0){
//                    			if (objCommUtil.ExistFolder(tempFolder)){
//                    				objCommUtil.FolderDelete(tempFolder);
//                    			}
//                    		}
//                		} 

                	}else{
                		axALLViewFileManagerCtlC1.SetImageFile =sFile;
                		var format = axALLViewFileManagerCtlC1.GetImageFormat;
                		if (format == 9){

                		}
                		console.log("format : " + format.toString());
                		var compress = axALLViewFileManagerCtlC1.GetImageCompress;
                		console.log("compress : " + compress.toString());
                		var imagePixel = axALLViewFileManagerCtlC1.GetBitPerPixel;
                		var j2kFlag = false;
                		if (compress == 34712 || compress == 34713 || compress == 33004 || compress == 34663){ //jpeg2000일 경우
                			j2kFlag = true;
                		} 
                		if (format == 1 || format == 2 || format == 3 || format == 4 || format == 5 || format == 6 || format == 7 || format == 8 ){ //이미지일 경우

            				if (imagePixel ==1 && format != 1){
            					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(sFile, sFile, 4, 1 ,1);
            				}else if (imagePixel !=1 && format != 1){
            					var ret = axALLViewFileManagerCtlC1.ConvertImageToTIFF(sFile, sFile, 7, 24, 100);
            				}
	
                		}
                	}
                	
                    var imgPath = sFile;

                    console.log("addThumbnail : " + imgPath);
    				axAllViewCtlC1.AddThumbnailFile(imgPath, objCommUtil.GetFileName(imgPath, false), imgPath);
    				$('#jqGrid').setCell(rowid,"imgPath",imgPath); 
    				console.log("setCell : rowid - " + rowid.toString() + " / imgPath : " + imgPath);
    				

                }
                
    			objCommUtil.xMaskDisConnect();
    		} 
    		else {	
    			
    			rowid ++;
    			var imgPath ="";
    			var elementId = item.elementid;
    			var elementIdMask = item.elementidMask;
    			var thumbFolder = "D:\\MaskPath\\Original\\";//지문
    			var unFolder = "D:\\MaskPath\\Masking\\UNMASK\\";
    			var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
    			var isOri = "O";
    			if (elementIdMask != null && elementIdMask != undefined && elementIdMask != "" && $("#selVerifyYn").val() != "3" && $("#selVerifyYn").val() != "4"){
    				var sFile = mskFolder + elementId + ".tif";
    				var targerElementId =  elementIdMask;
    				var sFolder = mskFolder;
    				isOri = "N";
    			}else{
    				var sFile = unFolder + elementId +"." +item.etc2;
    				var targerElementId =  elementId;
    				var sFolder = unFolder;
    				isOri = "O";
    			}

                if (!objCommUtil.ExistFolder(sFolder)){
                	objCommUtil.FolderCreate(sFolder);
                }
                if (targerElementId.length == 16){
                    imgPath = sFile;
        			$('#jqGrid').setCell(rowid,"imgPath",imgPath); 
        			console.log("setCell : rowid - " + rowid.toString() + " / imgPath : " + imgPath);
  
                }
                
    			var arrMaskPath = item.etc3.split("^");
    			var arrMaskRealPath = item.etc5.split("^");
    			if(arrMaskPath.length != 0) {
    				for(i=0; i<arrMaskPath.length-1; i++)
        			{
    					
    					var sFile = thumbFolder + objCommUtil.GetFileName(arrMaskRealPath[i], false)+ ".tif";
    					console.log("썸네일 이미지 : " + sFile);
    					
	    				var targerElementId =  arrMaskPath[i];
	    				var sFolder = thumbFolder;
    	    			
	    				if (!objCommUtil.ExistFolder(sFolder)){
	                    	objCommUtil.FolderCreate(sFolder);
	                    }
	                    if (targerElementId.length == 16 ){
	                    	if (!objCommUtil.ExistFile(sFile)){
	                    		console.log("썸네일 이미지 : " + sFile)
	                    		bResult = objCommUtil.xMaskImgDown(targerElementId, sFile, "N", XMASK_TARGET);       //다운로드 
	                    	}
	                    	
            				axAllViewCtlC1.AddThumbnailFile(sFile, objCommUtil.GetFileName(sFile, false), sFile);
            				console.log("setCell : rowid - " + rowid.toString() + " / imgPath : " + imgPath);	
	                    }
        			}
    				objCommUtil.xMaskDisConnect();
    			}
    		}
    	});

    	axAllViewCtlC1.ReDrawThumbnails();
    	axAllViewCtlC1.RedrawMainView();
    	setTimeout(objCommUtil.LoadingBarClose, 1000);
    };
    

    
    /**
     *  Function :  뷰어 이벤트 초기화 
     */	    
    function objectEventInit()
    {

    	if(window.attachEvent) {
    		//alert(1);
        	axAllViewCtlC1.attachEvent('OnThumbnailMouseEvent', function(thumbnailType, buttonType, thumbnailIndex, x, y){return MImgView_OnThumbnailMouseEvent(thumbnailType, buttonType, thumbnailIndex, x, y); });
        	axAllViewCtlC1.attachEvent('OnSelectedThumbnail', function(index){return MImgView_OnSelectedThumbnail(index); });
        	axAllViewCtlC2.attachEvent('OnSelectedImage', function(x, y, w, h) {
				return MImgView2_OnSelectedImage(x, y, w, h);
			});
        	axAllViewCtlC2.attachEvent('OnChangedPage', function(index) {
				return MImgView2_OnChangedPage(index);
			});
    	}    	
    	else if(window.addEventListener) {	//ie11 이벤트 처리안됨

        	axAllViewCtlC1.addEventListener("OnThumbnailMouseEvent", function(thumbnailType, buttonType, thumbnailIndex, x, y){return MImgView_OnThumbnailMouseEvent(thumbnailType, buttonType, thumbnailIndex, x, y); }, false);
        	axAllViewCtlC1.addEventListener("OnSelectedThumbnail", function(index){return MImgView_OnSelectedThumbnail(index); }, false);

    	}else{

    	}
    };
    

    function  MImgView2_OnChangedPage(index)
    {
    	currntPageIndex = index;
    	axAllViewCtlC1.focus();
    }
    
    /**
	 * Function : 뷰어 영역선택 이벤트(마스킹 버튼 클릭 시 SelectImageMode(이미지 선택 모드가 1일때)
	 */
	function MImgView2_OnSelectedImage(x, y, w, h) {

		var iMaskIndex; var iMaskCnt;
		var Rect = new Object(); // Left, Top, Right, Bottom
		var roundSize = new Object(); // cx, cy

		var iRet;
		var aType = 0, isSelected = 0, ObjectIndex = 0, BufferSize = 255; // 주석타입,선택여부,타입의인덱스값,버퍼크기
		var arriRect = new Array();
		var sFolder, sFileTmp;

		try {

			Rect.Left = Math.round(x);
			Rect.Top = Math.round(y);
			Rect.Right = Math.round(x + w);
			Rect.Bottom = Math.round(y + h);

			roundSize.cx = 0;
			roundSize.cy = 0;

			axAllViewCtlC2.AddBlackMarkBoxEx(Rect.Left, Rect.Top, Rect.Right,
					Rect.Bottom);
			axAllViewCtlC2.SetAnnotationSelectionMode = true;
			axAllViewCtlC2.UpdateMainWindow();
			
			axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC2.ImageFilePath;
			if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
				axAllViewCtlC2.SaveImage();	
			}
			

		} catch (e) {
			console.log(e.message);
			alert("마스킹오류 - 아래의 오류 내용을 확인 하시기 바랍니다.\n\n" + e.message);
		}
	};
	
    /**
     *  Function :  뷰어 마우스 이벤트 
     */	    
    function MImgView_OnThumbnailMouseEvent(thumbnailType, buttonType, thumbnailIndex, x, y){

    	//마우스 더블클릭 시
    	if(buttonType == 2) {
    		//필요할 시 구현
    	}
    };
    
    /**
     *  Function :  뷰어 썸네일선택 이벤트 
     */	    
    function MImgView_OnSelectedThumbnail(index){
    	console.log("MImgView_OnSelectedThumbnail 호출!");   
    	setGridSelectionByThumbnail(index);

    };
    
    /**
     *  그리드에서 선택된 썸네일이미지 파일명과 일치하는 행을 찾아 선택
     */	     
    var currentIndex;
    function setGridSelectionByThumbnail(index) {
		
    	var splitThu, arrSplitIdx, selIdx, sFile, arrFile, gridRowCnt, gridImgPath;
    	
    	splitThu = axAllViewCtlC1.GetSelectedThumbnailIndex;
    	arrSplitidx = splitThu.split("^^");
    	selIdx = parseInt(arrSplitidx[0]);

    	$("#jqGrid").jqGrid('resetSelection');
   	

    	sFile = axAllViewCtlC1.GetThumbnail_Link(index);          // 마스킹 대상 이미지 파일 가져오기
    	console.log("sFile : " + sFile);   
    	arrFile = objCommUtil.GetFileName(sFile, false).split("+");
    	
    	objCommUtil.gFun_Bar("이미지 로딩 중입니다.@@잠시만 기다려 주세요.");
    	
    	if(arrFile.length > 0) {
    		objCommUtil.xMaskDisConnect();
    		var multiThumbnailIndex = undefined;
    		console.log("arrFile[0] : " + arrFile[0]);
    		var multiList = arrFile[0].split("_"); 
    		console.log("multiList[0] : " + multiList[0]);
    		if (multiList.length > 1){
    			multiThumbnailIndex = parseInt(multiList[1]);
    			
    			arrFile = multiList[0].split(".");
        		sFile=arrFile[0];
    			
    		}else{
    			arrFile = arrFile[0].split(".");
        		sFile=arrFile[0];
    		}
    		
    		console.log("sFile : " + sFile);
    		gridRowCnt = $("#jqGrid").getGridParam("reccount");
    		var idArry = $("#jqGrid").jqGrid('getDataIDs');
    		console.log("gridRowCnt : " + gridRowCnt);   
    		console.log("idArry : " + JSON.stringify(idArry));   
    		for(i=1; i<=gridRowCnt; i++) {
    			gridImgPath = $("#jqGrid").jqGrid('getRowData',i).imgPath;   
    			console.log("gridImgPath : " + gridImgPath);    	
    			
    			if(!modComm.isEmpty(gridImgPath) && gridImgPath.indexOf(sFile) != -1) {

    				console.log("setSelection : " + i.toString());
    				if(selectByGrid){
    					selectByGrid = false;
    				}else{
    					$("#jqGrid").jqGrid("setSelection", i);
    				}
    				

    				if (index != undefined){
    					MultiThumbnailIndex = index; //중간뷰어 인덱스 저장
    				}
    					
        			var imgPath ="";
        			var elementId = $("#jqGrid").jqGrid('getRowData',i).elementid;
        			var elementIdMask = $("#jqGrid").jqGrid('getRowData',i).elementidMask;
        			var maskPrgStsc = $("#jqGrid").jqGrid('getRowData',i).maskPrgStsc;
        			var sExt = $("#jqGrid").jqGrid('getRowData',i).etc2;
        			var crtDt = $("#jqGrid").jqGrid('getRowData',i).crtDt;
        			if (maskPrgStsc != "80" ){ //
        				$("#btnMasking").prop("disabled", true);
        				$("#btnMaskingCancel").prop("disabled", true);
        				//$("#btnVerity").prop("disabled", true);
        				
        			}
        			else{
        				$("#btnMasking").prop("disabled", false);
        				$("#btnMaskingCancel").prop("disabled", false);
        				//$("#btnVerity").prop("disabled", false);
        			}
        			
        			var thumbFolder = "D:\\MaskPath\\Original\\";//지문
        			var unFolder = "D:\\MaskPath\\Masking\\UNMASK\\";
        			var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
        			var isOri = "O";
        			if (elementIdMask != null && elementIdMask != undefined && elementIdMask != "" && $("#selVerifyYn").val() != "3" && $("#selVerifyYn").val() != "4"){
        				var sFile = mskFolder + elementId + ".tif";
        				var targerElementId =  elementIdMask;
        				var sFolder = mskFolder;
        				isOri = "N";

        			}else{
        				var sFile = unFolder + elementId +"."+sExt;
        				var targerElementId =  elementId;
        				var sFolder = unFolder;
        				isOri = "O";
        				
        			}
        			$('#jqGrid').setCell(i,"imgPath",sFile);
        			gridImgPath = sFile;
        			
        			console.log("sFile : " + sFile);    
                    if (!objCommUtil.ExistFolder(sFolder)){
                    	objCommUtil.FolderCreate(sFolder);
                    }
                    if (targerElementId.length == 16){
                    	
                    	if ((isOri == "O" &&  (crtDt >= CONVERTDAY)) || $("#selVerifyYn").val() == "3" || $("#selVerifyYn").val() == "4"){
                    		if (!objCommUtil.ExistFile(sFile)){
                    			bResult = objCommUtil.xMaskImgDown(targerElementId, sFile,"V",XMASK_TARGET);   //다운로드    
                    			
                            }
                			
                		}else {
                			if (!objCommUtil.ExistFile(sFile)){
                				bResult = objCommUtil.xMaskImgDown(targerElementId, sFile, isOri,XMASK_TARGET);   //다운로드    

                            }
                			
                		}
                		
                    }
                    axALLViewFileManagerCtlC1.SetImageFile = sFile;
                    var format = axALLViewFileManagerCtlC1.GetImageFormat;
                    if (format == 9){

            			var newSfile = sFile.replace("." +sExt,".tif");
            			if (!objCommUtil.ExistFile(newSfile)){
            				var iRet = axALLViewFileManagerCtlC1.ConvertPDF2TIFF(sFile,newSfile,3.0,7,100);
            				//alert(iRet);
            				if(iRet==0){
            					sFile = newSfile;
            				}
            			}
            			
            			
            			axALLViewFileManagerCtlC1.SetImageFile = sFile;
            			$('#jqGrid').setCell(i,"imgPath",sFile);
            			gridImgPath = sFile;
            		}

    				axAllViewCtlC2.ImageFilePath =  gridImgPath;
    				axAllViewCtlC2.DrawImage();

    				if (multiThumbnailIndex != undefined){
    					axAllViewCtlC2.SelectMultiPageThumbnailbyIndex(multiThumbnailIndex-1);
    				}

    			}
    		}

    	}   
    	objCommUtil.xMaskDisConnect();
    	console.log("axAllViewCtlC1.focus()");
    	axAllViewCtlC1.focus();
    	axAllViewCtlC1.RedrawThumbnails();
    	setTimeout(objCommUtil.LoadingBarClose, 1000);
    }    
    
    /**
     *  Function :  썸네일 사이즈 변경적용
     */	    
    function setThumbnailSize()
    {
    	axAllViewCtlC1.setThumbnailsViewFrameSize = $("#selThumbnailSize").val();
    	axAllViewCtlC1.RedrawMainView();
    };    
	
	return {
		init: init,
		selList: selList,
		selListPage: selListPage,
		excelWrite: excelWrite,		
		objectInit: objectInit,		
		objectEventInit:objectEventInit,
		setThumbnailSize: setThumbnailSize		
	};

})();


/**
 * 마스킹 저장
 */
function ImgMasking() {
	
	if (!confirm("해당 영역에 수동 마스킹을 진행하시겠습니까?")) {
		return;
	} else {

		$("#btnMasking").prop("disabled", true);
		
		var selRowid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
		if(selRowid != undefined && selRowid > 0) {
        	var sThumbnailPath = $("#jqGrid").jqGrid('getRowData',selRowid).etc5;
        	var sMaskEID = $("#jqGrid").jqGrid('getRowData',selRowid).elementidMask;
        	var sThumbnail = $("#jqGrid").jqGrid('getRowData',selRowid).etc3;
        	var sOrigin = $("#jqGrid").jqGrid('getRowData',selRowid).imgPath;
        	var sEID = $("#jqGrid").jqGrid('getRowData',selRowid).elementid;
        	var sIDXID = $("#jqGrid").jqGrid('getRowData',selRowid).idxId;
        	var sJobID = $("#jqGrid").jqGrid('getRowData',selRowid).edmsJobCfcd;
        	var sServer = $("#jqGrid").jqGrid('getRowData',selRowid).maskSvrnm;
        	var sAgent= $("#jqGrid").jqGrid('getRowData',selRowid).maskAgent; 
		} 
		
		console.log("sEID: " +sEID);
		console.log("elementid: " +$("#jqGrid").jqGrid('getRowData',selRowid).elementid);
		if (axAllViewCtlC2.ImageFilePath != "")			
			gFunImgMasking(sOrigin, sMaskEID, sIDXID, sEID, sJobID, sThumbnail, sThumbnailPath, sServer,sAgent ); // 이미지 마스킹

		$("#btnMasking").prop("disabled", false);
	}
}
;

/**
 * 마스킹취소
 */
function MaskingCancel() {
	if (!confirm("기 마스킹 이미지를 원상복귀 진행하시겠습니까?")){
		return;
} else{ 
		
		$("#btnMaskingCancel").prop("disabled", true);
		var objCommUtil = document.getElementById("CommUtil");
		var selRowid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
		if(selRowid != undefined && selRowid > 0) {
        	var sEID = $("#jqGrid").jqGrid('getRowData',selRowid).elementid;
        	var sEIDMSK = $("#jqGrid").jqGrid('getRowData',selRowid).elementidMask;
        	var sJobID = $("#jqGrid").jqGrid('getRowData',selRowid).edmsJobCfcd;
        	var sServer = $("#jqGrid").jqGrid('getRowData',selRowid).maskSvrnm;
        	var sAgent= $("#jqGrid").jqGrid('getRowData',selRowid).maskAgent;
        	var resultThumb = $("#jqGrid").jqGrid('getRowData',selRowid).etc3;
        	var gThumb = $("#jqGrid").jqGrid('getRowData',selRowid).etc5;
        	var afterFpCN = $("#jqGrid").jqGrid('getRowData',selRowid).fpCn;
		} 

		if (afterFpCN != 0){
			var result;
			//DB 정보 업데이트 
			if (resultThumb != undefined && resultThumb != null){
				for (var i = 0; i < resultThumb.length-1; i++){
					console.log("resultThumb[i] : " + resultThumb[i]);
					
					result = objCommUtil.xMaskImgRemoveNew(resultThumb[i],XMASK_TARGET);
				}
			}
			if (sEIDMSK != undefined && sEIDMSK != null && sEIDMSK != "") {
				result	= objCommUtil.xMaskImgRemoveNew(sEIDMSK,XMASK_TARGET);
			} 
			ImageManualMaskingResultSave(sEID, "",gThumb,"",resultThumb,0,true,0,sJobID,sServer,sAgent);
		}else{
			//setTimeout(objCommUtil.LoadingBarClose, 1000);
			alert("지문추가 및 삭제,이동 등 수정작업 이후 저장해주시기 바랍니다.");
		}
		

		$("#btnMaskingCancel").prop("disabled", false);
		
		
	} 
}
;

/**
 * 마스킹 취소
 */
function gFunImgMaskingCancel(gOrigin, gMaskEID, gIDXID, gEID, gJobID, gThumbnail) {
	var objCommUtil = document.getElementById("CommUtil");
	//로딩바 시작
	objCommUtil.gFun_Bar("이미지 복원 중입니다.@@잠시만 기다려 주세요.");

	var selRowid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
	if(selRowid != undefined && selRowid > 0) {
    	var sJobID = $("#jqGrid").jqGrid('getRowData',selRowid).edmsJobCfcd;
    	var sServer = $("#jqGrid").jqGrid('getRowData',selRowid).maskSvrnm;
    	var sAgent= $("#jqGrid").jqGrid('getRowData',selRowid).maskAgent;

	} 
		//DB 정보 업데이트 
		ImageManualMaskingResultSave(gEID, "","","","",0,true,0,sJobID,sServer,sAgent);


};

/**
 * 검증버튼 클릭
 */
function ImgVerify() {
	
	if (!confirm("대상 건을 검증하시겠습니까?")) {
		return;
	} else {
		var objCommUtil = document.getElementById("CommUtil");
		
		//로딩바 시작
		objCommUtil.gFun_Bar("이미지 전송 중입니다.@@잠시만 기다려 주세요.");
		$("#btnVerity").prop("disabled", true);
		var ids = $("#jqGrid").jqGrid('getGridParam', 'selarrrow');
		
		for (var i = 0; i < ids.length; i++){
			var rowObject = $("#jqGrid").getRowData(ids[i]);
			var gThumb = rowObject.etc5;
        	var sMaskEID = rowObject.elementidMask;
        	var sThumbnail = rowObject.etc3;
        	var sOrigin = rowObject.imgPath;
        	var sEID = rowObject.elementid;
        	var sIDXID = rowObject.idxId;
        	var sJobID = rowObject.edmsJobCfcd;
        	var sServer = rowObject.maskSvrnm;
        	var sAgent= rowObject.maskAgent;
        	var gridImgPath  = rowObject.imgPath;  
        	var sImgMaskCountInfo = rowObject.imgMaskCountInfo;
        	var sExt = rowObject.etc2;
        	var sMaskPrgStsc =  rowObject.verifySts;
        	var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
        	
        	
        	if (sMaskPrgStsc == "미검증"){
        		$('#jqGrid').setCell(ids[i],"verifySts","검증완료"); 
	        	if (sMaskEID != undefined && sMaskEID != "" && sMaskEID !=null ){
	        		gridImgPath = mskFolder + sEID + ".tif";
	        		if (!objCommUtil.ExistFile(gridImgPath)){
	            		bResult = objCommUtil.xMaskImgDown(sMaskEID, gridImgPath, "N",XMASK_TARGET);   //다운로드    
	            	}
	            	console.log(gridImgPath);
	            	axAllViewCtlC2.ImageFilePath =  gridImgPath;
	            	axAllViewCtlC2.DrawImage();
	            	
	            	if (axAllViewCtlC2.ImageFilePath != ""){
	            		var isVerify = gFunImgVerifying(sOrigin, sMaskEID,gThumb, sIDXID, sEID, sJobID, sThumbnail, sImgMaskCountInfo, sExt); // 이미지 마스킹
	            		if (isVerify){

	            			ImageManualMaskingVerifySave(sEID,sMaskEID,gThumb,axAllViewCtlC2.ImageFilePath,sThumbnail,sImgMaskCountInfo, false, sJobID,sServer,sAgent);
	            		}
	            	}
	        	}else{
	        		ImageManualMaskingVerifySave(sEID,"",gThumb,"",sThumbnail,0, false, sJobID,sServer,sAgent);
	        	}
        	
        	}
        	
		}
	
		$("#btnVerity").prop("disabled", false);
		
		setTimeout(objCommUtil.LoadingBarClose, 1000);
		alert("검증 완료하였습니다.");
	}
}
;

/**
 * 검증 적용
 */
function gFunImgVerifying(gOrigin, gMaskEID, gThumb,gIDXID, gEID, gJobID, gThumbnail, sImgMaskCountInfo, sExt) {

	//멀티페이지 여부부터 체크 시작
	axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC2.ImageFilePath;

	var axAllViewCtlC3 = document.getElementById("MImgView3"); 
	axAllViewCtlC3.ImageFilePath = axAllViewCtlC2.ImageFilePath;
	axAllViewCtlC3.DrawImage();
	axAllViewCtlC3.MergeBlackMaskImageMode = true;
	axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC3.ImageFilePath;
	if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
		for (var i = 0; i < axALLViewFileManagerCtlC1.GetImagePageCount; i++) {
			
			axAllViewCtlC3.SelectMultiPageThumbnailbyIndex(i);
			var iMaskCnt = axAllViewCtlC3.getAnnotationCountByType(1);
			if (iMaskCnt > 0){
				axAllViewCtlC3.SaveImage();
			}
			
		}
	} else {
		axAllViewCtlC3.SaveImage();
	}
	

	axAllViewCtlC3.MergeBlackMaskImageMode = false;
	var objCommUtil = document.getElementById("CommUtil");
	if (gMaskEID != undefined && gMaskEID != ""){
		console.log(sExt);
		axALLViewFileManagerCtlC1.SetImageFile =axAllViewCtlC3.ImageFilePath;
		var format = axALLViewFileManagerCtlC1.GetImageFormat;
		var compress = axALLViewFileManagerCtlC1.GetImageCompress;
		var imagePixel = axALLViewFileManagerCtlC1.GetBitPerPixel;
		

		if (sExt.toUpperCase() == 'PDF' ){ //PDF일 경우

			var origin  = axAllViewCtlC3.ImageFilePath;
			var newSfile = origin.replace(".tif",".pdf");

			var uploadFilePath = newSfile;

			//var iRet = axALLViewFileManagerCtlC1.ConvertTiff2Pdf(origin, uploadFilePath);
			//if (iRet == 0){
			//	objCommUtil.xMaskImgReplace(gMaskEID,uploadFilePath,XMASK_TARGET);
			//}else{
				objCommUtil.xMaskImgReplace(gMaskEID,origin,XMASK_TARGET);
				//alert("PDF 변환에 실패하였습니다. 관리자 문의 바랍니다.")
    		//}
  
    		var nFile = uploadFilePath;
    	}else{
    		var origin  = objCommUtil.GetFileName(axAllViewCtlC3.ImageFilePath, true);
    		var replaceFile  = objCommUtil.GetFileName(axAllViewCtlC3.ImageFilePath, false);
    		var uploadFilePath = axAllViewCtlC3.ImageFilePath.replace(origin, replaceFile +"."+sExt);
			objCommUtil.xMaskImgReplace(gMaskEID,uploadFilePath,XMASK_TARGET);
			var nFile = uploadFilePath;
		}
		
		
		axAllViewCtlC2.ImageFilePath = "";
		axAllViewCtlC2.DrawImage();
	
		axAllViewCtlC2.ClearThumbnails();
		axAllViewCtlC2.RemoveTempFolder();
	
		axAllViewCtlC2.ImageFilePath = nFile;
		axAllViewCtlC2.DrawImage();
	
		
        return true
		
	}else {

		return false;
	}

};


/**
 * DB업데이트(진행단계) 및 마스킹개수 적재
 */
function ImageManualMaskingVerifySave(strElementID,strElementMSKID,gThumb,gMaskFile,resultThumb,sImgMaskCountInfo, isRollBack, sJobID,sServer,sAgent) {
	

	
	if (strElementMSKID != undefined && strElementMSKID != "" && strElementMSKID!=null ){
		var stsc = "90";
	}else{
		var stsc = "95";
	}

	var objParam = {
	
		"elementid" : strElementID,
		"elementidMask" : strElementMSKID,
		"etc3" : resultThumb,
		"maskPrgStsc" : stsc,
		"chgEno" : $("#txtLoginchrrId", parent.document).val(),
		"rgEno" : $("#txtLoginchrrId", parent.document).val()
	};

	if (isRollBack == true) {
		objParam.etc3 = resultThumb;
		objParam.etc4 = "";
		objParam.etc5 = gThumb;
		objParam.imgMaskCountInfo = 0;
	} else {
		objParam.etc3 = resultThumb;
		objParam.etc4 = gMaskFile;
		objParam.etc5 = gThumb;
		objParam.imgMaskCountInfo = sImgMaskCountInfo;
	}
	

	// 지문마스킹대상 수정
	modAjax.request("/dpm/updFpMaskObj.do", objParam, {
		 async: false,
		success : function(cnt) {
			//setTimeout(objCommUtil.LoadingBarClose, 1000);

			objParam = {};
			objParam.elementid = strElementID;
			objParam.etc1 = stsc;
			objParam.maskSvrnm = sServer; // NetBIOS 이름?
			objParam.maskAgent = sAgent; // 활성화된 프로세스이름?
			objParam.prcmnEno = $("#txtLoginchrrId", parent.document).val();
			objParam.edmsJobCfcd =  sJobID;
			modAjax.request("/dpm/insFpMaskHis.do", objParam, {
				async: false,
				success : function(cnt) {
					console.log("히스토리성공");
				},
				error : function(cnt) {
					console.log(cnt);
				}
			});
		},
		error : function(cnt) {
			console.log(cnt);
			//setTimeout(objCommUtil.LoadingBarClose, 1000);

		}
	});



}
;

function pad (n, width ){
	n = n+ '';
	return n.length >= width ? n: new Array(width - n.length +1).join('0')+n;
}

/**
 * 마스킹 적용
 */
function gFunImgMasking(gOrigin, gMaskEID, gIDXID, gEID, gJobID, gThumbnail, gThumbnailPath,sServer,sAgent){
	console.log("gEID : " + gEID);
	var objCommUtil = document.getElementById("CommUtil");
	//로딩바 시작
	objCommUtil.gFun_Bar("이미지 전송 중입니다.@@잠시만 기다려 주세요.");
	try {
		
	
		//멀티페이지 여부부터 체크 시작
		axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC2.ImageFilePath;
		
		var objCommUtil = document.getElementById("CommUtil");
		var axAllViewCtlC3 = document.getElementById("MImgView3"); 
		//console.log("마스킹 카운트 : " + iMaskCnt); 
		var sname = "";
		var IMG_PATH = "";
		var isOverwrite = false;
	
		var fpath = "D:\\MaskPath\\Masking\\MASK";
		console.log("fpath : " + fpath);
		IMG_PATH = axAllViewCtlC2.ImageFilePath;
		console.log("IMG_PATH : " + IMG_PATH); 
		var multiImageCount = 1;

		var format = axALLViewFileManagerCtlC1.GetImageFormat;
		console.log("format : " + format.toString());

		
		if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
			multiImageCount = axALLViewFileManagerCtlC1.GetImagePageCount;
			axAllViewCtlC2.SaveImage();
		} else {
			
			axAllViewCtlC2.SaveImage(); // cws
		}
		var dirPath = objCommUtil
				.GetFolderName(axAllViewCtlC2.ImageFilePath);
		var oname = IMG_PATH.replace(dirPath, fpath);
		console.log("oname : " + oname); 
		
		//폴더 없을 시 생성
		if (!objCommUtil.ExistFolder(fpath)){
	     	objCommUtil.FolderCreate(fpath);
	    }
		
		//파일 덮어씌움
		if (IMG_PATH != oname){
			objCommUtil.FileMove(IMG_PATH, oname, true);
			axAllViewCtlC2.ImageFilePath = oname;
			axAllViewCtlC2.DrawImage();
		}
		
		isOverwrite = true;
		
		gMaskFile = oname;

		console.log("gMaskFile : " + gMaskFile); 
		
		var spath = "D:\\MaskPath\\Original";
		IMG_PATH = axAllViewCtlC2.ImageFilePath;

		var dirPath = objCommUtil.GetFolderName(IMG_PATH);
		sname = IMG_PATH.replace(dirPath, spath);
		console.log("sname : " + sname); 
		var purename = objCommUtil.GetFileName(sname, false);
		var maskPageCount = 0;
		console.log("GetImagePageCount : " + axALLViewFileManagerCtlC1.GetImagePageCount); 

		if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
			var sSplitOrignalPath = spath + "\\"+purename;
	        console.log("sSplitOrignalPath : " + sSplitOrignalPath); 
	        console.log("purename : " + purename); 
	        if (!objCommUtil.ExistFolder(sSplitOrignalPath)){
	             objCommUtil.FolderCreate(sSplitOrignalPath);
	        }
	        console.log("axAllViewCtlC2.ImageFilePath : " + axAllViewCtlC2.ImageFilePath);
	        
	        axALLViewFileManagerCtlC1.SplitMultipageTIFFFile(axAllViewCtlC2.ImageFilePath, sSplitOrignalPath, purename);
	        var thumbList = "";
			for (var i = 0; i < multiImageCount; i++) {
				// 원본이미지 split 폴더        		     
		        var pageName = sSplitOrignalPath +"\\"+ purename + "_"+pad((i+1),5).toString() + ".tif";

				console.log("pageName : " + pageName);

				axAllViewCtlC3.ImageFilePath = pageName;
				axAllViewCtlC3.DrawImage();
				console.log("axAllViewCtlC3.ImageFilePath : " + axAllViewCtlC3.ImageFilePath);
				var iMaskCnt = axAllViewCtlC3.getAnnotationCountByType(1); //마스킹 주석의 갯수만 불러옴
				console.log("iMaskCnt: " + iMaskCnt.toString());
				var jsonString = axAllViewCtlC3.getAnnotationJSONData(axAllViewCtlC3.ImageFilePath, 0); //주석정보 JsonString으로 호출
				var objJson = JSON.parse(jsonString);
				
				var annotList = objJson["annotation"];
				var rect =[];
				if (annotList != undefined){
					for (var j = 0; j<annotList.length; j++){
						if (annotList[j].type == "rect"){
							if (annotList[j].blackmask ==  true){
								rect.push(annotList[j]);
							} 
						}
					}
				}
				
				
				console.log("sname : " + sname); 
				purename2 = objCommUtil.GetFileName(pageName, false);
				if( iMaskCnt > 0){
					maskPageCount++;
				}
				for(var j = 0; j< iMaskCnt; j++){

					var sname2 = pageName.replace(sSplitOrignalPath +"\\"+purename2, spath + "\\"+purename2 + "+"+(j+1).toString());
					
					console.log("sname2 : " + sname2);

					var path = axAllViewCtlC2.ImageFilePath;
					axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC2.ImageFilePath;
					axALLViewFileManagerCtlC1.SavePartofImagetoJpegFile(pageName,0,sname2,
							Math.round(rect[j].left), Math.round(rect[j].top), Math.round(rect[j].width), Math
							.round(rect[j].height));
					
					thumbList += sname2 + "^";
					
						
				}
				
			}
			gThumb = thumbList;
			console.log("gThumb : " + gThumb);
			if (objCommUtil.ExistFolder(sSplitOrignalPath)){
				objCommUtil.FolderDelete(sSplitOrignalPath);
			}
			
		}else {
			var iMaskCnt = axAllViewCtlC2.getAnnotationCountByType(1); //마스킹 주석의 갯수만 불러옴

			var jsonString = axAllViewCtlC2.getAnnotationJSONData(axAllViewCtlC2.ImageFilePath, 0); //주석정보 JsonString으로 호출

			var objJson = JSON.parse(jsonString);
			var annotList = undefined;
			annotList = objJson["annotation"];
			var rect =[];
			
			if (annotList != undefined){
				for (var j = 0; j<annotList.length; j++){
					if (annotList[j].type == "rect"){
						if (annotList[j].blackmask ==  true){
							rect.push(annotList[j]);
						} 
					}
				}
			}
			
			if( iMaskCnt > 0){
				maskPageCount++;
			}
			var thumbList = "";
			console.log("sname : " + sname); 
			for(var j = 0; j< iMaskCnt; j++){
				//sname = IMG_PATH.replace(dirPath, spath);
				
				purename2 = objCommUtil.GetFileName(sname, false);
				sname2 = sname.replace(purename2, purename2 + "+"+(j+1).toString());
				console.log("sname : " + sname); 
				console.log("sname2 : " + sname2); 

				axALLViewFileManagerCtlC1.SetImageFile = IMG_PATH;
				console.log(IMG_PATH);
				axALLViewFileManagerCtlC1.SavePartofImagetoJpegFile(IMG_PATH,0,sname2,
						Math.round(rect[j].left), Math.round(rect[j].top), Math.round(rect[j].width), Math
						.round(rect[j].height));
	
				thumbList += sname2 + "^";
	
			}
			gThumb = thumbList;
		}

		if (gMaskEID != undefined && gMaskEID != ""){
			objCommUtil.xMaskImgReplace(gMaskEID,gMaskFile,XMASK_TARGET);
			if (objCommUtil.ExistFile(gMaskFile)){
				//objCommUtil.FileDelete(gMaskFile);
			}
		}else {
			var result = objCommUtil.xMaskImgSendNew(gMaskFile,XMASK_TARGET);
			if (result != ""){
				gMaskEID = result;
				if (objCommUtil.ExistFile(gMaskFile)){
					//objCommUtil.FileDelete(gMaskFile);
				}
			}
			
		}
		var resultThumb = "";
		var uploadThumbList = gThumb.split("^");
		var oldThumbList  =  gThumbnailPath.split("^");
		var oldThumbEIDList = gThumbnail.split("^");
		if (uploadThumbList != undefined && uploadThumbList != null){
			for (var i = 0; i < uploadThumbList.length-1; i++){
				console.log("uploadThumbList[i] : " + uploadThumbList[i]);
				var result = objCommUtil.xMaskImgSendNew(uploadThumbList[i],XMASK_TARGET);
				if (result != ""){
					resultThumb += result + "^";
				}
				if (objCommUtil.ExistFile(uploadThumbList[i])){
					//objCommUtil.FileDelete(uploadThumbList[i]);
				}
			}
		}
		if (oldThumbList != undefined && uploadThumbList != null){
			for (var i = 0; i < oldThumbList.length-1; i++){
				console.log("oldThumbList[i] : " + oldThumbList[i]);
				if (objCommUtil.ExistFile(oldThumbList[i])){

					objCommUtil.FileDelete(oldThumbList[i]);
				}
			}
		}


		var fpCn = 0;
		if (uploadThumbList != undefined && uploadThumbList.length > 1){
			fpCn = uploadThumbList.length -1 ;
		}
		
		if (fpCn != 0){
			if (oldThumbEIDList != undefined && oldThumbEIDList != null){
				for (var i = 0; i < oldThumbEIDList.length-1; i++){
					console.log("oldThumbEIDList[i] : " + oldThumbList[i]);
					var result = objCommUtil.xMaskImgRemoveNew(oldThumbEIDList[i],XMASK_TARGET);
				}
			}
			ImageManualMaskingResultSave(gEID, gMaskEID,gThumb,gMaskFile,resultThumb,fpCn,false,maskPageCount,gJobID,sServer,sAgent);
		}else {
			
			if (gMaskEID != undefined && gMaskEID != null && gMaskEID != "") {
				result	= objCommUtil.xMaskImgRemoveNew(gMaskEID,XMASK_TARGET);
			} 
			
			var afterFpCN = 0;
			var selRowid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
			if(selRowid != undefined && selRowid > 0) {
	        	afterFpCN = $("#jqGrid").jqGrid('getRowData',selRowid).fpCn;
			} 

			if (afterFpCN != 0){
				ImageManualMaskingResultSave(gEID, "",gThumbnailPath,"",gThumbnail,0,true,maskPageCount,gJobID,sServer,sAgent);
			}else{
				setTimeout(objCommUtil.LoadingBarClose, 1000);
				alert("지문추가 및 삭제,이동 등 수정작업 이후 저장해주시기 바랍니다.");
			}
			
			
		}
		
		

		//DB 정보 업데이트 
		
	} catch (e) {

		console.log(e.message);
		setTimeout(objCommUtil.LoadingBarClose, 1000);
		alert("마스킹오류 - 아래의 오류 내용을 확인 하시기 바랍니다.\n\n" + e.message);
	}

};
	/**
	 * DB업데이트(진행단계) 및 마스킹개수 적재
	 */
	function ImageManualMaskingResultSave(strElementID,strElementMSKID,gThumb,gMaskFile,resultThumb,intFpCn, isRollBack, maskPageCount, gJobID,sServer,sAgent) {
		
		var selRowid = $("#jqGrid").jqGrid('getGridParam', 'selrow');
		
		if(selRowid != undefined && selRowid > 0) {
        	$('#jqGrid').setCell(selRowid,"elementid",strElementID); 
        	$('#jqGrid').setCell(selRowid,"etc3",resultThumb); 
        	$('#jqGrid').setCell(selRowid,"maskPrgStsc","80"); 
        	$('#jqGrid').setCell(selRowid,"chgEno",$("#txtLoginchrrId", parent.document).val()); 
        	$('#jqGrid').setCell(selRowid,"rgEno",$("#txtLoginchrrId", parent.document).val()); 
        	
        	if (isRollBack == true) {
        		$('#jqGrid').setCell(selRowid,"etc1","S");
        		//$('#jqGrid').setCell(selRowid,"etc3",""); 
        		$('#jqGrid').setCell(selRowid,"etc3",resultThumb);
        		$('#jqGrid').setCell(selRowid,"etc4",""); 
        		//$('#jqGrid').setCell(selRowid,"etc5",""); 
        		$('#jqGrid').setCell(selRowid,"etc5",gThumb);
        		$('#jqGrid').setCell(selRowid,"fpCn",0); 
        		$('#jqGrid').setCell(selRowid,"imgMaskCountInfo",0); 
        		$('#jqGrid').setCell(selRowid,"elementidMask",null); 

    		} else {
    			
    			$('#jqGrid').setCell(selRowid,"etc1","S");
        		$('#jqGrid').setCell(selRowid,"etc3",resultThumb); 
        		$('#jqGrid').setCell(selRowid,"etc4",gMaskFile); 
        		$('#jqGrid').setCell(selRowid,"etc5",gThumb); 
        		$('#jqGrid').setCell(selRowid,"fpCn",intFpCn); 
        		$('#jqGrid').setCell(selRowid,"imgMaskCountInfo",maskPageCount); 
        		$('#jqGrid').setCell(selRowid,"elementidMask",strElementMSKID); 
  

    		}

		}  

		var objParam = {
		
			"elementid" : strElementID,
			"etc3" : resultThumb,
			"maskPrgStsc" : "80",
			"chgEno" : $("#txtLoginchrrId", parent.document).val(),
			"rgEno" : $("#txtLoginchrrId", parent.document).val()
		};

		if (isRollBack == true) {
			objParam.etc1 = "S";
			objParam.etc3 = resultThumb;
			objParam.etc4 = "";
			objParam.etc5 = gThumb;
			objParam.fpCn = 0;
			objParam.imgMaskCountInfo = 0;
			objParam.elementidMask = "";
		} else {
			objParam.etc1 = "S";
			objParam.etc3 = resultThumb;
			objParam.etc4 = gMaskFile;
			objParam.etc5 = gThumb;
			objParam.fpCn = intFpCn; //마스킹썸네일 갯수만큼 . 썸네일갯수=이미지정보수
			objParam.imgMaskCountInfo = maskPageCount;
			objParam.elementidMask = strElementMSKID;
		}
		

		// 지문마스킹대상 수정
		modAjax.request("/dpm/updFpMaskObj.do", objParam, {
			// async: false,
			success : function(cnt) {

			},
			error : function(cnt) {
				console.log(cnt);
			}
		});

		// 지문마스킹이력 등록
		objParam.edmsJobCfcd = gJobID;
		objParam.etc1 = "80";
		objParam.maskSvrnm = sServer;
		objParam.maskAgent = sAgent; 
		objParam.prcmnEno = $("#txtLoginchrrId", parent.document).val();
		var objCommUtil = document.getElementById("CommUtil");
		modAjax.request("/dpm/insFpMaskHis.do", objParam, {
			// async: false,
			success : function(cnt) {
				setTimeout(objCommUtil.LoadingBarClose, 1000);
				alert("변경사항을 저장하였습니다.");
				if($("#selCategory").val() != "5") {
					var axAllViewCtlC1 = document.getElementById("MImgView");
			    	var splitThu = axAllViewCtlC1.GetSelectedThumbnailIndex;
			    	var arrSplitidx = splitThu.split("^^");
			    	var selIdx = parseInt(arrSplitidx[0]);
			    	onSelistfinger = selIdx;
			    	
			    	console.log("selIdx :"+selIdx)
					var curPage  = $("#jqGrid").getGridParam("page");
					var pageSize = $("#jqGridPager").find("select.ui-pg-selbox option:selected").val();
					
					modDpm1010.selListPage(curPage,pageSize);
					
					
				}
				
			},
			error : function(cnt) {
				// console.log(cnt);
				setTimeout(objCommUtil.LoadingBarClose, 1000);
			}
		});

	}
	;
 
	function fnDestroyThemAll(){
		try
		{
			// 작업폴더 삭제
			var spath = "D:\\MaskPath\\Original\\";
			var unFolder = "D:\\MaskPath\\Masking\\UNMASK\\";
			var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
			var objCommUtil = document.getElementById("CommUtil");
			if (objCommUtil.ExistFolder(spath)){
				objCommUtil.FolderDelete(spath,true);
			}
			if (objCommUtil.ExistFolder(unFolder)){
				objCommUtil.FolderDelete(unFolder,true);
			}
			if (objCommUtil.ExistFolder(mskFolder)){
				objCommUtil.FolderDelete(mskFolder,true);
			}
		}
		catch(e)
		{
			console.log(e);
		}

		
	};
	
	function fnCreateThemAll(){
		try
		{
			// 작업폴더 삭제
			var rootPath = "D:\\MaskPath\\";
			var spath = "D:\\MaskPath\\Original\\";
			var unFolder = "D:\\MaskPath\\Masking\\UNMASK\\";
			var mskFolder = "D:\\MaskPath\\Masking\\MASK\\";
			var objCommUtil = document.getElementById("CommUtil");
			if (!objCommUtil.ExistFolder(rootPath)){
				objCommUtil.FolderCreate(rootPath);
			}
			if (!objCommUtil.ExistFolder(spath)){
				objCommUtil.FolderCreate(spath);
			}
			if (!objCommUtil.ExistFolder(unFolder)){
				objCommUtil.FolderCreate(unFolder);
			}
			if (!objCommUtil.ExistFolder(mskFolder)){
				objCommUtil.FolderCreate(mskFolder);
			}
		}
		catch(e)
		{
			console.log(e);
		}

		
	};
	
	function chngFpExist(selectedVal)
	{

		if (selectedVal == 9 || selectedVal ==  4 ){

			$("#selCategory").val(5);
			$("#selCategory").attr("disabled",true);

		}else{
			$("#selCategory").val(1);
			$("#selCategory").attr("disabled",false);
		}
	};
	function chngVerifyYn(selectedVal)
	{

		if (selectedVal == 3 || selectedVal ==  4 ){

			$("#selCategory").val(5);
			$("#selCategory").attr("disabled",true);

		}else{
			//$("#selCategory").val(1);
			$("#selCategory").attr("disabled",false);
		}
	};



$("#selFpExistYn").on("change", function() {
	
	var selectedVal = $("#selFpExistYn").val();
	chngFpExist(selectedVal);
});
	
$("#selVerifyYn").on("change", function() {
	
	var selectedVal = $("#selVerifyYn").val();
	chngVerifyYn(selectedVal);
});
	
/**
 * 조회버튼 클릭
 */
$("#btnSearch").on("click", function() {
	//console.log("조회버튼 클릭");
	modDpm1010.selList();
});

/**
 * 엑셀버튼 클릭
 */
$("#btnExcel").on("click", function() {
	//console.log("엑셀버튼 클릭");
	modDpm1010.excelWrite();
});


/**
 * 썸네일크기 변경 시 
 */
$("#selThumbnailSize").on("change", function() {
	modDpm1010.setThumbnailSize($("#selThumbnailSize").val());
});

/**
 * 저장 버튼 클릭
 */
$("#btnMasking").on("click", function() {
	ImgMasking();
});

/**
 * 복원 버튼 클릭
 */
$("#btnMaskingCancel").on("click", function() {
	MaskingCancel();
});

/**
 * 저장 버튼 클릭
 */
$("#btnVerity").on("click", function() {
	ImgVerify();
});

/**
 * 엔터 키 입력
 */
$("#txtElementId").keydown(function(key){
	if(key.keyCode == 13) {
		modDpm1010.selList();
	}
});

/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
	modDpm1010.init();
	modDpm1010.objectInit();
	modDpm1010.objectEventInit();
	
});

//# sourceURL=dpm1010.js
