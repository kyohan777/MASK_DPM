package com.minervasoft.backend.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SchedulerUtil {
	Logger logger = LoggerFactory.getLogger(getClass());
	//@Inject
		//private TotalSearchService  totalSearchService;

		public void sayHello() {
			System.out.println("Task Hello !!!");
		}

		public void execute() throws Exception {
			logger.debug("start SchedulerUtil > execute()");
		}

}
