package com.minervasoft.backend.service;

import java.util.List;
import java.util.Map;

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

public interface DpmService {
    /********************************************* 
     * 로그인 및 공통  
     *********************************************/	
    public LoginChrrVO selOneLoginChrr(LoginChrrVO paramVO) throws Exception;
    //비밀번호 변경 처리
    public int updateChrrPwd(LoginChrrVO paramVO) throws Exception;
    //public List<MenuAuthVO> selListMenuAuth(MenuAuthVO paramVO) throws Exception;
    
    //public List<CodeVO> selListCode(CodeVO paramVO) throws Exception;    
    
    
    /********************************************* 
     * 마스킹검증 
     *********************************************/
    /*
    public ImageVerifyVO selOneImageVerifyTotRowCnt(ImageVerifyVO paramVO) throws Exception;
    
    public List<ImageVerifyVO> selListImageVerify(ImageVerifyVO paramVO) throws Exception;
    
    public int updFpMaskObj(ImageVerifyVO paramVO) throws Exception;
    
    public int insFpMaskHis(MaskingHistoryVO paramVO) throws Exception;
    
    public List<AgentAssignVO> selListAgentAssign(AgentAssignVO paramVO) throws Exception;
    
    public int updAgentAssign(AgentAssignVO paramVO) throws Exception;
    
    public int saveChrrForAgent(AgentAssignVO paramVO) throws Exception;
    
	public int deleteAgent(AgentAssignVO paramVO) throws Exception;
    */
    /********************************************* 
     * 통계  
     *********************************************/
    /*
    public List<BizStatsVO> selListBizStats() throws Exception;
    
    public List<BizStatsTodayVO> selListBizStatsToday() throws Exception;
    
    public List<DailyStatsVO> selListDailyStats(DailyStatsVO paramVO) throws Exception;
    
    public List<MonthlyStatsVO> selListMonthlyStats(MonthlyStatsVO paramVO) throws Exception;
    
    public MaskingHistoryVO selOneMaskingHistoryTotRowCnt(MaskingHistoryVO paramVO) throws Exception;
    
    public List<MaskingHistoryVO> selListMaskingHistory(MaskingHistoryVO paramVO) throws Exception;
    
    public List<MaskingHistoryVO> selListMaskingHistoryDetail(MaskingHistoryVO paramVO) throws Exception;    
    */
    
    /********************************************* 
     * 관리
     *********************************************/
    /*
    public List<CodeVO> selListCodeForManagement(CodeVO paramVO) throws Exception;
    
    public List<CodeVO> selListCodeDetailForManagement(CodeVO paramVO) throws Exception;
    
    public int saveCode(CodeVO paramVO) throws Exception;
    
    public int deleteCode(CodeVO paramVO) throws Exception;
    
	public int deleteDetailCode(CodeVO paramVO) throws Exception;
    
    public int saveDetailCode(CodeVO paramVO) throws Exception;
    
    public List<ChrrVO> selListChrrForManagement(ChrrVO paramVO) throws Exception;
    
    public int saveChrrForMng(ChrrVO paramVO) throws Exception;
    
    public List<ChrrVO> selListChrr() throws Exception;    
    
    public List<GroupAuthVO> selListGroupAuth() throws Exception;
    
    public List<ChrrGroupAuthVO> selListChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception;
    
    public int saveGroupAuth(GroupAuthVO paramVO) throws Exception;
    
    public int saveChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception;
    
    public List<GroupAuthVO> selListAuth(GroupAuthVO paramVO) throws Exception;
    
    public List<MenuAuthVO> selListMenuAuthForManagement(MenuAuthVO paramVO) throws Exception;

    public int saveMenuAuth(MenuAuthVO paramVO) throws Exception;    
    
    public List<MenuVO> selListMenu(MenuVO paramVO) throws Exception;
    
    public List<MenuVO> selListMenuForManagement(MenuVO paramVO) throws Exception;

    public int saveMenu(MenuVO paramVO) throws Exception;
    
    public int deleteMenu(MenuVO paramVO) throws Exception;
    
    public int deleteChrrForMng(ChrrVO paramVO) throws Exception;
    
    public int deleteChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception;
	*/
    /********************************************* 
     * 기타
     *********************************************/    	
    /*
    public ChrrVO selOneChrr(ChrrVO paramVO) throws Exception;

    public List<MenuVO> selListChrrMenu(ChrrVO paramVO) throws Exception;    
    
    public List<StepStatsVO> selListStepStats() throws Exception;    
    
    public List<XtromDailyStatsVO> selListXtormDailyStats(XtromDailyStatsVO paramVO) throws Exception;

    */
    /********************************************* 
     * 분리보관
     *********************************************/
    
    
    /**********************************************
     * 2022.12 신규 개발 KSM
     **********************************************/
    //일일 처리 현황 조회
    public List<StatisticsVO> getDpmDailyProInfo(StatisticsVO paramVO) throws Exception;
    //일일 처리 현황 전체 cnt 조회
    public StatisticsVO getDpmDailyProInfoTotRowCnt(StatisticsVO paramVO) throws Exception;
    //일별 통계 조회
    public List<StatisticsVO> getDpmDayProInfo(StatisticsVO paramVO) throws Exception;
    //일별 통계 전체 cnt 조회
    public StatisticsVO getDpmDayProInfoTotRowCnt(StatisticsVO paramVO) throws Exception;
    //월별 통계 조회
    public List<StatisticsVO> getDpmMonthProInfo(StatisticsVO paramVO) throws Exception;
    //월별 통계 전체 cnt 조회
    public StatisticsVO getDpmMonthProInfoTotRowCnt(StatisticsVO paramVO) throws Exception;
    //IMR 결과 열람자 이력 조회
    public List<CalibVerifiVo> getdpmImrResViewerInfo(CalibVerifiVo paramVO) throws Exception;
    //IMR 결과 열람자 이력 조회 전체 cnt 조회
    public CalibVerifiVo getdpmImrResViewerInfoTotRowCnt(CalibVerifiVo paramVO) throws Exception;
    //사용자 관리 조회
    public List<UserManageVo> getdpmUserManageInfo(UserManageVo paramVO) throws Exception;
    //사용자 관리  조회 전체 cnt 조회
    public UserManageVo getdpmUserManageInfoTotRowCnt(UserManageVo paramVO) throws Exception;
    //사용자 등록 
    public int insertUserInfo(UserManageVo paramVO) throws Exception;
    //사용자 정보 수정 
    public int updateUserInfo(UserManageVo paramVO) throws Exception;
    //사용자 정보 삭제
    public int deleteUserInfo(UserManageVo paramVO) throws Exception;

    // 교정/검증 화면용 조회
    public List<StatisticsVO> getDpmCalibVerifiInfo(StatisticsVO paramVO) throws Exception;
    //일일 처리 통계 배치
    public StatisticsVO getDpmBatchInfo() throws Exception;
    //일일 처리 통계 등록
    public int insertDailyStatics(StatisticsVO paramVO) throws Exception;
    
    // 교정/검증 확정 처리
    public int updImrConfirm(StatisticsVO paramVO) throws Exception;
    // 결과 조회 사유 입력
    public int insertViewReason(CalibVerifiVo paramVO) throws Exception;
    // MASK 원복
    public int updMaskRecover(Map<String, String> param) throws Exception;
    
    public StatisticsVO getBatchTotCnt() throws Exception;
    
    /*****************************************************
     * 2023.01.09 삼성 카드 
     * ***************************************************/
    //업무별 점검 현황 전체 cnt 조회
    public InspectVO getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) throws Exception;
    //업무별 점검 현황 조회
    public List<InspectVO> getDpmInspectStatInfo(InspectVO paramVO) throws Exception;
}
