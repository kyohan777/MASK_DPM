package com.minervasoft.backend.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.minervasoft.backend.vo.AgentAssignVO;
import com.minervasoft.backend.vo.BizStatsTodayVO;
import com.minervasoft.backend.vo.BizStatsVO;
import com.minervasoft.backend.vo.CalibVerifiVo;
import com.minervasoft.backend.vo.ChrrGroupAuthVO;
import com.minervasoft.backend.vo.ChrrVO;
import com.minervasoft.backend.vo.CodeVO;
import com.minervasoft.backend.vo.DailyStatsVO;
import com.minervasoft.backend.vo.GroupAuthVO;
import com.minervasoft.backend.vo.ImageVerifyVO;
import com.minervasoft.backend.vo.InspectVO;
import com.minervasoft.backend.vo.LoginChrrVO;
import com.minervasoft.backend.vo.MaskingHistoryVO;
import com.minervasoft.backend.vo.MenuAuthVO;
import com.minervasoft.backend.vo.MenuVO;
import com.minervasoft.backend.vo.MonthlyStatsVO;
import com.minervasoft.backend.vo.StatisticsVO;
import com.minervasoft.backend.vo.StepStatsVO;
import com.minervasoft.backend.vo.UserManageVo;
import com.minervasoft.backend.vo.XtromDailyStatsVO;


@SuppressWarnings("unchecked")
@Repository("DpmDAO")
public class DpmDAO extends AbstractDpmDAO {
    /********************************************* 
     * 로그인 및 공통  
     *********************************************/
    public LoginChrrVO selOneLoginChrr(LoginChrrVO paramVO) throws Exception {
        return (LoginChrrVO) selectOne("selOneLoginChrr", paramVO);
    }
    //IMR 결과 열람자 이력 조회
    public List<CalibVerifiVo> getdpmExportHistoryInfo(CalibVerifiVo paramVO) throws Exception {
        return (List<CalibVerifiVo>) selectList("getdpmExportHistoryInfo",paramVO);
    }
    //IMR 결과 열람자 이력 조회 전체 cnt 조회
    public CalibVerifiVo getdpmExportHistoryInfoTotRowCnt(CalibVerifiVo paramVO) throws Exception {
        return (CalibVerifiVo) selectOne("getdpmExportHistoryInfoTotRowCnt",paramVO);
    }    
    //사용자 관리 조회
    public List<UserManageVo> getdpmUserManageInfo(UserManageVo paramVO) throws Exception {
        return (List<UserManageVo>) selectList("getdpmUserManageInfo",paramVO);
    }
    //사용자 관리  조회 전체 cnt 조회
    public UserManageVo getdpmUserManageInfoTotRowCnt(UserManageVo paramVO) throws Exception {
        return (UserManageVo) selectOne("getdpmUserManageInfoTotRowCnt",paramVO);
    }    
    //사용자 등록
    public int insertUserInfo(UserManageVo paramVO) throws Exception {
        return (int) insert("insertUserInfo",paramVO);
    }    
    //사용자 정보 수정
    public int updateUserInfo(UserManageVo paramVO) throws Exception {
        return (int) update("updateUserInfo",paramVO);
    }    
    //사용자 정보 삭제
    public int deleteUserInfo(UserManageVo paramVO) throws Exception {
        return (int) update("deleteUserInfo",paramVO);
    }
  //사용자 정보 수정
    public int insertDailyStatics(StatisticsVO paramVO) throws Exception {
        return (int) insert("insertDailyStatics",paramVO);
    }    
    
    // 검증 확정
    public int updImrConfirm(StatisticsVO paramVO) throws Exception {
    	return (int) update("updImrConfirm",paramVO);
    }
    // 결과 조회 사유 입력
    public int insertViewReason(CalibVerifiVo paramVO) throws Exception {
        return (int) insert("insertViewReason",paramVO);
    }
    //월별 통계 조회
    public List<StatisticsVO> getPrcDtGroupList() throws Exception {
        return (List<StatisticsVO>) selectList("getPrcDtGroupList");
    }
    
    // mask 원복
    public int updMaskRecover(Map<String, String> param) throws Exception {
    	return (int) update("updMaskRecover", param);
    }
    
    // mask 원복
    public StatisticsVO getStarDateEndDate() throws Exception {
    	return (StatisticsVO) selectOne("getStarDateEndDate");
    }
    
    //비밀번호 변경 처리
    public int updateChrrPwd(LoginChrrVO param) throws Exception {
    	return (int) update("updateChrrPwd", param);
    }
    
    //업무별 처리 현황 전체 조회
    public InspectVO getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) throws Exception {
        return (InspectVO) selectOne("getDpmInspectStatInfoTotRowCnt",paramVO);
    }    
    //업무별 처리 현황 조회
    public List<InspectVO> getDpmInspectStatInfo(InspectVO paramVO) throws Exception {
        return (List<InspectVO>) selectList("getDpmInspectStatInfo", paramVO);
    }
    
    // 배치 정보 유무 조회
    public InspectVO getBatchTotCnt() throws Exception {
    	return (InspectVO) selectOne("getBatchTotCnt");
    }
    //배치 정보 조회
    public List<InspectVO> getDpmBatchInfo() throws Exception {
        return (List<InspectVO>) selectList("getDpmBatchInfo");
    }
    //배치정보 저장
    public int insertBatchInfo(InspectVO list) throws Exception {
    	return (int) insert("insertBatchInfo",list); 
    }
    //일별 통계 조회
    public List<InspectVO> getDpmDayProInfo(InspectVO paramVO) throws Exception {
        return (List<InspectVO>) selectList("getDpmDayProInfo", paramVO);
    }
    //일별 통계 전체 cnt 조회
    public InspectVO getDpmDayProInfoTotRowCnt(InspectVO paramVO) throws Exception {
        return (InspectVO) selectOne("getDpmDayProInfoTotRowCnt",paramVO);
    } 
    //월별 통계 조회
    public List<InspectVO> getDpmMonthProInfo(InspectVO paramVO) throws Exception {
        return (List<InspectVO>) selectList("getDpmMonthProInfo",paramVO);
    }
    //월별 통계 전체 cnt 조회
    public InspectVO getDpmMonthProInfoTotRowCnt(InspectVO paramVO) throws Exception {
        return (InspectVO) selectOne("getDpmMonthProInfoTotRowCnt",paramVO);
    }
    //json code 등록
    public void insertCode(Map<String, Object> map) throws Exception {
        insert("insertCode",map);
    }   
    //code table data 삭제
    public void codeTableDel() throws Exception {
    	update("codeTableDel");
    }    
    
}
