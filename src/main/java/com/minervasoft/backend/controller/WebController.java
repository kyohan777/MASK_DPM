package com.minervasoft.backend.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.minervasoft.backend.service.DpmService;
import com.minervasoft.backend.vo.CalibVerifiVo;
import com.minervasoft.backend.vo.InspectVO;
import com.minervasoft.backend.vo.LoginChrrVO;
import com.minervasoft.backend.vo.StatisticsVO;

@Controller
public class WebController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Resource(name = "DpmService")
    private DpmService dpmService;

    /********************************************* 
     * 로그인 및 공통  
     *********************************************/    
    
    /**
     * 로그인
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/index.ui")
    public String index(ModelMap modelMap) {        
        try {

        } catch(Exception e) {
            e.printStackTrace();
        }        
        
        logger.debug("Called login");
        
        return "dpm/login";
    }
    
    /**
     * 로그인 후 첫화면 
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/firstView.ui")
    public String firstView(ModelMap modelMap) {
        try {        	
        
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/firstView";
    }      
    
    /**
     * 에러페이지(EXCEPTION 발생 등) 
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/error/error.ui")
    public String error(ModelMap modelMap, HttpServletRequest request) {
    	
    	Map<String, ?> inputFlashMap = RequestContextUtils.getInputFlashMap(request);
    	
        try {        	
        	if(inputFlashMap != null) {
        		
        		Map<String, Object> errInfoMap = (Map) inputFlashMap.get("error");
        		
        		modelMap.addAttribute("MESSAGE", errInfoMap.get("MESSAGE"));
        		modelMap.addAttribute("REQUEST_URI", errInfoMap.get("REQUEST_URI"));
        		modelMap.addAttribute("STATUS_CODE", errInfoMap.get("STATUS_CODE"));
        		modelMap.addAttribute("EXCEPTION_TYPE", errInfoMap.get("EXCEPTION_TYPE"));
        		modelMap.addAttribute("EXCEPTION", errInfoMap.get("EXCEPTION"));
        		modelMap.addAttribute("SERVLET_NAME", errInfoMap.get("SERVLET_NAME"));
        		modelMap.addAttribute("chrrId", errInfoMap.get("chrrId"));
        	}        	
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "error/error";
    }     
    
    
    
    
    /**
     * dpmInspectStat 업무별 점검 현황
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmInspectStat.do")
    public String dpmDailyPro(StatisticsVO pramVo,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        try {   
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        	//월별 통계 row 클릭시 prcDt 전달 값 셋팅
        	if(pramVo.getPrcDt() != "" && pramVo.getPrcDt() != null) 
        	{
        		modelMap.addAttribute("prcDt",pramVo.getPrcDt());
        	}	
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmInspectStat";
    }
    
    /**
     * dpmDailyPro 일별 처리 현황
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmDayPro.do")
    public String dpmDayPro(StatisticsVO pramVo,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        try {
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        	//월별 통계 row 클릭시 prcDt 전달 값 셋팅
        	if(pramVo.getPrcDt() != "" && pramVo.getPrcDt() != null) 
        	{
        		modelMap.addAttribute("prcDt",pramVo.getPrcDt());
        	}	
        		
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmDayPro";
    }
    /**
     * dpmDailyPro 월별 처리 현황
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmMonthPro.do")
    public String dpmMonthPro(LoginChrrVO loginInfoVO,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        try {        
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmMonthPro";
    }
    
    /**
     * dpmImrResViewerInfo IMR 결과 열람자 이력 조회 
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmExportHistoryInfo.do")
    public String dpmImrResViewerInfo(LoginChrrVO loginInfoVO,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
    	try {
    		modelMap.addAttribute("companyId", loginVO.getCompanyId());
    		modelMap.addAttribute("chrrId", loginVO.getChrrId());
    		modelMap.addAttribute("chrrNm", loginVO.getChrrNm());
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmExportHistoryInfo";
    }
    
    /**
     * dpmUserManageInfo 사용자 관리 화면 조회 
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmUserManageInfo.do")
    public String dpmUserManageInfo(LoginChrrVO loginInfoVO,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
    	try {
    		modelMap.addAttribute("companyId", loginVO.getCompanyId());
    		modelMap.addAttribute("chrrId", loginVO.getChrrId());
    		modelMap.addAttribute("chrrNm", loginVO.getChrrNm());
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmUserManageInfo";
    }
    
    /**
     * dpmCalibVerifiInfo 교정/검증 처리
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmCalibVerifiInfo.do")
    public String dpmCalibVerifiInfo(CalibVerifiVo loginInfoVO,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        try {        
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        //return "dpm/dpmCalibVerifiInfo";
        //KB 캐피탈 전용
        return "dpm/dpmCalibVerifiInfoKBC"; 
    }
    
    
    /**
     * 검증 결과조회
     * Kimsangmin
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/dpm/dpmImrResultInfo.do")
    public String dpmImrResultInfo(CalibVerifiVo loginInfoVO,ModelMap modelMap,HttpServletRequest request) {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        try {        
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmImrResultInfo";
    }
    
    
    /**
     * dpmCalibVerifiInfo 교정/검증 처리
     * Kimsangmin
     * @param modelMap
     * @return
     * @throws Exception 
     */
    @RequestMapping(value = "/dpm/dpmMaskVerifiInfo.do")
    public String dpmMaskVerifiInfo(CalibVerifiVo loginInfoVO,ModelMap modelMap,HttpServletRequest request) throws Exception {
    	HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
        List<CalibVerifiVo> codeList = dpmService.getJobCodeList();
        try {        
        	
        	modelMap.addAttribute("chrrId", loginVO.getChrrId());
        	modelMap.addAttribute("chrrNm", loginVO.getChrrNm());
        	modelMap.addAttribute("jobCodeList",codeList);
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return "dpm/dpmMaskVerifiInfo";
    }
    
    
    /**
     * 이미지 조회 > 반출 목적/사유 등록 팝업
     * Kimsangmin
     * @param modelMap
     * @return
     * @throws Exception 
     */
    @RequestMapping(value = "/dpm/dpmExportReason.do")
    public String dpmImgViewerPop(ModelMap modelMap) throws Exception {
        try {        
        } catch(Exception e) {
            e.printStackTrace();
        }
        return "dpm/exportReasonPopup";
    }
    
    /**
     * 이미지 조회 > 반출 원본/마스킹 임지 비교 팝업
     * Kimsangmin
     * @param modelMap
     * @return
     * @throws Exception 
     */
    @RequestMapping(value = "/dpm/dpmImgViewerPopup.do")
    public String dpmImgViewerPopup(ModelMap modelMap,InspectVO paramVO) throws Exception {
        try {       
        	InspectVO info = dpmService.getElementIdImg(paramVO);
        	modelMap.addAttribute("imgPathOrg",info.getImgPathOrg());
        	modelMap.addAttribute("elementId",info.getElementId());
        	modelMap.addAttribute("totalPageCnt",info.getImgTotalPageCnt());
        } catch(Exception e) {
            e.printStackTrace();
        }
        return "dpm/dpmImgViewerPopup";
    }

    
}
