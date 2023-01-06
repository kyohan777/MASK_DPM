package com.minervasoft.backend.vo;

import java.util.List;

public class ResponseCalibVerifiVo extends AbstractResponseVO{
	
	private Integer pageNumber = 0;
	
	private Integer totPageCnt = 0;
	
	private Integer pageSize = 0;
	
	private Integer totRowCnt = 0;
	
	private List<CalibVerifiVo> selList = null;

	public Integer getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}

	public Integer getTotPageCnt() {
		return totPageCnt;
	}

	public void setTotPageCnt(Integer totPageCnt) {
		this.totPageCnt = totPageCnt;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getTotRowCnt() {
		return totRowCnt;
	}

	public void setTotRowCnt(Integer totRowCnt) {
		this.totRowCnt = totRowCnt;
	}

	public List<CalibVerifiVo> getSelList() {
		return selList;
	}

	public void setSelList(List<CalibVerifiVo> selList) {
		this.selList = selList;
	}
	

}
