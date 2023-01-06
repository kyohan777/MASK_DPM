/**
 * 공통전역변수(값 변경 금지)
 */
// CommUtil.dll - 파일제어 및 Multipart 전송
var COMMUTIL_OCX_NAME       = "";
var COMMUTIL_OCX_VERSION    = "";
var COMMUTIL_OCX_CODEBASE   = "";
var COMMUTIL_OCX_CLSID      = "CLSID:33B25E95-4248-44D9-80EF-0CDB52B1C716";

// 뷰어 DLL 객체 Object 정보
// AllViewPrj.dll - VIEW & THUMBNAIL
var MALLVIEW_OCX_NAME  	    = "";
var MALLVIEW_OCX_VERSION  	= "";
var MALLVIEW_OCX_CODEBASE 	= "";
var MALLVIEW_OCX_CLSID    	= "CLSID:79AE1E4A-D911-487B-A9FC-9771D12D6F5F";
	
// 파일매니저 DLL 객체 Object 정보
// ALLViewFileManager.dll
var MFILEMANAGER_OCX_NAME     = "";
var MFILEMANAGER_OCX_VERSION  = "";
var MFILEMANAGER_OCX_CODEBASE = "";
var MFILEMANAGER_OCX_CLSID    = "CLSID:648B0CA4-B1F6-4138-BEE2-E0CBDF32CD0D";

//폴더락 OCX 정보
var MAGICLOCK_OCX_NAME     = "";
var MAGICLOCK_OCX_VERSION  = "";
var MAGICLOCK_OCX_CODEBASE = "";
var MAGICLOCK_OCX_CLSID    = "CLSID:0F278CBA-923C-40D6-82DB-B95F5D820271";
var MAGICLOCK_OCX_ROOTPATH = "D:\\LIGDEV\\test";
var MAGICLOCK_OCX_IMGROOTPATH = "D:\\MaskPath";
var MAGICLOCK_OCX_IMGDOWNPATH  = "D:\\MaskPath\\Original";
var MAGICLOCK_OCX_IMGMASKPATH  = "D:\\MaskPath\\Masking";

//XVARM API 대상 운영/개발 설정 
var XMASK_TARGET_P  = "P"; //운영
var XMASK_TARGET_T  = "T"; //개발

var XMASK_TARGET  = XMASK_TARGET_P;

//XVARM(3102)/XMASK(4102) CRT_DT일자 기준으로 원본조회시 대상 포트 기준일 설정 - 해당 기준일 이전은 4102/기준일 포함 이후 날짜는 3102 
//var CONVERTDAY = "20190611"; //개발 기준일
var CONVERTDAY = "20190701"; //운영 기준일

// 구분자
var DIRECTORY_SEPARATOR = "\\";	 	//계층적 파일 시스템 구조를 반영하는 경로 문자열에서 디렉터리 수준을 구분하는 데 사용되는 플랫폼 특정 문자
var ALT_DIRECTORY_SEPARATOR = "/";	//계층적 파일 시스템 구조를 반영하는 경로 문자열에서 디렉터리 수준을 구분하는 데 사용되는 플랫폼 특정 대체 문자
var VOLUME_SEPARATOR = ":";			//플랫폼 특정 볼륨 구분 기호 문자

// config
var DOWN_PATH = "D:\\PIEM_image\\";

/**
 * 공통전역함수
 */
(function(w) {
	/**
	 * 
	 */    
    var modComm = {
    		
    	
    		/**
    		 * Description :  서버일자조회
    		 * Ex) modComm.getServerDate()
    		 *       
    		 */      		
    		getServerDate: function() {
    			var objParam = {};
        		var objResult;
        		
        		modAjax.request("/dpm/getServerDateTime.do", objParam,  {
        			async: false,
        			success: function(data) {
        				objResult = data.serverDate
        			},
                    error: function(response) {
                        console.log(response);
                    }
            	});
        		
        		return objResult;
    		},    		
    		
    		/**
    		 * Description :  입력한 input의 빈값여부(true/false) 리턴
    		 *  
    		 */  
            isEmpty: function(input) {
            	if (typeof input == "undefined" || input == null || (typeof input == "string" && input.replace(/ /gi,"") == "")) {
            		return true;
            	} else if(typeof input == "object" && $.isEmptyObject(input) == true) {
            		return true;
            	} else {
            		return false;
            	}
            },
            
    		/**
    		 * Description :  날짜(from~to) 조건 검사
    		 *  
    		 */              
    		isValidBetweenDate: function(startDtId, endDtId) {
    			var startDt	= $("#" + startDtId).val().replace(/-/gi,"");
    			var endDt		= $("#" + endDtId).val().replace(/-/gi,"");
    			
    			//console.log(serverDt);
    			if(modComm.isEmpty(startDt) && !modComm.isEmpty(endDt)) {
    				alert("종료일자를 입력하면 시작일자도 입력하셔야 합니다.");
    				$("#" + startDtId).focus();
    				return false;
    			}
    			if(!modComm.isEmpty(startDt) && modComm.isEmpty(endDt)) {
    				alert("시작일자를 입력하면 종료일자도 입력하셔야 합니다.");
    				$("#" + endDtId).focus();
    				return false;
    			}    			
    			if(startDt > endDt) {
    				alert("조회 시작일자가 종료일자보다 큽니다.");
    				return false;
    			}
    			
    			return true;
    		},    		  
            
    		/**
    		 * Description :  달력 컴포넌트 초기화
    		 *  
    		 */            
            setDatepicker: function(inputId, imgId) {            	
            	if(modComm.isEmpty(inputId) || modComm.isEmpty(imgId)) return;

            	var options = {
        			dateFormat: 'yy-mm-dd',
        			changeMonth: true,
        			changeYear: true,
        			dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
        			dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
        			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        			monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']            			
            	}
            	
        		$("#" + inputId).datepicker(options);        		
        				
        		$("#" + imgId).click(function(){
        			$("#" + inputId).datepicker('show');
        		});
            },
            
            setMonthpicker: function(inputId, imgId) {
            	if(modComm.isEmpty(inputId) || modComm.isEmpty(imgId)) return;
            	
            	var currentYear = (new Date()).getFullYear();
            	var startYear = currentYear-10;
            	var options = {
        	        startYear: startYear,
        	        finalYear: currentYear,        			
        			pattern: 'yyyy-mm',        			
        			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        			monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']            			
            	};
            	
        		$("#" + inputId).monthpicker(options);        		        		
        				
        		$("#" + imgId).click(function(){
        			$("#" + inputId).monthpicker('show');
        		});            	
            },
            
    		/**
    		 * Description :  코드를 조회하여 동적 select box 초기화
    		 *  
    		 */             
            setSelectboxByCd: function(upCId, selectId, cd, cdNm, option, optionCd, cdShowYn) {
        		var objParam = {"upCId" : upCId};
        		var objResult;
        		
        		modAjax.request("/dpm/selListCode.do", objParam,  {
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
            	        		
    			$("#" + selectId).find("option").remove();
    			
    			if(modComm.isEmpty(selectId) || modComm.isEmpty(objResult) || modComm.isEmpty(cd) || modComm.isEmpty(cdNm)) return;
    			    			
    			if(option == "전체") {
    				if(!modComm.isEmpty(optionCd)) {
    					$("#" + selectId).find("option").end().append("<option value='" + optionCd + "'>전체</option>");	
    				} else {
    					$("#" + selectId).find("option").end().append("<option value=''>전체</option>");	
    				}    					
    			} else if(option == "선택") {
    				if(!modComm.isEmpty(optionCd)) {
    					$("#" + selectId).find("option").end().append("<option value='" + optionCd + "'>선택</option>");	
    				} else {
    					$("#" + selectId).find("option").end().append("<option value=''>선택</option>");	
    				}
    			}    			
    			
    			if(!modComm.isEmpty(objResult)) {			
    				objResult.forEach(function(item) {
    					if(cdShowYn == "Y") {
    						$("#" + selectId).append("<option value='" + item[cd] + "'>(" + item[cd] + ")" + item[cdNm] + "</option>");
    					} else {
    						$("#" + selectId).append("<option value='" + item[cd] + "'>" + item[cdNm] + "</option>");	
    					}
    					
    				});			
    			}              	
            },
            
    		/**
    		 * Description :  url의 조회결과로 동적 select box 초기화
    		 *  
    		 */             
            setSelectboxByUrl: function(url, objParam, selectId, cd, cdNm, option, optionCd, cdShowYn) {
        		var objResult;
        		
        		modAjax.request(url, objParam,  {
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
            	        		
    			$("#" + selectId).find("option").remove();
    			
    			if(modComm.isEmpty(selectId) || modComm.isEmpty(objResult) || modComm.isEmpty(cd) || modComm.isEmpty(cdNm)) return;
    			    			
    			if(option == "전체") {
    				if(!modComm.isEmpty(optionCd)) {
    					$("#" + selectId).find("option").end().append("<option value='" + optionCd + "'>전체</option>");	
    				} else {
    					$("#" + selectId).find("option").end().append("<option value=' '>전체</option>");	
    				}    					
    			} else if(option == "선택") {
    				if(!modComm.isEmpty(optionCd)) {
    					$("#" + selectId).find("option").end().append("<option value='" + optionCd + "'>선택</option>");	
    				} else {
    					$("#" + selectId).find("option").end().append("<option value=' '>선택</option>");	
    				}
    			}    			
    			
    			if(!modComm.isEmpty(objResult)) {			
    				objResult.forEach(function(item) {
    					if(cdShowYn == "Y") {
    						$("#" + selectId).append("<option value='" + item[cd] + "'>(" + item[cd] + ")" + item[cdNm] + "</option>");
    					} else {
    						$("#" + selectId).append("<option value='" + item[cd] + "'>" + item[cdNm] + "</option>");	
    					}
    					
    				});			
    			}              	
            },            
            
    		/**
    		 * Description :  브라우저창 변경에 따른 그리드 width resize 
    		 *  
    		 */              
            resizeJqGridWidth:function(gridId, gridContainerId, width, height, tf){
            	$(window).bind('resize', function(){
            		var resizeWidth = $("#" + gridContainerId).width(); // jQuery-ui의 padding 설정 및 border-width값 때문에 넘치는걸 빼줌
            		
            		//그리드의 width초기화
            		$("#" + gridId).setGridWidth(resizeWidth,tf);
            		$("#" + gridId).setGridHeight((parseInt($(window).height())-parseInt(height)));
            		
            	}).trigger('resize');
            },
          
    		/**
    		 * Description :  그리드에서 date type으로 가져온 값 format 변경 
    		 *  
    		 */             
            getGridDateFormat:function(date, option){
            	if(modComm.isEmpty(date)) return "";
            	if(date.length != 6 && date.length != 8 && date.length != 14) return date;            	
            	
            	var year  = date.substr(0,4);
            	var mon  = date.substr(4,2);
            	var day   = "01"
            	var hour  = "00";
            	var min   = "00";
            	var sec    = "00";
            	
            	if(date.length >=8) {
            		day = date.substr(6,2);
            	}
            	if(date.length > 8) {
            		hour = date.substr(8,2);
            		min  = date.substr(10,2);
            		sec   = date.substr(12,2);
            	}
            	if(option == "date_time") {
            		return year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
            	}
            	else if(option == "month") {
            		return year + "-" + mon;
            	}
            	else {
            		return year + "-" + mon + "-" + day;
            	}
            	return 
            },
            
    		/**
    		 * Description :  YYYYMMDD 에 날짜를 더하여 리턴 
    		 *  
    		 */            
            addDate:function(date, add){
            	if(modComm.isEmpty(date)) return date;
            	if(date.length != 8) return date;
            	
            	var rtnDate = new Date(date.substr(0,4) + "-" + date.substr(4,2) + "-" + date.substr(6,2));
            	rtnDate.setDate(rtnDate.getDate() + add);
            	            	
            	return rtnDate.format("yyyyMMdd");
            },
            
    		/**
    		 * Description :  YYYYMMDD 에 월을 더하여 리턴 
    		 *  
    		 */            
            addMonth:function(date, add){
            	if(modComm.isEmpty(date)) return date;
            	if(date.length != 8) return date;
            	
            	var rtnDate = new Date(date.substr(0,4) + "-" + date.substr(4,2) + "-" + date.substr(6,2));
            	rtnDate.setMonth(rtnDate.getMonth() + add);
            	            	
            	return rtnDate.format("yyyyMMdd");
            },            
            
        	/**
        	 * 엑셀출력을 위한 그리드컬럼정보 element 생성
        	 */		
            addGridColEl:function(gridId, labelId, nameId, widthId, alignId) {
        		//gridColModel
        		var arrGridCol	= $("#"+gridId).getGridParam("colModel");
        		var arrGridLabelList = new Array();
        		var arrGridNameList = new Array();
        		var arrGridWidthList = new Array();
        		var arrGridAlignList = new Array();
        		var start = 0;	
        		if($("#" + gridId).getGridParam("rownumbers")) {
        			start = 1;
        		}
        		
        		var index = 0;
        		for(var i = start; i < arrGridCol.length; i++ ) {
        			if(arrGridCol[i].width > 0 && arrGridCol[i].hidden != true) {
        				arrGridLabelList[index] = arrGridCol[i].label;
        				arrGridNameList[index] = arrGridCol[i].name;
        				arrGridWidthList[index] = arrGridCol[i].width;
        				arrGridAlignList[index] = arrGridCol[i].align;

        				index++;
        			}
        		}	
        		
        		$("#"+ labelId).val(arrGridLabelList);
        		$("#"+ nameId).val(arrGridNameList);
        		$("#"+ widthId).val(arrGridWidthList);
        		$("#"+ alignId).val(arrGridAlignList);		
        	},
        	
        	/**
        	 * 문자열을 유니코드배열로 변환
        	 */	        	
        	stringToUnicodeArray: function(input) {
        		var arr = new Array();
        		
        		if(!modComm.isEmpty(input)) {
        			var len = input.length;
        			for(i=0; i<len; i++)
        			{
        				arr.push(input.charCodeAt(i));
        			}
        		}
        		
        		return arr;
        	}
            
    };
    
    w["modComm"] = modComm;
    
    
    
	/**
	 * Description : 
	 * Ex) 
	 * 
	 */      
    if (String.prototype.string == undefined) {
        String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    }
    
    if (String.prototype.zf == undefined) {
        String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    }

    if (Number.prototype.zf == undefined) {
        Number.prototype.zf = function(len){return this.toString().zf(len);};
    }

    if (Date.prototype.format == undefined) {
        /**
         * Description : 입력받은 값을 Date Format으로 리턴
         * Ex)  2011년 09월 11일 오후 03시 45분 42초
                  >> console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
                2011-09-11
                  >> console.log(new Date().format("yyyy-MM-dd"));
                '11 09.11
                  >> console.log(new Date().format("'yy MM.dd"));
                2011-09-11 일요일
                  >> console.log(new Date().format("yyyy-MM-dd E"));
                현재년도 : 2011
                  >>console.log("현재년도 : " + new Date().format("yyyy"));
         */
        Date.prototype.format = function(f, inp) {
            if (!this.valueOf()) return " ";
         
            var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            var d = this;
             
            return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
                switch ($1) {
                    case "yyyy": return d.getFullYear(inp);
                    case "yy": return (d.getFullYear(inp) % 1000).zf(2);
                    case "MM": return (d.getMonth(inp) + 1).zf(2);
                    case "dd": return d.getDate(inp).zf(2);
                    case "E": return weekName[d.getDay(inp)];
                    case "HH": return d.getHours(inp).zf(2);
                    case "hh": return ((h = d.getHours(inp) % 12) ? h : 12).zf(2);
                    case "mm": return d.getMinutes(inp).zf(2);
                    case "ss": return d.getSeconds(inp).zf(2);
                    case "a/p": return d.getHours(inp) < 12 ? "오전" : "오후";
                    default: return $1;
                }
            });
        }
    }

    if (Date.toDate == undefined) {
        Date.toDate = function(dateString) {
            var regDatetime = /^[0-9]{4}-(?:[0]?[0-9]{1}|10|11|12)-(?:[012]?[0-9]{1}|30|31)(?: (?:[01]?[0-9]{1}|20|21|22|23)(?::[0-5]?[0-9]{1})?(?::[0-5]?[0-9]{1})?)?$/;
            if(regDatetime.test(dateString) === false) {
                return "";
            }

            var a = dateString.split(" ");
            var d = a[0].split("-");
            var t = null;
            if (_CVAL(a[1])) {
                t = a[1].split(":"); 
            } else {
                t = new Array();
                t[0] = "00";
                t[1] = "00";
                t[2] = "00";
            }
            

            var date = new Date(d[0], (d[1]-1), d[2], t[0], t[1], t[2], 0);

            return date;
        }
    }
    
    
    var modAjax = {
    		/**
    		 * Description :  서버요청처리
    		 *
    		 * 파라미터
    		 *  url :  controller 의 @RequestMapping value 에 해당하는 url
    		 *  paramObj : controller 의 paramVO 에 선언된 변수명과 동일하게 명과 값을 set한 json data
    		 *  options
    		 *  options.async : 동기방식을원하는 경우 false로 set
    		 *  options.success : 요청처리 success 시 처리할 함수
    		 *  options.error : 요청처리 error 시 처리할 함수  
    		 */     		
            request: function(url, paramObj, options) {
                
                if (modComm.isEmpty(options) == true) {
                    options = {
                            async: true,
                    };
                } else {
                    if (modComm.isEmpty(options.async) == true) {
                        options.async = true;
                    }
                }
                
                try {
                    $.ajax({
                        async: options.async,
                        type: "POST",
                        url: url,
                        data: paramObj,
//                        contentType:"application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data) {
                        	//console.log("공통 ajax 성공!!");
                            //console.log(data);

                            try {
                                if (!modComm.isEmpty(options.success) && typeof options.success == "function") {
                                    options.success(data);
                                }
                            }catch(e){
                                alert('데이터 처리도중 문제가 발생했습니다.');
                                console.log("[error tr data : "+e.message+"] 데이터 처리도중 문제가 발생했습니다.");
                                console.log("[Error Stack]\n"+ e.stack);
                            }
                            //$("#result1").append(data);
                        },
                        error : function(xhr, status, err) {
                                            
                            var response = new Object();
                            
                            response.rsMsg = "서버와의 통신이 실패했습니다.[" + xhr.status + "]";
                          
                            try {
                                if (!modComm.isEmpty(options.error) && typeof options.error == "function") {
                                    options.error(response);
                                }
                            }catch(e){
                                alert('데이터 처리도중 문제가 발생했습니다.');
                                //console.log("[error tr data : "+e.message+"] 데이터 처리도중 문제가 발생했습니다.");
                                //console.log("[Error Stack]\n"+ e.stack);
                            }
                            // alert('서버와의 통신이 실패했습니다.');
                        }
                    });
                } catch(e) {
                    var response = new Object();
                    
                    response.rsMsg = "Ajax 수행 중 오류가 발생하였습니다.";

                    if (modComm.checkVal(options.error) == true) {
                        options.error(response);
                    }
                }
            }
    };
    
    w["modAjax"] = modAjax;
    
})(window);