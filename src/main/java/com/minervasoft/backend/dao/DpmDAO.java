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
    
    /*
    public List<MenuAuthVO> selListMenuAuth(MenuAuthVO paramVO) throws Exception {
        return (List<MenuAuthVO>) selectList("selListMenuAuth", paramVO);
    }
    
    public List<CodeVO> selListCode(CodeVO paramVO) throws Exception {
        return (List<CodeVO>) selectList("selListCode", paramVO);
    }
    */
    
    /********************************************* 
     * 마스킹검증 
     *********************************************/
    /*
    public ImageVerifyVO selOneImageVerifyTotRowCnt(ImageVerifyVO paramVO) throws Exception {
        return (ImageVerifyVO) selectOne("selOneImageVerifyTotRowCnt", paramVO);
    }    
    
    public List<ImageVerifyVO> selListImageVerify(ImageVerifyVO paramVO) throws Exception {
        return (List<ImageVerifyVO>) selectList("selListImageVerify", paramVO);
    }
    
    public int updFpMaskObj(ImageVerifyVO paramVO) throws Exception {
    	return (int) update("updFpMaskObj", paramVO);
    }
    
    public int insFpMaskHis(MaskingHistoryVO paramVO) throws Exception {
    	return (int) insert("insFpMaskHis", paramVO);
    }    
    
    public List<AgentAssignVO> selListAgentAssign(AgentAssignVO paramVO) throws Exception {
        return (List<AgentAssignVO>) selectList("selListAgentAssign", paramVO);
    }
    
    public int updAgentAssign(AgentAssignVO paramVO) throws Exception {
    	return (int) update("updAgentAssign", paramVO);
    }
    
	public int saveChrrForAgent(AgentAssignVO paramVO) throws Exception {
		return (int) update("saveChrrForAgent", paramVO);
	}
    
	public int deleteAgent(AgentAssignVO paramVO) {
		// TODO Auto-generated method stub
		return (int) delete("deleteAgent", paramVO);
	}
    */
    
    /********************************************* 
     * 통계  
     *********************************************/
    /*
    public List<BizStatsVO> selListBizStats() throws Exception {
        return (List<BizStatsVO>) selectList("selListBizStats");
    }
    
    public List<BizStatsTodayVO> selListBizStatsToday() throws Exception {
        return (List<BizStatsTodayVO>) selectList("selListBizStatsToday");
    }
    
    public List<DailyStatsVO> selListDailyStats(DailyStatsVO paramVO) throws Exception {
        return (List<DailyStatsVO>) selectList("selListDailyStats", paramVO);
    }
    
    public List<MonthlyStatsVO> selListMonthlyStats(MonthlyStatsVO paramVO) throws Exception {
        return (List<MonthlyStatsVO>) selectList("selListMonthlyStats", paramVO);
    }
    
    public MaskingHistoryVO selOneMaskingHistoryTotRowCnt(MaskingHistoryVO paramVO) throws Exception {
        return (MaskingHistoryVO) selectOne("selOneMaskingHistoryTotRowCnt", paramVO);
    }    
    
    public List<MaskingHistoryVO> selListMaskingHistory(MaskingHistoryVO paramVO) throws Exception {
        return (List<MaskingHistoryVO>) selectList("selListMaskingHistory", paramVO);
    }
    
    public List<MaskingHistoryVO> selListMaskingHistoryDetail(MaskingHistoryVO paramVO) throws Exception {
        return (List<MaskingHistoryVO>) selectList("selListMaskingHistoryDetail", paramVO);
    }
    */
    
    /********************************************* 
     * 관리
     *********************************************/
    /*
    public List<CodeVO> selListCodeForManagement(CodeVO paramVO) throws Exception {
        return (List<CodeVO>) selectList("selListCodeForManagement", paramVO);
    }
    
    public List<CodeVO> selListCodeDetailForManagement(CodeVO paramVO) throws Exception {
        return (List<CodeVO>) selectList("selListCodeDetailForManagement", paramVO);
    }
    
    public int saveCode(CodeVO paramVO) throws Exception {
    	return (int) update("saveCode", paramVO);
    }
    
    public int deleteCode(CodeVO paramVO) throws Exception {
    	return (int) delete("deleteCode", paramVO);
    }
    
	public int deleteDetailCode(CodeVO paramVO) {
		// TODO Auto-generated method stub
    	return (int) delete("deleteDetailCode", paramVO);
	}
    
    public int saveDetailCode(CodeVO paramVO) throws Exception {
    	return (int) update("saveDetailCode", paramVO);
    }
    
    public List<ChrrVO> selListChrrForManagement(ChrrVO paramVO) throws Exception {
        return (List<ChrrVO>) selectList("selListChrrForManagement", paramVO);
    }
    
    public int saveChrrForMng(ChrrVO paramVO) throws Exception {
        return update("saveChrrForMng", paramVO);
      }
    
    public List<ChrrVO> selListChrr() throws Exception {
        return (List<ChrrVO>) selectList("selListChrr");
    }
    
    public List<GroupAuthVO> selListGroupAuth() throws Exception {
        return (List<GroupAuthVO>) selectList("selListGroupAuth");
    }
    
    public List<ChrrGroupAuthVO> selListChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
        return (List<ChrrGroupAuthVO>) selectList("selListChrrGroupAuth", paramVO);
    }
    
    public int saveGroupAuth(GroupAuthVO paramVO) throws Exception {
    	return (int) update("saveGroupAuth", paramVO);
    }
    
    public int saveChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
    	return (int) update("saveChrrGroupAuth", paramVO);
    }
    
    public List<GroupAuthVO> selListAuth(GroupAuthVO paramVO) throws Exception {
        return (List<GroupAuthVO>) selectList("selListAuth", paramVO);
    }
    
    public List<MenuAuthVO> selListMenuAuthForManagement(MenuAuthVO paramVO) throws Exception {
        return (List<MenuAuthVO>) selectList("selListMenuAuthForManagement", paramVO);
    }    
    
    public int saveMenuAuth(MenuAuthVO paramVO) throws Exception {
    	return (int) update("saveMenuAuth", paramVO);
    }    
        
    public List<MenuVO> selListMenu(MenuVO paramVO) throws Exception {
        return (List<MenuVO>) selectList("selListMenu", paramVO);
    }
    
    public List<MenuVO> selListMenuForManagement(MenuVO paramVO) throws Exception {
        return (List<MenuVO>) selectList("selListMenuForManagement", paramVO);
    }    
    
    public int saveMenu(MenuVO paramVO) throws Exception {
    	return (int) update("saveMenu", paramVO);
    }    
    
    public int deleteMenu(MenuVO paramVO) throws Exception {
    	return (int) delete("deleteMenu", paramVO);
    }    
    
    public int deleteChrrForMng(ChrrVO paramVO) throws Exception {
    	return (int) delete("deleteChrrForMng", paramVO);
    }    
    
    public int deleteChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
    	return (int) delete("deleteChrrGroupAuth", paramVO);
    }    
    */
    /********************************************* 
     * 기타
     *********************************************/    
    /*
    public ChrrVO selOneChrr(ChrrVO paramVO) throws Exception {
        return (ChrrVO) selectOne("selOneChrr", paramVO);
    }
    
    public List<MenuVO> selListChrrMenu(ChrrVO paramVO) throws Exception {
        return (List<MenuVO>) selectList("selListChrrMenu", paramVO);
    }
    
    public List<StepStatsVO> selListStepStats() throws Exception {
        return (List<StepStatsVO>) selectList("selListStepStats");
    }    
    
    public List<XtromDailyStatsVO> selListXtormDailyStats(XtromDailyStatsVO paramVO) throws Exception {
        return (List<XtromDailyStatsVO>) selectList("selListXtormDailyStats", paramVO);
    }
    */
    
    /********************************************* 
     * 분리보관
     *********************************************/
    
    
    
    /**********************************************
     * 2022.12 신규 개발 KSM
     **********************************************/
    //일일 처리 현황 조회
    public List<StatisticsVO> getDpmDailyProInfo(StatisticsVO paramVO) throws Exception {
        return (List<StatisticsVO>) selectList("getDpmDailyProInfo", paramVO);
    }
    //일일 처리 현황 전체 cnt 조회
    public StatisticsVO getDpmDailyProInfoTotRowCnt(StatisticsVO paramVO) throws Exception {
        return (StatisticsVO) selectOne("getDpmDailyProInfoTotRowCnt",paramVO);
    }    
    //일별 통계 조회
    public List<StatisticsVO> getDpmDayProInfo(StatisticsVO paramVO) throws Exception {
        return (List<StatisticsVO>) selectList("getDpmDayProInfo", paramVO);
    }
    //일별 통계 전체 cnt 조회
    public StatisticsVO getDpmDayProInfoTotRowCnt(StatisticsVO paramVO) throws Exception {
        return (StatisticsVO) selectOne("getDpmDayProInfoTotRowCnt",paramVO);
    }    
    //월별 통계 조회
    public List<StatisticsVO> getDpmMonthProInfo(StatisticsVO paramVO) throws Exception {
        return (List<StatisticsVO>) selectList("getDpmMonthProInfo",paramVO);
    }
    //월별 통계 전체 cnt 조회
    public StatisticsVO getDpmMonthProInfoTotRowCnt(StatisticsVO paramVO) throws Exception {
        return (StatisticsVO) selectOne("getDpmMonthProInfoTotRowCnt",paramVO);
    }    
    //IMR 결과 열람자 이력 조회
    public List<CalibVerifiVo> getdpmImrResViewerInfo(CalibVerifiVo paramVO) throws Exception {
        return (List<CalibVerifiVo>) selectList("getdpmImrResViewerInfo",paramVO);
    }
    //IMR 결과 열람자 이력 조회 전체 cnt 조회
    public CalibVerifiVo getdpmImrResViewerInfoTotRowCnt(CalibVerifiVo paramVO) throws Exception {
        return (CalibVerifiVo) selectOne("getdpmImrResViewerInfoTotRowCnt",paramVO);
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
    //월별 통계 조회
    public List<StatisticsVO> getDpmBatchInfo() throws Exception {
        return (List<StatisticsVO>) selectList("getDpmBatchInfo");
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
    
    // 배치 정보 조회
    public StatisticsVO getBatchTotCnt() throws Exception {
    	return (StatisticsVO) selectOne("getBatchTotCnt");
    }
    
    // mask 원복
    public StatisticsVO getStarDateEndDate() throws Exception {
    	return (StatisticsVO) selectOne("getStarDateEndDate");
    }
    
    //2023.01.06 비밀번호 변경 처리
    public int updateChrrPwd(LoginChrrVO param) throws Exception {
    	return (int) update("updateChrrPwd", param);
    }
    
    /****************************************************************
     * 2023.01.09 삼성카드
     ****************************************************************/
    
    //업무별 처리 현황 전체 조회
    public InspectVO getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) throws Exception {
        return (InspectVO) selectOne("getDpmInspectStatInfoTotRowCnt",paramVO);
    }    
    //업무별 처리 현황 조회
    public List<InspectVO> getDpmInspectStatInfo(InspectVO paramVO) throws Exception {
        return (List<InspectVO>) selectList("getDpmInspectStatInfo", paramVO);
    }
    
}
