package com.minervasoft.backend.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.minervasoft.backend.dao.DpmDAO;
import com.minervasoft.backend.service.DpmService;
import com.minervasoft.backend.vo.CalibVerifiVo;
import com.minervasoft.backend.vo.InspectVO;
import com.minervasoft.backend.vo.LoginChrrVO;
import com.minervasoft.backend.vo.StatisticsVO;
import com.minervasoft.backend.vo.UserManageVo;

@Service("DpmService")
public class DpmServiceImpl implements DpmService {
    /********************************************* 
     * 로그인 및 공통  
     *********************************************/	
    @Resource(name = "DpmDAO")
    private DpmDAO dpmDao;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public LoginChrrVO selOneLoginChrr(LoginChrrVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selOneLoginChrr(paramVO);
    }    
    
    /*
    @Override
    public List<MenuAuthVO> selListMenuAuth(MenuAuthVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMenuAuth(paramVO);
    }

    @Override
    public List<CodeVO> selListCode(CodeVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListCode(paramVO);
    }    
    */
    
    /********************************************* 
     * 마스킹검증 
     *********************************************/
    /*
    @Override
    public ImageVerifyVO selOneImageVerifyTotRowCnt(ImageVerifyVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selOneImageVerifyTotRowCnt(paramVO);
    }    
    
    @Override
    public List<ImageVerifyVO> selListImageVerify(ImageVerifyVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListImageVerify(paramVO);
    }
    
    @Override
    public int updFpMaskObj(ImageVerifyVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.updFpMaskObj(paramVO);
    }
    
    @Override
    public int insFpMaskHis(MaskingHistoryVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.insFpMaskHis(paramVO);
    }     
    
    @Override
    public List<AgentAssignVO> selListAgentAssign(AgentAssignVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListAgentAssign(paramVO);
    }
    
    @Override
    public int updAgentAssign(AgentAssignVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.updAgentAssign(paramVO);
    }
    
    @Override
    public int saveChrrForAgent(AgentAssignVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveChrrForAgent(paramVO);
    }
    
	@Override
	public int deleteAgent(AgentAssignVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.deleteAgent(paramVO);
	}
    */
    /********************************************* 
     * 통계  
     *********************************************/
    /*
    @Override
    public List<BizStatsVO> selListBizStats() throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListBizStats();
    }

    @Override
    public List<BizStatsTodayVO> selListBizStatsToday() throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListBizStatsToday();
    }
    
    @Override
    public List<DailyStatsVO> selListDailyStats(DailyStatsVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListDailyStats(paramVO);
    }

    @Override
    public List<MonthlyStatsVO> selListMonthlyStats(MonthlyStatsVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMonthlyStats(paramVO);
    }
    
    @Override
    public MaskingHistoryVO selOneMaskingHistoryTotRowCnt(MaskingHistoryVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selOneMaskingHistoryTotRowCnt(paramVO);
    }    
    
    @Override
    public List<MaskingHistoryVO> selListMaskingHistory(MaskingHistoryVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMaskingHistory(paramVO);
    }
    
    @Override
    public List<MaskingHistoryVO> selListMaskingHistoryDetail(MaskingHistoryVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMaskingHistoryDetail(paramVO);
    }    
    */
    
    /********************************************* 
     * 관리
     *********************************************/
    /*
    @Override
    public List<CodeVO> selListCodeForManagement(CodeVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListCodeForManagement(paramVO);
    }

    @Override
    public List<CodeVO> selListCodeDetailForManagement(CodeVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListCodeDetailForManagement(paramVO);
    }
    
    @Override
    public int saveCode(CodeVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveCode(paramVO);
    }
    
	@Override
	public int deleteCode(CodeVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.deleteCode(paramVO);
	}
    
    @Override
    public int saveDetailCode(CodeVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveDetailCode(paramVO);
    }
    
	@Override
	public int deleteDetailCode(CodeVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.deleteDetailCode(paramVO);
	}
    
    @Override
    public List<ChrrVO> selListChrrForManagement(ChrrVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListChrrForManagement(paramVO);
    }
    
    @Override
    public int saveChrrForMng(ChrrVO paramVO) throws Exception {
        // TODO Auto-generated method stub
    	return dpmDao.saveChrrForMng(paramVO);
    	
    }
    
    @Override
    public List<ChrrVO> selListChrr() throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListChrr();
    }    
    
    @Override
    public List<GroupAuthVO> selListGroupAuth() throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListGroupAuth();
    }

    @Override
    public List<ChrrGroupAuthVO> selListChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListChrrGroupAuth(paramVO);
    }
    
    @Override
    public int saveGroupAuth(GroupAuthVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveGroupAuth(paramVO);
    }
    
    @Override
    public int saveChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveChrrGroupAuth(paramVO);
    }
    
    @Override
    public List<GroupAuthVO> selListAuth(GroupAuthVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListAuth(paramVO);
    }    
    
    @Override
    public List<MenuAuthVO> selListMenuAuthForManagement(MenuAuthVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMenuAuthForManagement(paramVO);
    }
    
    @Override
    public int saveMenuAuth(MenuAuthVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveMenuAuth(paramVO);
    }     
    
    @Override
    public List<MenuVO> selListMenu(MenuVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMenu(paramVO);
    }
    
    @Override
    public List<MenuVO> selListMenuForManagement(MenuVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListMenuForManagement(paramVO);
    }
    
    @Override
    public int saveMenu(MenuVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.saveMenu(paramVO);
    } 
    
    @Override
    public int deleteMenu(MenuVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.deleteMenu(paramVO);
    } 
    
    @Override
    public int deleteChrrForMng(ChrrVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.deleteChrrForMng(paramVO);
    } 
    
    @Override
    public int deleteChrrGroupAuth(ChrrGroupAuthVO paramVO) throws Exception {
    	// TODO Auto-generated method stub
        return dpmDao.deleteChrrGroupAuth(paramVO);
    } 
    */
    /********************************************* 
     * 기타
     *********************************************/         
    /*
    @Override
    public ChrrVO selOneChrr(ChrrVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selOneChrr(paramVO);
    }

    @Override
    public List<MenuVO> selListChrrMenu(ChrrVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListChrrMenu(paramVO);
    }

    @Override
    public List<StepStatsVO> selListStepStats() throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListStepStats();
    }

    @Override
    public List<XtromDailyStatsVO> selListXtormDailyStats(XtromDailyStatsVO paramVO) throws Exception {
        // TODO Auto-generated method stub
        return dpmDao.selListXtormDailyStats(paramVO);
    }
	*/

    /********************************************* 
     * 분리보관
     *********************************************/
    
    
    /************************************************
     * 2022.12 신규 개발 KSM
     ************************************************/

	@Override
	public List<CalibVerifiVo> getdpmImrResViewerInfo(CalibVerifiVo paramVO) throws Exception {
		// TODO Auto-generated method stub
				return dpmDao.getdpmImrResViewerInfo(paramVO);
	}

	@Override
	public CalibVerifiVo getdpmImrResViewerInfoTotRowCnt(CalibVerifiVo paramVO) throws Exception {
		// TODO Auto-generated method stub
				return dpmDao.getdpmImrResViewerInfoTotRowCnt(paramVO);
	}
	
	@Override
	public List<UserManageVo> getdpmUserManageInfo(UserManageVo paramVO) throws Exception {
		// TODO Auto-generated method stub
				return dpmDao.getdpmUserManageInfo(paramVO);
	}

	@Override
	public UserManageVo getdpmUserManageInfoTotRowCnt(UserManageVo paramVO) throws Exception {
		// TODO Auto-generated method stub
				return dpmDao.getdpmUserManageInfoTotRowCnt(paramVO);
	}

	@Override
	public int insertUserInfo(UserManageVo paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.insertUserInfo(paramVO);
	}

	@Override
	public int updateUserInfo(UserManageVo paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.updateUserInfo(paramVO);
	}

	@Override
	public int deleteUserInfo(UserManageVo paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.deleteUserInfo(paramVO);
	}

	@Override
	public List<StatisticsVO> getDpmDailyProInfo(StatisticsVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.getDpmDailyProInfo(paramVO);
	}

	@Override
	public StatisticsVO getDpmDailyProInfoTotRowCnt(StatisticsVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.getDpmDailyProInfoTotRowCnt(paramVO);
	}
	
	
	@Override
	public List<StatisticsVO> getDpmCalibVerifiInfo(StatisticsVO paramVO) throws Exception {
		// TODO Auto-generated method stub
		return dpmDao.getDpmDailyProInfo(paramVO);
	}
	
	@Override
	public int insertDailyStatics(StatisticsVO paramVO) throws Exception {
		return dpmDao.insertDailyStatics(paramVO);
	}
	
	
	// 교정/검증 확정 처리
	@Override
    public int updImrConfirm(StatisticsVO paramVO) throws Exception {
		return dpmDao.updImrConfirm(paramVO);
    }
	
	@Override
	public int insertViewReason(CalibVerifiVo paramVO) throws Exception {
		return dpmDao.insertViewReason(paramVO);
	}
	
	// MASK 원복
	@Override
    public int updMaskRecover(Map<String, String> param) throws Exception {
		return dpmDao.updMaskRecover(param);
    }

	public void insertPrcDtNullToZeroData(List<StatisticsVO> paramList) throws Exception {
		StatisticsVO info = dpmDao.getStarDateEndDate();
		List<String> prcDtList = new ArrayList<String>();
		for(StatisticsVO vo : paramList) {
			prcDtList.add(vo.getPrcDt());
		}
		String stDate=info.getStPrcDt();//시작일
		String edDate=info.getEdPrcDt();//종료일
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		Date d1 = df.parse( stDate );
		Date d2 = df.parse( edDate);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		//Calendar 타입으로 변경 add()메소드로 1일씩 추가해 주기위해 변경
		c1.setTime( d1 );
		c2.setTime( d2 );

		//시작날짜와 끝 날짜를 비교해, 시작날짜가 작거나 같은 경우 출력
		while( c1.compareTo( c2 ) !=1 ){
			//시작일과 종료일 날짜 중 MASK_OBJ 테이블에 존재하지 않는 날짜는 '0' 값 으로 해당 날짜 등록 
			if(!prcDtList.contains(dateFormat.format(c1.getTime()))) {
				StatisticsVO statisticInfo = new StatisticsVO();
				statisticInfo.setPrcDt(dateFormat.format(c1.getTime()));
				dpmDao.insertDailyStatics(statisticInfo);
			}
		c1.add(Calendar.DATE, 1);
		}
	}
	/**
	 *2023.01.06 비밀번호 변경 처리 
	 * */
	@Override
	public int updateChrrPwd(LoginChrrVO paramVO) throws Exception {
		return dpmDao.updateChrrPwd(paramVO);
	}

	@Override
	public InspectVO getDpmInspectStatInfoTotRowCnt(InspectVO paramVO) throws Exception {
		return dpmDao.getDpmInspectStatInfoTotRowCnt(paramVO);
	}

	@Override
	public List<InspectVO> getDpmInspectStatInfo(InspectVO paramVO) throws Exception {
		return dpmDao.getDpmInspectStatInfo(paramVO);
	}
	
	@Override
	public InspectVO getBatchTotCnt() throws Exception {
		return dpmDao.getBatchTotCnt();
	}

	@Override
	public List<InspectVO> getDpmBatchInfo(InspectVO paramVO) throws Exception {
		return dpmDao.getDpmBatchInfo();
	}

	@Override
	public int insertBatchInfo(List<InspectVO> list) throws Exception {
		int result = 0;
		for(InspectVO vo : list) {
			result = dpmDao.insertBatchInfo(vo);
		}
		return result;
	}
    @Override
	public List<InspectVO> getDpmDayProInfo(InspectVO paramVO) throws Exception {
        return dpmDao.getDpmDayProInfo(paramVO);
	}
	@Override
	public InspectVO getDpmDayProInfoTotRowCnt(InspectVO paramVO) throws Exception {
		return dpmDao.getDpmDayProInfoTotRowCnt(paramVO);
	}
	@Override
	public List<InspectVO> getDpmMonthProInfo(InspectVO paramVO) throws Exception {
         return dpmDao.getDpmMonthProInfo(paramVO);
	}
	@Override
	public InspectVO getDpmMonthProInfoTotRowCnt(InspectVO paramVO) throws Exception {
		return dpmDao.getDpmMonthProInfoTotRowCnt(paramVO);
	}

	

}
