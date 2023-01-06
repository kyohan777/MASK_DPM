
/**
  * @File Name : main.js
  * @Description : 메인화면
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.04.01             최초 생성
  *
  *  
  *
 */

var modMain = (function(){		
	/**
	 * 권한에 따른 메뉴목록 조회 및 set 메뉴 
	 */	
	function setAuthMenu() {
		//default 제외메뉴 : 1030(이관DB초기화), 2020(마스킹단계별현황), 2060(Xtorm 일별 처리현황)
		var arrExceptMenu = [1030, 2020, 2060];	
		var objParam = {"chrrId" : $("#txtLoginchrrId").val()};
		var objResult;
				
		modAjax.request("/dpm/selListMenuAuth.do", objParam,  {
			async: false,
			success: function(data) {
				//console.log(data);				
				if(!modComm.isEmpty(data) && data.rsYn == "Y" && data.hasOwnProperty("selList")) {
					objResult = data.selList;	
				}	
										
			},
            error: function(response) {
                console.log(response);
            }
    	});					
		
		//상위메뉴
		if(!modComm.isEmpty(objResult)) {			
			objResult.forEach(function(item) {
				if(item.upMenuSqno == 0) {
					$("#ulLevel0").append("<li id='li_" + item.menuSqno + "' class='dropdown'><a href='#' role='button' id='dropdownMenuLink1'  data-toggle='dropdown'><span id='spnUpMnNm_" + item.menuSqno + "'>" + item.mnnm + "</span></a><div id='ulLevel1_" + item.menuSqno + "' class='dropdown-menu' aria-labelledby='dropdownMenuLink1'></div></li>");	
				}				
			});			
		}
		
		//하위메뉴
		if(!modComm.isEmpty(objResult)) {			
			objResult.forEach(function(item) {
				if(item.upMenuSqno != 0 && arrExceptMenu.indexOf(item.menuSqno) == -1) {
					var upMenu = $("#ulLevel1_"+item.upMenuSqno);
					upMenu.append("<a class='dropdown-item' href='#' id='menuSqno_" + item.upMenuSqno + "_" + item.menuSqno + "'><strong class='circle-point'> ·</strong>&nbsp;" +  item.mnnm + "</a>");
				}
			});	
		}	

	};
	
	return {
		setAuthMenu: setAuthMenu
	};

})();


/**
 * 로그아웃 클릭 시 로그인 페이지로 이동
 */
$("#spnLogout").on("click", function() {
	console.log("로그아웃");
	if(confirm("로그아웃 하시겠습니까?")) {
		var frmLogin = $("#frmMain")[0];
		frmLogin.action = "/dpm/index.ui";
		frmLogin.method = "post";
		frmLogin.submit();	
	}	
});

/**
 * 정보변경 클릭 시  
 */
$("#spnChngInfo").on("click", function() {
});

/**
 * HOME 클릭 시   
 */
$("#home").on("click", function() {
	$("#contentPage").load("/dpm/firstView.ui");
});

/**
 * 메뉴선택시 contentPage 선택
 */
$("#ulLevel0").on("click", "a", function(){
	var objSel =  $(this);
	var attrId = objSel.attr("id");
	var menuNm = objSel.text().replace(/ ·/gi,"");
	if(attrId.indexOf("menuSqno_") == 0 && attrId.split("_").length == 3) {
		$("#contentPage").load("/dpm/dpm" + attrId.split("_")[2] + ".ui", function(){
			$("#spnSubtitle").text(menuNm + "(" + attrId.split("_")[2] + ")");
			$("#spnUpMnNm").text($("#spnUpMnNm_" + attrId.split("_")[1]).text());
			$("#spnMnNm").text(menuNm);
			$("#divMenuPath").show();
		});
		
	}
	
});

/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
	modMain.setAuthMenu();
});