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
    /*****************************************************
     * 2023.01.09 삼성 카드 
     * ***************************************************/
    public LoginChrrVO selOneLoginChrr(LoginChrrVO paramVO) throws Exception;
    //비밀번호 변경 처리
    public int updateChrrPwd(LoginChrrVO paramVO) throws Exception;
    //IMR 결과 열람자 이력 조회
    public List<CalibVerifiVo> getdpmExportHistoryInfo(CalibVerifiVo paramVO) throws Exception;
    //IMR 결과 열람자 이력 조회 전체 cnt 조회
    public CalibVerifiVo getdpmExportHistoryInfoTotRowCnt(CalibVerifiVo paramVO) throws Exception;
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
    //일일 처리 통계 등록
    public int insertDailyStatics(StatisticsVO paramVO) throws Exception;
    // 교정/검증 확정 처리
    public int updImrConfirm(StatisticsVO paramVO) throws Exception;
    // 결과 조회 사유 입력
    public int insertViewReason(CalibVerifiVo paramVO) throws Exception;
    // MASK 원복
    public int updMaskRecover(Map<String, String> param) throws Exception;
    //업무별 점검 현황 전체 cnt 조회
    public InspectVO getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) throws Exception;
    //업무별 점검 현황 조회
    public List<InspectVO> getDpmInspectStatInfo(InspectVO paramVO) throws Exception;
    //배치정보 조회
    public List<InspectVO> getDpmBatchInfo(InspectVO paramVO) throws Exception;
    //배치정보 유무 조회
    public InspectVO getBatchTotCnt() throws Exception;
    //배치정보 조회
    public int insertBatchInfo(List<InspectVO> list) throws Exception;
    //일별 통계 조회
    public List<InspectVO> getDpmDayProInfo(InspectVO paramVO) throws Exception;
    //일별 통계 전체 cnt 조회
    public InspectVO getDpmDayProInfoTotRowCnt(InspectVO paramVO) throws Exception;
    //월별 통계 조회
    public List<InspectVO> getDpmMonthProInfo(InspectVO paramVO) throws Exception;
    //월별 통계 전체 cnt 조회
    public InspectVO getDpmMonthProInfoTotRowCnt(InspectVO paramVO) throws Exception;
    
    public void insertCode(Map<String, Object> map) throws Exception;
    public void codeTableDel() throws Exception;
}
