/**
 * @File Name : dpm0010Pop.js
 * @Description : 이미지조회
 * @Modification Information
 * 
 * 수정일 수정자 수정내용 ------- -------- --------------------------- 2019.04.01 최초 생성
 * 
 * 
 * ------------------------------------------------ jqGrid 4.7.0 jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com Dual licensed under the MIT
 * and GPL licenses http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html Date: 2014-12-08
 * ------------------------------------------------
 */

var modDpm0010Pop = (function() {
	var axAllViewCtlC1; // LEFT 뷰어 OBJECT
	var axAllViewCtlC2; // 툴바 OBJECT
	var axAllViewCtlC3; // RIGHT OBJECT
	var objCommUtil; // 파일제어 및 Multipart 전송 OBJECT
	var axALLViewFileManagerCtlC1; // 파일매니저

	var gEID; // 마스킹 대상 EID (원본 병합이미지)
	var gJobID; // 마스킹 대상 JobID (원본 병합이미지)
	var gMaskFile = ""; // 마스킹한 파일경로 (병합에서 분리된 싱글이미지)
	var gOriImgFile = ""; // 최초 원본 이미지파일_KBS_171204
	var gINXID; // 마스킹 대상 INDEX_ID
	var gThumb = ""; // 썸네일 파일 경로
	var gDownPath = ""; // 원본 이미지 다운 경로

	var gMaskingCount = 0; // 마스킹 개수_KBS_171130
	var bSendState = false; // 전송유무 상태_KBS_171201

	/**
	 * 초기화
	 */
	function init() {
		gOriImgFile = $("#txt1010PopupOrigin", opener.document).val();
		gMaskFile = $("#txt1010PopupMask", opener.document).val();
		gINXID = $("#txt1010PopupIDXID", opener.document).val();
		gEID = $("#txt1010PopupEID", opener.document).val();
		gJobID = $("#txt1010PopupJobID", opener.document).val();
		gThumb = $("#txt1010PopupThumbnail", opener.document).val();

		gDownPath = DOWN_PATH;
	}
	;

	/**
	 * ************************************************************************************************************
	 * 이미지뷰어 dll OBJECT 제어
	 * ************************************************************************************************************
	 */

	/**
	 * Function : 작업 폴더를 생성하고 썸네일 경로를 초기화한다. Param : 없음 Return : 없음
	 */
	function objectInit() {
		// / Viewer Create
		var divViewer1 = document.getElementById("divAllView1");
		var viewerHTML1 = f_createObjectToHTML("MImgView1", "100%", "580px",
				MALLVIEW_OCX_CLSID, "", "");
		divViewer1.innerHTML = viewerHTML1;

		axAllViewCtlC1 = document.getElementById("MImgView1");
		axAllViewCtlC1.ImageFilePath = gOriImgFile;
		pSubViewInit(axAllViewCtlC1, 1);

		// / toolbar Create
		/*
		 * var divViewer2 = document.getElementById("divAllView2"); var
		 * viewerHTML2 = f_createObjectToHTML("MImgView2", "100%", "55px",
		 * MALLVIEW_OCX_CLSID, "", ""); divViewer2.innerHTML = viewerHTML2;
		 * 
		 * axAllViewCtlC2 = document.getElementById("MImgView2");
		 * pSubViewInit(axAllViewCtlC2, 2);
		 */

		var divViewer3 = document.getElementById("divAllView3");
		var viewerHTML3 = f_createObjectToHTML("MImgView3", "100%", "580px",
				MALLVIEW_OCX_CLSID, "", "");
		divViewer3.innerHTML = viewerHTML3;

		axAllViewCtlC3 = document.getElementById("MImgView3");
		axAllViewCtlC3.ImageFilePath = gMaskFile;
		pSubViewInit(axAllViewCtlC3, 3);

		// / CommUtil Create
		var divCommUtil = document.getElementById("divCommUtil");
		var commUtilHTML = f_createObjectToHTML("CommUtil", "0", "0",
				COMMUTIL_OCX_CLSID, "", "");
		divCommUtil.innerHTML = commUtilHTML;
		objCommUtil = document.getElementById("CommUtil");

		// / FileManager Create
		var divFileManager = document.getElementById("divFileManager");
		var fileManagerHTML = f_createObjectToHTML("MFileManager", "0", "0",
				MFILEMANAGER_OCX_CLSID, "", "");
		divFileManager.innerHTML = fileManagerHTML;
		axALLViewFileManagerCtlC1 = document.getElementById("MFileManager");

		axAllViewCtlC1.ImageFilePath = gOriImgFile;
		axAllViewCtlC3.ImageFilePath = gMaskFile;
		axAllViewCtlC1.DrawImage();
		axAllViewCtlC3.DrawImage();
	}
	;

	/**
	 * Function : HTML에 OBJECT를 Write한다. Param : id - Object ID width - Object
	 * Size height - Object Size classid - Object CLASSID codebase - Object
	 * CODEBASE version - Object version Return : strHTML
	 */
	function f_createObjectToHTML(id, width, height, classid, codebase, version) {
		var strHTML = '';

		if (width == "")
			width = 0;
		if (height == "")
			height = 0;

		strHTML += '<OBJECT  ID="' + id + '" WIDTH="' + width + '" HEIGHT="'
				+ height + '" ';
		strHTML += 'CLASSID="' + classid;

		if (codebase != "") {
			strHTML += '" CODEBASE="' + codebase;
			if (version != "")
				strHTML += '#version=' + version;
		}

		strHTML += '">';
		strHTML += '</OBJECT>';
		// alert("strHTML: " + strHTML);

		// document.writeln(strHTML);

		return strHTML;
	}
	;

	/**
	 * Function : 뷰 화면을 초기화 한다. Param : obj - 올뷰 object Return : 없음
	 */
	function pSubViewInit(obj, no) {
		if (no == 1) {
			obj.MergeBlackMaskImageMode = false;
			obj.ShowMainView = true; // 이미지뷰 화면 유무
			obj.ShowThumbnailsView = false; // 썸네일뷰 화면 유무
			obj.AutoSaveImage = true; // 이미지 자동저장 유무
			obj.ShowToolbar = false; // 뷰어 툴바 보기
			// obj.SetCustomizeToolbar("001120000021121111"); // 뷰어 툴바 설정
			obj.ShowAnnotationToolbar = false;
			obj.SetAnnotationSelectionMode = true; // 주석 선택
			obj.setThumbnailsViewFrameSize = 150; // 썸네일 사이즈
			obj.ShowMultiPageThumbnailsView = true;
			obj.SelectImageMode = 1;
			obj.MultiPageThumbnailsMultiSelectMode = 0;

			// obj.ReDrawThumbnails(); // 썸네일 화면 다시 그리기
			obj.DrawImage(); // 뷰어 그리기
		} else if (no == 2) {
			// obj.MergeBlackMaskImageMode = true;
			obj.ShowMainView = true; // 이미지뷰 화면 유무
			obj.ShowThumbnailsView = false; // 썸네일뷰 화면 유무
			obj.AutoSaveImage = false; // 이미지 자동저장 유무
			obj.ShowToolbar = true; // 뷰어 툴바 보기
			obj.SetCustomizeToolbar("001120000021121111"); // 뷰어 툴바 설정
			obj.SetAnnotationSelectionMode = true; // 주석 선택
			// obj.ReDrawThumbnails(); // 썸네일 화면 다시 그리기
			obj.DrawImage(); // 뷰어 그리기
		} else if (no == 3) {

			obj.ShowMainView = true; // 이미지뷰 화면 유무
			obj.ShowThumbnailsView = false; // 썸네일뷰 화면 유무
			obj.AutoSaveImage = false; // 이미지 자동저장 유무
			obj.ShowToolbar = false; // 뷰어 툴바 보기
			// obj.SetCustomizeToolbar("001120000021121111"); // 뷰어 툴바 설정
			obj.ShowAnnotationToolbar = false;
			obj.SetAnnotationSelectionMode = false; // 주석 선택
			obj.setThumbnailsViewFrameSize = 150; // 썸네일 사이즈
			obj.ShowMultiPageThumbnailsView = true;
			obj.SelectImageMode = 1;
			// obj.MultiPageThumbnailsMultiSelectMode = 0;

			// obj.ReDrawThumbnails(); // 썸네일 화면 다시 그리기
			obj.DrawImage(); // 뷰어 그리기
		}
	}
	;

	/**
	 * Function : 뷰어 이벤트 초기화
	 */
	function objectEventInit() {
		if (window.attachEvent) {
			axAllViewCtlC1.attachEvent('OnSelectedImage', function(x, y, w, h) {

				return MImgView1_OnSelectedImage(x, y, w, h);
			});
			axAllViewCtlC1.attachEvent('OnChangedPage', function(pageNumber) {

				return MImgView1_OnChangedPage(pageNumber);
			});

		} else if (window.addEventListener) { // ie11
			axAllViewCtlC1.addEventListener('OnSelectedImage', function(x, y,
					w, h) {
				return MImgView1_OnSelectedImage(x, y, w, h);
			}, false);
			axAllViewCtlC1.addEventListener('OnChangedPage', function(e) {
				return MImgView1_OnChangedPage(e);
			}, false);
		}
	}
	;
	
	/**
	 * Function : 뷰어 멀티페이지 썸네일 이벤트
	 */
	function MImgView1_OnChangedPage(pageNumber) {
		var arrFile = axAllViewCtlC1.GetSelectedMultiPageThumbnailsIndex.split("^^");
		//alert(arrFile[0]);
        var idx = 0;
        if (!arrFile[0] == ""){
        	//alert(arrFile[0]);
            idx = parseInt(arrFile[0]);
        }

        //alert(idx);
        axAllViewCtlC3.SelectMultiPageThumbnailbyIndex(idx);
        axAllViewCtlC1.focus();
	};

	/**
	 * Function : 뷰어 영역선택 이벤트(마스킹 버튼 클릭 시 SelectImageMode(이미지 선택 모드가 1일때)
	 */
	function MImgView1_OnSelectedImage(x, y, w, h) {
		// console.log("MImgView1_OnSelectedImage");

		var iMaskIndex;
		var Rect = new Object(); // Left, Top, Right, Bottom
		var roundSize = new Object(); // cx, cy

		var iRet;
		var aType = 0, isSelected = 0, ObjectIndex = 0, BufferSize = 255; // 주석타입,
																			// 선택여부,
																			// 타입의인덱스값,
																			// 버퍼크기
		var arriRect = new Array();
		var sFolder, sFileTmp;

		try {
			iMaskIndex = axAllViewCtlC1.getAnnotationCount;

			// @check - Rect, roundSize 는 c#에서 struct. 우선 json data로 넘기도록 구현하였으나
			// 에러발생함
			// 드래그된 사각형 영역
			Rect.Left = Math.round(x);
			Rect.Top = Math.round(y);
			Rect.Right = Math.round(x + w);
			Rect.Bottom = Math.round(y + h);

			roundSize.cx = 0;
			roundSize.cy = 0;

			axAllViewCtlC1.AddBlackMarkBoxEx(Rect.Left, Rect.Top, Rect.Right,
					Rect.Bottom);
			axAllViewCtlC1.SetAnnotationSelectionMode = true;
			axAllViewCtlC1.UpdateMainWindow();

			var sname = "";
			var IMG_PATH = "";
			var isOverwrite = false;

			var fpath = "D:\\MaskPath\\Masking\\MASK";

			IMG_PATH = axAllViewCtlC1.ImageFilePath;
			axAllViewCtlC1.SaveImage(); // cws
			var dirPath = objCommUtil
					.GetFolderName(axAllViewCtlC1.ImageFilePath);
			var oname = IMG_PATH.replace(dirPath, fpath);

			if (!objCommUtil.ExistFile(oname)) {
				objCommUtil.FileCopy(IMG_PATH, oname, true);
				isOverwrite = true;
			} else {
				if (confirm("기존 마스킹 이미지가 있습니다. 덮어쓰시겠습니까?")) {
					objCommUtil.FileCopy(IMG_PATH, oname, true);
					isOverwrite = true;
				}
			}

			gMaskFile = oname;

			var spath = "D:\\MaskPath\\Original";
			IMG_PATH = axAllViewCtlC1.ImageFilePath;
			axAllViewCtlC1.SaveImage(); // cws
			var dirPath = objCommUtil.GetFolderName(IMG_PATH);
			sname = IMG_PATH.replace(dirPath, spath);
			var purename = objCommUtil.GetFileName(sname, false);

			sname = sname.replace(purename, purename + "+1");
			gThumb = sname;

			if (objCommUtil.ExistFile(gMaskFile)) {


				gMaskingCount = axAllViewCtlC1.getAnnotationCount; // 마스킹 개수
           		

				if (isOverwrite) {
					axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC1.ImageFilePath;
					axALLViewFileManagerCtlC1.InitSelectionAreaofImage();
					axALLViewFileManagerCtlC1.AddSelectionAreaofImage(Math
							.round(x), Math.round(y), Math.round(w), Math
							.round(h));
					axALLViewFileManagerCtlC1
							.SaveSelectionAreaofImage(sname, 1);
				}


			}

			axAllViewCtlC3.ImageFilePath = "/";
			axAllViewCtlC3.DrawImage();

			axAllViewCtlC3.ImageFilePath = gMaskFile;
			axAllViewCtlC3.DrawImage();
			axAllViewCtlC3.UpdateMainWindow();

			if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
				var arrFile = axAllViewCtlC1.GetSelectedMultiPageThumbnailsIndex
						.split("^^");
				var idx = parseInt(arrFile[0]);

				axAllViewCtlC3.SelectMultiPageThumbnailbyIndex(idx);
			}


		} catch (e) {
			console.log(e.message);
			alert("마스킹오류 - 아래의 오류 내용을 확인 하시기 바랍니다.\n\n" + e.message);
		}
	};

	/**
	 * 마스킹
	 */
	function ImgMasking() {

		// if(axAllViewCtlC1.ImageFilePath != "") {
		// axAllViewCtlC1.SelectImageMode = 1; // 이미지 선택 모드 설정
		// }
		//    	
		if (!confirm("해당 영역에 수동 마스킹을 진행하시겠습니까?")) {
			return;
		} else {

			$("#btnMasking").prop("disabled", true);
			if (axAllViewCtlC1.ImageFilePath != "")
				gFunImgMasking(); // 이미지 마스킹

			$("#btnMasking").prop("disabled", false);
		}
	}
	;

	/**
	 * 마스킹 적용
	 */
	function gFunImgMasking() {
		axAllViewCtlC3.MergeBlackMaskImageMode = true;
		axALLViewFileManagerCtlC1.SetImageFile = axAllViewCtlC3.ImageFilePath;
		if (axALLViewFileManagerCtlC1.GetImagePageCount > 1) {
			for (var i = 0; i < axALLViewFileManagerCtlC1.GetImagePageCount; i++) {
				axAllViewCtlC3.SelectMultiPageThumbnailbyIndex(i);
				axAllViewCtlC3.SaveImage();
			}
		} else {
			axAllViewCtlC3.SaveImage();
		}

		axAllViewCtlC3.MergeBlackMaskImageMode = false;

		var nFile = axAllViewCtlC3.ImageFilePath;

		axAllViewCtlC3.ImageFilePath = "";
		axAllViewCtlC3.DrawImage();

		axAllViewCtlC3.ClearThumbnails();
		axAllViewCtlC3.RemoveTempFolder();

		axAllViewCtlC3.ImageFilePath = nFile;
		axAllViewCtlC3.DrawImage();

		ImageManualMaskingResultSave(gEID);
	}
	;

	/**
	 * 마스킹취소
	 */
	function MaskingCancel() {
		if (!confirm("기 마스킹 이미지를 원상복귀 진행하시겠습니까?"))
			return;

		try {
			var IMG_PATH = "";
			// @check - c#에서는 '&&' 가 아닌 '||'로 되어있으나 이상하다고 판단되어 수정함
			if (gMaskFile != "" && gMaskFile != "gitar4") {
				var fpath = "D:\\MaskPath\\Masking\\MASK";
				IMG_PATH = axAllViewCtlC1.ImageFilePath;
				var dirPath = objCommUtil.GetFolderName(IMG_PATH);
				var oname = IMG_PATH.replace(dirPath, fpath);

				if (objCommUtil.ExistFile(gMaskFile)) {
					if (objCommUtil.FileCopy(IMG_PATH, oname, true)) {
						objCommUtil.FileDelete(gMaskFile);
					}
				}

				gMaskFile = oname;
			}
			// @check - c#에서는 '&&' 가 아닌 '||'로 되어있으나 이상하다고 판단되어 수정함
			if (gThumb != "" && gThumb != "gitar5") {
				if (objCommUtil.ExistFile(gThumb)) {
					objCommUtil.FileDelete(gThumb);
				}

				gThumb = "";
			}

			axAllViewCtlC3.ImageFilePath = "/";
			axAllViewCtlC3.DrawImage();

			axAllViewCtlC3.ImageFilePath = gMaskFile;
			axAllViewCtlC3.DrawImage();
			axAllViewCtlC3.UpdateMainWindow();

			// 이미지 전송 원본 이미지 전송은 재분류 기능때문에 현 DB구조에서 구현 불가
			if (gMaskFile == "") { // 마스킹 없이 전송할때_KBS_171204
				// alert("마스킹된 부분이 없습니다.\n" + "마스킹 후 전송해 주시기 바랍니다.");
				return;
			} else { // 기본 마스킹 전송
				// 수작업 마스킹 한경우는 ETC1에 수작업 건수를 기록한다.
				// 마스킹 진행단계를 업로드 완료 '60' 로 변경한다.
				ImageManualMaskingResultSave(gEID, true);
			}
		} catch (e) {
			console.log(e.message);
			alert("마스킹오류 - 아래의 오류 내용을 확인 하시기 바랍니다.\n\n" + e.message);
		}
	}
	;

	/**
	 * DB업데이트(진행단계) 및 마스킹개수 적재
	 */
	function ImageManualMaskingResultSave(strElementID, isRollBack) {
		var objParam = {
			"bprBsnDsc" : gJobID,
			"elementid" : gEID,
			"maskPrgStsc" : "10",
			"etc4" : gMaskFile,
			"chgEno" : $("#txtLoginchrrId", opener.document).val(),
			"rgEno" : $("#txtLoginchrrId", opener.document).val()
		};

		if (isRollBack == true) {
			objParam.etc5 = "";
			objParam.fpCn = 0;
			objParam.imgCountInfo = 0;
		} else {
			objParam.etc5 = gThumb + "^";
			objParam.fpCn = 1;
			objParam.imgCountInfo = 1;
		}

		// 지문마스킹대상 수정
		modAjax.request("/dpm/updFpMaskObj.do", objParam, {
			// async: false,
			success : function(cnt) {

			},
			error : function(cnt) {
				// console.log(cnt);
			}
		});

		// 지문마스킹이력 등록
		objParam.maskPrgStsc = "60";
		objParam.maskSvrnm = "M01"; // NetBIOS 이름?
		objParam.maskAgent = "A01"; // 활성화된 프로세스이름?
		objParam.prcmnEno = $("#txtLoginchrrId", opener.document).val();

		modAjax.request("/dpm/insFpMaskHis.do", objParam, {
			// async: false,
			success : function(cnt) {

			},
			error : function(cnt) {
				// console.log(cnt);
			}
		});

	}
	;

	// 이미지전송
	function pSubFileSend() {
		if (gMaskPrgStsc == "70") {
			alert("운영반영 완료된 이미지입니다. \r\n운영반영완료된 이미지는 마스킹 적용이 불가합니다.");
			return;
		}

		if (axAllViewCtlC1.ImageFilePath != "") {

			try {
				// 이미지 전송 원본 이미지 전송은 재분류 기능때문에 현 DB구조에서 구현 불가
				if (gMaskFile == "") // 마스킹 없이 전송할때_KBS_171204
				{
					alert("마스킹된 부분이 없습니다.\n" + "마스킹 후 전송해 주시기 바랍니다.");
					return;
				} else { // 기본 마스킹 전송
					axAllViewCtlC1.SaveImage(); // 저장
					axAllViewCtlC3.SaveImage(); // 저장
					var strRtnElementID = "";

					// pSubServerSend(gJobID, gEID, ref strRtnElementID); //전송

					alert("전송이 완료되었습니다.\n" + "마스킹 화면을 닫습니다.");
					// KKL
					// 수작업 마스킹 한경우는 ETC1에 수작업 건수를 기록한다.
					// 마스킹 진행단계를 업로드 완료 '60' 로 변경한다.
					ImageManualMaskingResultSave(strRtnElementID);
					bSendState = true;
					self.close();
				}
			} catch (e) {

			}
		}
	}
	;

	// 종료시 확인
	function checkBeforeClose() {
		var iImgCnt = 0; // 이미지개수
		var iAnnoCnt = 0; // 주석개수(마스킹)
		var sPath = ""; // 이미지경로
		var bMasking = false;

		if (!bSendState) {
			iImgCnt = axAllViewCtlC1.GetThumbnailsCount; // 이미지 개수 가져오기
			for (i = 0; i < iImgCnt; i++) {
				sPath = axAllViewCtlC1.GetThumbnail_FilePath(i); // 이미지경로
																	// 가져오기
				iAnnoCnt = axALLViewFileManagerCtlC1.GetAnnotationCount(sPath,
						-1); // 주석 개수 가져오기(마스킹)
				if (iAnnoCnt > 0) // 마스킹이 존재한다면
				{
					bMasking = true;
					break;
				}
			}
		}

		if (!bMasking) {
			pSubEndImgView(); // 종료 시 정리
		}

		return bMasking;
	}
	;

	// 종료 시 로컬 파일 정리 성공여부 리턴
	function pSubEndImgView() {
		pSubSendFolderDel(gEID);
	}
	;

	// 전송폴더 정리
	function pSubSendFolderDel(sEid) {
		// 이미지 파일들 정리
		var sFolder = gDownPath + sEid + "\\";
		objCommUtil.FolderDelete(sFolder, true);
	}
	;

	return {
		init : init,
		objectInit : objectInit,
		objectEventInit : objectEventInit,
		ImgMasking : ImgMasking,
		MaskingCancel : MaskingCancel,
		pSubFileSend : pSubFileSend,
		checkBeforeClose : checkBeforeClose
	};

})();

/**
 * 마스킹 버튼 클릭
 */
$("#btnMasking").on("click", function() {
	modDpm0010Pop.ImgMasking();
});

/**
 * 마스킹 취소버튼 클릭
 */
$("#btnMaskingCancel").on("click", function() {
	modDpm0010Pop.MaskingCancel();
});

/**
 * 종료버튼 클릭
 */
$("#btnExit").on(
		"click",
		function() {
			if (modDpm0010Pop.checkBeforeClose()) {
				if (!confirm("이미지 마스킹 수정 후 이미지 전송을 하지 않았습니다. \r\n"
						+ "이미지 전송을 하시겠습니까?")) {
					modDpm0010Pop.pSubFileSend();
				}
			} else {
				self.close();
			}
		});

/**
 * DOM load 완료 시 실행
 */
$(document).ready(function() {
	modDpm0010Pop.init();
	modDpm0010Pop.objectInit();
	modDpm0010Pop.objectEventInit();
});

/**
 * beforeunload 이벤트
 */

$(window).bind("beforeunload", function(e) {
	if (modDpm0010Pop.checkBeforeClose()) {
		return "이미지 마스킹 수정 후 이미지 전송을 하지 않았습니다.";
	}
});
