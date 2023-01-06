//페이지 이동 
function goPage(data){
	var frmHeader = $("#frmHeader")[0];
	console.log(data);
	switch (data){
		
		case 'Daily':
		frmHeader.action = "/dpm/dpmDailyPro.do";
		break;
		
		case 'Day':
		frmHeader.action = "/dpm/dpmDayPro.do";
		break;
		
		case 'Month':
		frmHeader.action = "/dpm/dpmMonthPro.do";
		break;
		
		case 'IMRReader':
		frmHeader.action = "/dpm/dpmImrResViewerInfo.do";
		break;
		
		case 'UserManage':
		frmHeader.action = "/dpm/dpmUserManageInfo.do";
		break;
		
		case 'CalibVerfi':
		frmHeader.action = "/dpm/dpmCalibVerifiInfo.do";
		break;
		
		case 'ImrResult':
		frmHeader.action = "/dpm/dpmImrResultInfo.do";
		break;
		
		case 'MaskVerfi':
		frmHeader.action = "/dpm/dpmMaskVerifiInfo.do";
		break;
		
		case 'MaskResult':
		frmHeader.action = "/dpm/dpmMasResultInfo.do";
		break;
		
		
		
	}
		
		frmHeader.method = "post";
		frmHeader.submit();	
};


/**
 * 로그아웃 클릭 시 로그인 페이지로 이동
 */
$("#spnLogout").on("click", function() {
	console.log("로그아웃");
	if(confirm("로그아웃 하시겠습니까?")) {
		var frmLogin = $("#frmHeader")[0];
		frmLogin.action = "/dpm/index.ui";
		frmLogin.method = "post";
		frmLogin.submit();	
	}	
});
