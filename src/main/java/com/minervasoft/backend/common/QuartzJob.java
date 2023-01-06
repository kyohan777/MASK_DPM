package com.minervasoft.backend.common;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Controller;

import com.minervasoft.backend.service.DpmService;
import com.minervasoft.backend.vo.StatisticsVO;

@Controller
public class QuartzJob extends QuartzJobBean{
	
	private SchedulerUtil schedulerUtil;
	private final DpmService dpmService;
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());
	 
	 public QuartzJob() {
			ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();

			if( applicationContext == null ) {
				throw new NullPointerException("Spring의 ApplicationContext초기화 안됨");
			}
			
			dpmService = (DpmService)applicationContext.getBean("DpmService");
		}
	/**
	 * @param totSearchTask the totSearchTask to set
	 */
	public void setTotSearchTask(SchedulerUtil schedulerUtil) {
		this.schedulerUtil = schedulerUtil;
	}

	@Override
	protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		logger.debug("QuartzJob start!!!");
		try {
			StatisticsVO info = dpmService.getDpmBatchInfo();
			logger.debug("통계 처리 DATA StatisticsVO : " + info.toString());
			info.setNoCn(info.getPrcDtCnt()-info.getPrcCn());//미처리 건수(대상건수 - 처리건수)
			dpmService.insertDailyStatics(info);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
