package com.minervasoft.backend.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.minervasoft.backend.vo.LoginChrrVO;

@Controller
public class ErrorController {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 에러페이지 호출
     * @param request
     * @param error_code
     * @param modelMap
     * @return
     */
    @RequestMapping(value="/common/error{error_code}.do")
    public String error(HttpServletRequest request, @PathVariable String error_code, RedirectAttributes redirectAttributes) {    	
    	Map<String, Object> errInfoMap = new HashMap<String, Object>();
        HttpSession session = request.getSession();
        LoginChrrVO loginVO = (LoginChrrVO) session.getAttribute("loginInfo");
            	
        String msg = (String) request.getAttribute("javax.servlet.error.message"); 
        
        errInfoMap.put("STATUS_CODE", request.getAttribute("javax.servlet.error.status_code"));
        errInfoMap.put("REQUEST_URI", request.getAttribute("javax.servlet.error.request_uri"));
        errInfoMap.put("EXCEPTION_TYPE", request.getAttribute("javax.servlet.error.exception_type"));
        errInfoMap.put("EXCEPTION", request.getAttribute("javax.servlet.error.exception"));
        errInfoMap.put("SERVLET_NAME", request.getAttribute("javax.servlet.error.servlet_name"));
        
        if(loginVO != null) {
        	errInfoMap.put("chrrId", loginVO.getChrrId());
        }
         
        if("Exception".equals(error_code) || "Throwable".equals(error_code)) {
        	msg = "시스템 오류가 발생하였습니다.";
        }
        else {
        	msg = "알 수 없는 오류가 발생하였습니다.";
        }
        errInfoMap.put("MESSAGE", msg);
         
        //logging
        
        if(errInfoMap.isEmpty() == false ) {
            Iterator<Entry<String,Object>> iterator = errInfoMap.entrySet().iterator();
            Entry<String,Object> entry = null;
            while(iterator.hasNext()) {
                entry = iterator.next();
                logger.info("key : "+entry.getKey()+", value : "+entry.getValue());
            }
        }
        
         
        redirectAttributes.addFlashAttribute("error", errInfoMap);
        
        return "redirect:/error/error.ui";
    }    
}
