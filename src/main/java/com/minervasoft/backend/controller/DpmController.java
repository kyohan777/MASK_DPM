package com.minervasoft.backend.controller;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Method;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.type.TypeException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParseException;
import com.minervasoft.backend.service.DpmService;
import com.minervasoft.backend.vo.CalibVerifiVo;
import com.minervasoft.backend.vo.CommonVO;
import com.minervasoft.backend.vo.InspectVO;
import com.minervasoft.backend.vo.LoginChrrVO;
import com.minervasoft.backend.vo.ResponseCalibVerifiVo;
import com.minervasoft.backend.vo.ResponseInspectVo;
import com.minervasoft.backend.vo.ResponseSelOneLoginChrrVO;
import com.minervasoft.backend.vo.ResponseUserManageVo;
import com.minervasoft.backend.vo.UserManageVo;

@Controller
public class DpmController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Resource(name = "DpmService")
    private DpmService dpmService;
    
    
    /********************************************* 
     * ????????? ??? ??????  
     *********************************************/
    
    /**
     * ?????????ID ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/login/loginCheck.do")
    @ResponseBody
    public ResponseSelOneLoginChrrVO selectLoginChkInfo(LoginChrrVO paramVO) {
    	Calendar getToday = Calendar.getInstance();
		getToday.setTime(new Date()); //?????? ??????
    	ResponseSelOneLoginChrrVO response = new ResponseSelOneLoginChrrVO();
        
        try {
        	LoginChrrVO one = dpmService.selOneLoginChrr(paramVO);
        	if(one != null) {//????????? ???????????? ??????
        		response.setSelOne(one);
        			String password = paramVO.getChrrPwd();
        			String hex = "";
        			MessageDigest md = MessageDigest.getInstance("SHA-256");
            		// ?????? ?????????
            		md.update(password.getBytes());
            		hex = String.format("%064x", new BigInteger(1, md.digest()));
            		if(!hex.equals(one.getChrrPwd())) {
            			one.setPwdYn("N");
            		}else {//???????????? ????????? ??????
            			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(one.getXpDtm());
            			Calendar cmpDate = Calendar.getInstance();
            			cmpDate.setTime(date); //?????? ??????
            			long diffSec = (getToday.getTimeInMillis() - cmpDate.getTimeInMillis()) / 1000;
            			long diffDays = diffSec / (24*60*60); //????????? ??????
            			if(80 <= diffDays && diffDays<90) {//???????????? ????????? 10??? ??? ?????? ??????
            				one.setXp10DayYn("Y");
            				one.setXpDay(90-diffDays);
            			}else if (diffDays >= 90) {//???????????? ??????
            				one.setXpYn("Y");
            			}
            		}
        	}else {
        		response.setSelOne(one);
        	}
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    //?????? ?????? : admin - 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    
//    @RequestMapping(value = "/login/getUserInfoSSO.do")
//    public String getUserInfoSSO(ChrrVO paramVO, HttpServletRequest request, ModelMap modelMap) {
//    	
//        try {
//        	
//
//        	String sRemoteAddr = request.getRemoteAddr();
//        	String sApiKey = "368B184727E89AB69FAF";
//        	InetAddress inetAddress = InetAddress.getLocalHost();
//        	String ip = inetAddress.toString();
//        	String sToken = "";
//        	int nResult = -1;
//        	logger.debug("ip : " + ip);
//        	if (ip.contains("10.254.12.106")) { //ip.contains("10.254.10.124")||
//        		SSO sso = new SSO(sApiKey)	;	
//        		SsoAuthInfo authInfo = new SsoAuthInfo();
//        		Cookie[] cs = request.getCookies();
//				if(cs != null) {
//					for(int i=0; i<cs.length; i++) {
//						logger.debug("cs[i].getName() : " + cs[i].getName());
//						if(cs[i].getName().equals("ssotoken")) {
//							if(cs[i].getValue()!="") {
//								logger.debug("cs[i].getValue() : " + cs[i].getValue());
//								nResult = sso.verifyToken(cs[i].getValue());
//								logger.debug("nResult: " + nResult);
//								if(nResult >= 0) {
//									sToken = cs[i].getValue();
//								}
//							}
//						}
//					}
//				}	
//				if (!sToken.equals("")) {
//					authInfo = sso.userView(sToken, sRemoteAddr);
//					
//					String sUserName = authInfo.getUserName();
//				}
//        		
//        	}
////        		String sID = "";
////        		String sPwd = "";
////        		String sApiKey = "368B184727E89AB69FAF";
////        		int nResult = -1;
////        		
////        		
////        		LoginChrrVO loginInfoVO = dpmService.selOneLoginChrr(paramVO);
////        		sID = paramVO.getChrrId();
////        		sPwd = paramVO.getChrrPwd();
////        		
////        		authInfo = sso.authID(sID, sPwd, true, sRemoteAddr);
////        		nResult = sso.getLastError();
////        		if (nResult >= 0) {
////        			//????????????????????? ?????????????????? ??????
////                	if(loginInfoVO != null && !"".equals(loginInfoVO.getChrrId())) {
////                		request.getSession().setAttribute("loginInfo", loginInfoVO);
////                		request.getSession().setMaxInactiveInterval(60*300);
////                		
////                		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
////                		modelMap.addAttribute("chrrId", loginInfoVO.getChrrId());
////                		modelMap.addAttribute("chrrNm", loginInfoVO.getChrrNm());
////                		modelMap.addAttribute("contentPage", "firstView.jsp");
////                		
////                		returnPage = "dpm/main";
////                	} else {
////                		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
////                	}
////        		}
////        		else {
////        			modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
////        		}
////        	}else {
//        		LoginChrrVO loginInfoVO = dpmService.selOneLoginChrr(paramVO);
//
//            	//????????????????????? ?????????????????? ??????
//            	if(loginInfoVO != null && !"".equals(loginInfoVO.getChrrId())) {
//            		request.getSession().setAttribute("loginInfo", loginInfoVO);
//            		request.getSession().setMaxInactiveInterval(60*300);
//            		
//            		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
//            		modelMap.addAttribute("chrrId", loginInfoVO.getChrrId());
//            		modelMap.addAttribute("chrrNm", loginInfoVO.getChrrNm());
//            		modelMap.addAttribute("contentPage", "firstView.jsp");
//            		
//            		returnPage = "dpm/main";
//            	} else {
//            		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
//            	}
//        		
//        	//}
//        	
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//        
//        return returnPage;
//        
//    } 
    
    /**
     * ???????????????
     * @param paramVO
     * @param request
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/login/login.do")
    public String login(LoginChrrVO paramVO, HttpServletRequest request, ModelMap modelMap) {
    	String returnPage = "dpm/login";
    	
        try {
        		LoginChrrVO loginInfoVO = dpmService.selOneLoginChrr(paramVO);
            	//????????????????????? ?????????????????? ??????
            	if(loginInfoVO != null && !"".equals(loginInfoVO.getChrrId())) {
            		request.getSession().setAttribute("loginInfo", loginInfoVO);
            		request.getSession().setMaxInactiveInterval(60*300);
            		
            		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
            		returnPage = "dpm/firstView";
            	} else {
            		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
            	}
        	
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return returnPage;
        
    } 
    
    
    @RequestMapping(value = "/login/loginSSO.do")
    public String login2(LoginChrrVO paramVO, HttpServletRequest request, ModelMap modelMap) {
    	String returnPage = "dpm/login";
    	
        try {
        	

        	String sRemoteAddr = request.getRemoteAddr();
        	InetAddress inetAddress = InetAddress.getLocalHost();
        	String ip = inetAddress.toString();
        	logger.debug("ip : " + ip);
        	
        		LoginChrrVO loginInfoVO = dpmService.selOneLoginChrr(paramVO);

            	//????????????????????? ?????????????????? ??????
            	if(loginInfoVO != null && !"".equals(loginInfoVO.getChrrId())) {
            		request.getSession().setAttribute("loginInfo", loginInfoVO);
            		request.getSession().setMaxInactiveInterval(60*300);
            		
            		modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
            		modelMap.addAttribute("chrrId", loginInfoVO.getChrrId());
            		modelMap.addAttribute("chrrNm", loginInfoVO.getChrrNm());
            		
            		returnPage = "dpm/dpmDayPro";
            	} else {
            		//modelMap.addAttribute("loginResult", "???????????? ?????????????????????.");
            	}
        		
        	
        	
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return returnPage;
        
    } 
    
    
    /**
     * ???????????? ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/login/updateChrrPwd.do")
    @ResponseBody
    public ResponseSelOneLoginChrrVO updateChrrPwd(LoginChrrVO paramVO) {
    	ResponseSelOneLoginChrrVO response = new ResponseSelOneLoginChrrVO();
        try {
        	String password = paramVO.getChrrPwd();
        	String hex = "";
        	MessageDigest md = MessageDigest.getInstance("SHA-256");
            // ?????? ?????????
            md.update(password.getBytes());
            hex = String.format("%064x", new BigInteger(1, md.digest()));
            paramVO.setChrrPwd(hex);
            dpmService.updateChrrPwd(paramVO);
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
   
    
    /**
     * ????????????, ?????? ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getServerDateTime.do")
    @ResponseBody
    public CommonVO getServerDateTime() {
        
    	CommonVO response = new CommonVO();
        
    	SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
    	SimpleDateFormat formatTime = new SimpleDateFormat("yyyyMMddHHmmss");
    	
    	String date = formatDate.format(System.currentTimeMillis());
    	String time = formatTime.format(System.currentTimeMillis());
    	
    	response.setServerDate(date);
    	response.setServerTime(time);
        
        return response;
    }

    /**
     * ??????????????? ??????
     * @param request
     * @return
     */
    private String getBrowser(HttpServletRequest request) {

        String header =request.getHeader("User-Agent");
        if (header.contains("MSIE")) {
               return "MSIE";

        } else if(header.contains("Chrome")) {
               return "Chrome";

        } else if(header.contains("Opera")) {
               return "Opera";
        }

        return "Firefox";
    }
    
    /**
     * ???????????? ?????? header?????? set
     * @param request
     * @param response
     * @param fileName
     * @throws Exception
     */
    private void setExcelDownloadHeader(HttpServletRequest request, HttpServletResponse response, String fileName) throws Exception {
    	 String header = getBrowser(request);

    	 if (header.contains("MSIE")) {

  	        String docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");

  	        response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");

  	 } else if (header.contains("Firefox")) {

  	        //String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

  	        //response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
  		 	String docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");

	        response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");

  	 } else if (header.contains("Opera")) {

  	        String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

  	        response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");

  	 } else if (header.contains("Chrome")) {

  	        String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

  	        response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");

  	 }
       response.setCharacterEncoding("UTF-8");
       response.setContentType("application/vnd.ms-excel");
       response.setHeader("Pragma","public");
       response.setHeader("Expires","0");
    }
    

    /***************************************************
     * 2023.01.09
     * *************************************************/  
    
    
    
    /**
     *  [IMR] ?????? ??????:: ?????? ?????? ?????? cnt ??????
     *  2022.12.08 ?????? ?????? 
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getdpmExportHistoryInfoTotRowCnt.do")
    @ResponseBody
    public ResponseCalibVerifiVo getdpmExportHistoryInfoTotRowCnt(CalibVerifiVo paramVO) {
    	ResponseCalibVerifiVo response = new ResponseCalibVerifiVo();
        
        try {
        	CalibVerifiVo one = dpmService.getdpmExportHistoryInfoTotRowCnt(paramVO);
        	if(one != null) {
        		response.setTotRowCnt(one.getTotRowCnt());
        	}
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     *  [IMR] ?????? ????????? ?????? ?????? ??????
     *  2022.12.08 ?????? ?????? 
     * @param CalibVerifiVo
     * @return
     */
    @RequestMapping(value = "/dpm/getdpmExportHistoryInfo.do")
    @ResponseBody
    public ResponseCalibVerifiVo getdpmExportHistoryInfo(CalibVerifiVo paramVO) {
    	ResponseCalibVerifiVo response = new ResponseCalibVerifiVo();
        
        try {
            List<CalibVerifiVo> list = dpmService.getdpmExportHistoryInfo(paramVO);
            response.setSelList(list);
            response.setPageNumber(paramVO.getPageNumber());
            response.setTotPageCnt(paramVO.getTotPageCnt());
            response.setTotRowCnt(paramVO.getTotRowCnt());
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
            response.setSelList(new ArrayList<CalibVerifiVo>());
        }
        
        return response;
    }
    
    
    /**
     *  ????????? ??????  ?????? cnt ??????
     *  2022.12.12 ?????? ?????? 
     * @param CalibVerifiVo
     * @return
     */
    @RequestMapping(value = "/dpm/getdpmUserManageInfoTotRowCnt.do")
    @ResponseBody
    public ResponseUserManageVo getdpmUserManageInfoTotRowCnt(UserManageVo paramVO) {
    	ResponseUserManageVo response = new ResponseUserManageVo();
        
        try {
        	UserManageVo one = dpmService.getdpmUserManageInfoTotRowCnt(paramVO);
        	if(one != null) {
        		response.setTotRowCnt(one.getTotRowCnt());
        	}
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     *  ????????? ?????? ??????
     *  2022.12.12 ?????? ?????? 
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getdpmUserManageInfo.do")
    @ResponseBody
    public ResponseUserManageVo getdpmUserManageInfo(UserManageVo paramVO) {
    	ResponseUserManageVo response = new ResponseUserManageVo();
        
        try {
            List<UserManageVo> list = dpmService.getdpmUserManageInfo(paramVO);
            response.setSelList(list);
            response.setPageNumber(paramVO.getPageNumber());
            response.setTotPageCnt(paramVO.getTotPageCnt());
            response.setTotRowCnt(paramVO.getTotRowCnt());
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
            response.setSelList(new ArrayList<UserManageVo>());
        }
        
        return response;
    }
    
    /**
     * ????????? ?????? ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/insertUserInfo.do")
    @ResponseBody
    public ResponseUserManageVo insertUserInfo(UserManageVo paramVO,HttpServletRequest request) {
    	ResponseUserManageVo response = new ResponseUserManageVo();
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        paramVO.setRgId(loginVO.getChrrId());
        try {
        	// ???????????? ??????
        	String password = paramVO.getChrrPwd();
    		String hex = "";
    		
//    		// "SHA1PRNG"??? ???????????? ??????
//    		SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
//    		byte[] bytes = new byte[16];
//    		random.nextBytes(bytes);
//    		// SALT ??????
//    		String salt = new String(Base64.getEncoder().encode(bytes));
//    		String rawAndSalt = password+salt;
//    		
//    		System.out.println("raw : "+password);
//    		System.out.println("salt : "+salt);
    		
    		MessageDigest md = MessageDigest.getInstance("SHA-256");
    		// ?????? ?????????
    		md.update(password.getBytes());
    		hex = String.format("%064x", new BigInteger(1, md.digest()));
    		
//    		// ??????+salt ?????????
//    		md.update(rawAndSalt.getBytes());
//    		hex = String.format("%064x", new BigInteger(1, md.digest()));
//    		System.out.println("raw+salt??? ????????? : "+hex);
            
            paramVO.setChrrPwd(hex);
        	dpmService.insertUserInfo(paramVO);
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     * ????????? ?????? ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/updateUserInfo.do")
    @ResponseBody
    public ResponseUserManageVo updateUserInfo(UserManageVo paramVO,HttpServletRequest request) {
    	ResponseUserManageVo response = new ResponseUserManageVo();
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        paramVO.setRgId(loginVO.getChrrId());
        try {
        	if(paramVO.getChrrPwd() != null && paramVO.getChrrPwd() !="") {
        		// ???????????? ??????
            	String password = paramVO.getChrrPwd();
        		String hex = "";
        		MessageDigest md = MessageDigest.getInstance("SHA-256");
        		// ?????? ?????????
        		md.update(password.getBytes());
        		hex = String.format("%064x", new BigInteger(1, md.digest()));
        		 paramVO.setChrrPwd(hex);
        	}
        	dpmService.updateUserInfo(paramVO);
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     * ????????? ?????? ??????
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/deleteUserInfo.do")
    @ResponseBody
    public ResponseUserManageVo deleteUserInfo(UserManageVo paramVO,HttpServletRequest request) {
    	ResponseUserManageVo response = new ResponseUserManageVo();
        try {
        	dpmService.deleteUserInfo(paramVO);
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }
    
    
    
    /**
     * ????????? ?????? > ?????? ??????
     * @param paramVO
     * @param modelMap
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/selListUserInfoExcel.do")
    public void selListUserInfoExcel(UserManageVo paramVO, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	List<UserManageVo> list = new ArrayList<>();    	
    	CommonVO commonVO 		 = getServerDateTime();
    	String filename 		 = commonVO.getServerTime().concat("_????????? ??????.xlsx");    	
    	setExcelDownloadHeader(request, response, filename);
    	UserManageVo one = dpmService.getdpmUserManageInfoTotRowCnt(paramVO);
    	
    	int pageSize   = 10000;
    	int totRowCnt  = one.getTotRowCnt() ;
    	int totPageCnt = (int) Math.floor(totRowCnt/pageSize)+1;	    	
    	paramVO.setPageSize(pageSize);
    	
    	for(int pageNumber = 1; pageNumber <= totPageCnt; pageNumber++) {
    		paramVO.setPageNumber(pageNumber);
    		List<UserManageVo> listPage = dpmService.getdpmUserManageInfo(paramVO);
    		list.addAll(listPage);
    	}
    	
    	modelMap.put("gridLabels", paramVO.getGridLabels());
    	modelMap.put("gridNames", paramVO.getGridNames());
    	modelMap.put("gridWidths", paramVO.getGridWidths());
    	modelMap.put("VO", "UserManageVo");
    	modelMap.put("excelList", list);
    	
    	excelDownload(modelMap,request,response);
        
    }
    
    
    @SuppressWarnings("unchecked")
	protected final void excelDownload(Map<String,Object> model, HttpServletRequest request , HttpServletResponse response) throws Exception {
    	logger.debug("excelDownload start!!!!");
    	List<Object> rowList  = new ArrayList<>();    	
    	String gridLabels    = (String) model.get("gridLabels");
        String gridNames     = (String) model.get("gridNames");
        String gridWidths    = (String) model.get("gridWidths");
        rowList = (ArrayList<Object>) model.get("excelList");
        String vo =  (String) model.get("VO");
        Class<?> voClass = Class.forName("com.minervasoft.backend.vo." + vo);                        
        List<Method> methodList = new ArrayList<Method>();            
        String[] nameList = gridNames.split(",");
        
        for(String name : nameList) {
        	String methodName = "get" + name.substring(0, 1).toUpperCase() + name.substring(1);
        		methodList.add(voClass.getMethod(methodName,null));
        }
        
        try(Workbook workbook = new XSSFWorkbook()) {
        	
            Sheet sheet = workbook.createSheet();
            String[] widthList = gridWidths.split(",");
            for(int i=0; i<widthList.length; i++) {
            	sheet.setColumnWidth(i, Integer.parseInt(widthList[i]) * 50);
            }
            
            int rowNo = 0;
            Row headerRow;
            
            String[] labelList = gridLabels.split(",");
            headerRow = sheet.createRow(rowNo++);
	    	if(labelList != null) {
	    		for(int i=0; i<labelList.length; i++) {
	    			Cell cell = headerRow.createCell(i);
	    			cell.setCellValue(labelList[i]);
	    		}
	    	}
	    	
	    	if(rowList != null) {
            	for(int i = 0; i < rowList.size(); i++) {
            		Row aRow = (Row) sheet.createRow(rowNo++);
            		setEachRow(aRow, rowList.get(i), methodList);
            	}
            		
            }
     
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch(TypeException e) {
        	e.printStackTrace();
        } catch(Exception e) {
            e.printStackTrace();
        }
        
    }
    
    /**
     * ??? ????????? ??????
     * @param aRow
     * @param vo
     * @param methodList
     * @throws Exception
     */
    private void setEachRow(Row aRow, Object vo, List<Method> methodList) throws Exception {
    	for(int i=0; i<methodList.size(); i++) {
    		Cell cell = aRow.createCell(i);
    		if(!methodList.get(i).invoke(vo).equals(null)) {
    			if(methodList.get(i).getGenericReturnType().getTypeName().contains("String")) {
    				String val = methodList.get(i).invoke(vo).toString();
        			cell.setCellValue(val);
    			}else {
    				Integer val = Integer.parseInt(methodList.get(i).invoke(vo).toString());
    				cell.setCellValue(val);
    			}
    		}
    	}
    }	
    
    
    /**
     *  ????????? ?????? ?????? ?????? cnt ??????
     *  2023.01.09 
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmInspectStatInfoTotRowCnt.do")
    @ResponseBody
    public ResponseInspectVo getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
        	InspectVO one = dpmService.getDpmInspectStatInfoTotRowCnt(paramVO);
        	if(one != null) {
        		response.setTotRowCnt(one.getTotRowCnt());
        	}
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     *  ????????? ?????? ?????? ??????
     *  2023.01.09
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmInspectStatInfo.do")
    @ResponseBody
    public ResponseInspectVo getDpmInspectStatInfo(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
        	//?????? ???????????? ?????? ????????? ?????? ?????? ?????? json????????? code?????? ????????? ??? code ???????????? ?????? ??? ????????????
        	//??????????????? ?????????????????? ?????? ???????????? ?????? ?????????
        	//jsonCodeParseInsert();
            List<InspectVO> list = dpmService.getDpmInspectStatInfo(paramVO);
            //dpmService.codeTableDel();
            response.setSelList(list);
            response.setPageNumber(paramVO.getPageNumber());
            response.setTotPageCnt(paramVO.getTotPageCnt());
            response.setTotRowCnt(paramVO.getTotRowCnt());
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
            response.setSelList(new ArrayList<InspectVO>());
        }
        
        return response;
    }
    
    
    
    /**
     * ?????? ?????? ?????? > ?????? ??????
     * @param paramVO
     * @param modelMap
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/selListDpmInspectStatInfoExcel.do")
    public void selListDpmInspectStatInfoExcel(InspectVO paramVO, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	List<InspectVO> list  = new ArrayList<>();    	
    	CommonVO commonVO 		 = getServerDateTime();
    	String filename 		 = commonVO.getServerTime().concat("_????????? ?????? ??????.xlsx");    	
    	setExcelDownloadHeader(request, response, filename);
    	InspectVO one = dpmService.getDpmInspectStatInfoTotRowCnt(paramVO);
    	int pageSize   = 10000;
    	int totRowCnt  = one.getTotRowCnt() ;
    	int totPageCnt = (int) Math.floor(totRowCnt/pageSize)+1;
    	paramVO.setPageSize(pageSize);
    	
    	for(int pageNumber = 1; pageNumber <= totPageCnt; pageNumber++) {
    		paramVO.setPageNumber(pageNumber);
    		List<InspectVO> listPage = dpmService.getDpmInspectStatInfo(paramVO);
    		list.addAll(listPage);
    	}
    	
    	modelMap.put("gridLabels", paramVO.getGridLabels());
    	modelMap.put("gridNames",  paramVO.getGridNames());
    	modelMap.put("gridWidths", paramVO.getGridWidths());
    	modelMap.put("headerMergeYn","N");
    	modelMap.put("VO", "InspectVO");
    	modelMap.put("excelList", list);
    	
    	excelDownload(modelMap,request,response);
    	
        
    }
    
    
    /**
     * ?????? ?????? ?????? ?????? ?????? ??????
     * @param paramVO
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/getBatchTotCnt.do")
    public ResponseInspectVo getBatchTotCnt(InspectVO paramVO, ModelMap modelMap) throws Exception {    	
    	ResponseInspectVo response = new ResponseInspectVo();
    	try {
    		response.setRsYn("Y");
    		InspectVO one = dpmService.getBatchTotCnt();
			if(one.getTotRowCnt() <= 0) {
				response.setRsYn("N");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return response;
    }
    
    
    /**
     * ?????? ??????
     * @param paramVO
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/dpmBatchStart.do")
    public ResponseInspectVo dpmBatchStart(InspectVO paramVO, ModelMap modelMap) throws Exception {    	
    	ResponseInspectVo response = new ResponseInspectVo();
    	try {
    		List<InspectVO>  list = dpmService.getDpmBatchInfo(paramVO);
    		dpmService.insertBatchInfo(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return response;
    }
    
    
    /**
     *  ?????? ?????? ?????? ?????? ??????
     *  2023.01.11
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmDayProInfoTotRowCnt.do")
    @ResponseBody
    public ResponseInspectVo getDpmDayProInfoTotRowCnt(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
        	InspectVO one = dpmService.getDpmDayProInfoTotRowCnt(paramVO);
        	if(one != null) {
        		response.setTotRowCnt(one.getTotRowCnt());
        	}
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     *  ?????? ?????? ?????? ??????
     *  2023.01.11
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmDayProInfo.do")
    @ResponseBody
    public ResponseInspectVo getDpmDayProInfo(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
            List<InspectVO> list = dpmService.getDpmDayProInfo(paramVO);
            response.setSelList(list);
            response.setPageNumber(paramVO.getPageNumber());
            response.setTotPageCnt(paramVO.getTotPageCnt());
            response.setTotRowCnt(paramVO.getTotRowCnt());
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
            response.setSelList(new ArrayList<InspectVO>());
        }
        
        return response;
    }
    
    
    /**
     * ?????? ?????? ?????? > ?????? ??????
     * @param paramVO
     * @param modelMap
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/selListDpmDayProExcel.do")
    public void selListDpmDayProExcel(InspectVO paramVO, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	
    	List<InspectVO> list  = new ArrayList<>();    	
    	CommonVO commonVO 		 = getServerDateTime();
    	String filename 		 = commonVO.getServerTime().concat("_?????? ?????? ??????.xlsx");    	
    	setExcelDownloadHeader(request, response, filename);
    	InspectVO one = dpmService.getDpmDayProInfoTotRowCnt(paramVO);
    	
    	int pageSize   = 10000;
    	int totRowCnt  = one.getTotRowCnt() ;
    	int totPageCnt = (int) Math.floor(totRowCnt/pageSize)+1;
    	paramVO.setPageSize(pageSize);
    	
    	for(int pageNumber = 1; pageNumber <= totPageCnt; pageNumber++) {
    		paramVO.setPageNumber(pageNumber);
    		List<InspectVO> listPage = dpmService.getDpmDayProInfo(paramVO);
    		list.addAll(listPage);
    	}

    	modelMap.put("gridLabels", paramVO.getGridLabels());
    	modelMap.put("gridNames",  paramVO.getGridNames());
    	modelMap.put("gridWidths", paramVO.getGridWidths());
    	modelMap.put("VO", "InspectVO");
    	modelMap.put("excelList", list);
    	
    	excelDownload(modelMap,request,response);
        
    }
    
    /**
     *  ?????? ?????? ?????? ?????? ??????
     *  2023.01.11 
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmMonthProInfoTotRowCnt.do")
    @ResponseBody
    public ResponseInspectVo getDpmMonthProInfoTotRowCnt(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
        	InspectVO one = dpmService.getDpmMonthProInfoTotRowCnt(paramVO);
        	if(one != null) {
        		response.setTotRowCnt(one.getTotRowCnt());
        	}
        	
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
    /**
     *  [IMR] ?????? ??????:: ?????? ?????? ?????? ??????
     *  2022.12.08 ?????? ?????? 
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/getDpmMonthProInfo.do")
    @ResponseBody
    public ResponseInspectVo getDpmMonthProInfo(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        
        try {
            List<InspectVO> list = dpmService.getDpmMonthProInfo(paramVO);
            response.setSelList(list);
            response.setPageNumber(paramVO.getPageNumber());
            response.setTotPageCnt(paramVO.getTotPageCnt());
            response.setTotRowCnt(paramVO.getTotRowCnt());
            
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
            response.setSelList(new ArrayList<InspectVO>());
        }
        
        return response;
    }
    
    
    /**
     * ?????? ?????? > ?????? ??????
     * @param paramVO
     * @param modelMap
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dpm/selListDpmMonthProExcel.do")
    public void selListDpmMonthProExcel(InspectVO paramVO, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	
    	List<InspectVO> list  = new ArrayList<>();    	
    	CommonVO commonVO 		 = getServerDateTime();
    	String filename 		 = commonVO.getServerTime().concat("_?????? ?????? ??????.xlsx");    	
    	setExcelDownloadHeader(request, response, filename);
    	InspectVO one = dpmService.getDpmMonthProInfoTotRowCnt(paramVO);
    	int pageSize   = 10000;
    	int totRowCnt  = one.getTotRowCnt() ;
    	int totPageCnt = (int) Math.floor(totRowCnt/pageSize)+1;
    	paramVO.setPageSize(pageSize);
    	
    	for(int pageNumber = 1; pageNumber <= totPageCnt; pageNumber++) {
    		paramVO.setPageNumber(pageNumber);
    		List<InspectVO> listPage = dpmService.getDpmMonthProInfo(paramVO);
    		list.addAll(listPage);
    	}
    	
    	modelMap.put("gridLabels", paramVO.getGridLabels());
    	modelMap.put("gridNames",  paramVO.getGridNames());
    	modelMap.put("gridWidths", paramVO.getGridWidths());
    	modelMap.put("VO", "InspectVO");
    	modelMap.put("excelList", list);
    	
    	excelDownload(modelMap,request,response);
    	
        
    }
    //???????????? ?????? json ?????? data TB_EM_PC_CODE ???????????? ??????
    private void jsonCodeParseInsert() throws Exception {
    	File dir2   = new File(this.getClass().getResource("/").getPath());
    	String path = dir2.getParentFile().getAbsolutePath();
    	JSONParser parser = new JSONParser();
        Object obj  = parser.parse(new FileReader(path+"/code/dpmCode.json"));
        JSONObject jo = (JSONObject) obj;
        JSONArray jsonArr = (JSONArray) jo.get("codeList");
        List<Map<String, Object>> list = getListMapFromJsonArray(jsonArr);
        for(Map<String, Object> map : list) {
        	dpmService.insertCode(map);
        }
    }
    
    /**
	 * JSONArray??? List<Map<String, String>>?????? ??????
	 * 
	 * @param jsonArray
	 * @return list
	 */
	public static List<Map<String, Object>> getListMapFromJsonArray(JSONArray jsonArray) {

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		if (jsonArray != null) {

			int jsonSize = jsonArray.size();

			for (int i = 0; i < jsonSize; i++) {

				Map<String, Object> map = getMapFromJsonObject((JSONObject)jsonArray.get(i));
				list.add(map);
			}
		}

		return list;
	}
	
	/**
	 * JSONObject??? Map<String, String>?????? ??????
	 * 
	 * @param jsonObject
	 * @return map
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObject) { 

		Map<String, Object> map = null;
		
		try {

			map = new ObjectMapper().readValue(jsonObject.toJSONString(), Map.class);

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return map;
	}
	
	
	/**
     *  ????????? ?????? ?????? ?????? ??????
     *  2023.01.16
     * @param paramVO
     * @return
     */
    @RequestMapping(value = "/dpm/insertSearchLog.do")
    @ResponseBody
    public ResponseInspectVo insertSearchLog(InspectVO paramVO) {
    	ResponseInspectVo response = new ResponseInspectVo();
        try {
        	dpmService.insertSearchLog(paramVO);
        } catch(Exception e) {
            e.printStackTrace();
            response.setRsYn("N");
        }
        
        return response;
    }    
    
  
     
}
