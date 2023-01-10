package com.minervasoft.backend.vo;

public class InspectVO extends AbstractVO{
	private String  prcDt	  = "";
	private String  bprBsnDsc = "";
	private String  prcRat    = "";
	private String  maskRat   = "";
	private String  majorClass= "";
	private Integer allCn     =0;
	private Integer prcCn     =0;
	private Integer maskCn    =0;
	private Integer nonCn     =0;
	private Integer errCn     =0;
	private Integer verifyCn  =0;
	private Integer verifyUpdateCn =0;
	private Integer nomaskCn  =0;
	private Integer prcDtCnt  =0;
	private Integer pageNumber = 0;
	private Integer totPageCnt = 0;
	private Integer totRowCnt  = 0;
	private Integer pageSize   = 0;
	private Integer startPageNumber = 0;
	private String  stPrcDt="";
	private String  edPrcDt="";
	private String  columnName="";
	private String  sortOrder="";
	private String  gridLabels = "";
	private String  gridNames = "";
	private String  gridWidths = "";
	private String  gridAligns = "";
	public String getPrcDt() {
		return prcDt;
	}
	public void setPrcDt(String prcDt) {
		this.prcDt = prcDt;
	}
	public String getBprBsnDsc() {
		return bprBsnDsc;
	}
	public void setBprBsnDsc(String bprBsnDsc) {
		this.bprBsnDsc = bprBsnDsc;
	}
	public String getPrcRat() {
		return prcRat;
	}
	public void setPrcRat(String prcRat) {
		this.prcRat = prcRat;
	}
	public String getMaskRat() {
		return maskRat;
	}
	public void setMaskRat(String maskRat) {
		this.maskRat = maskRat;
	}
	public String getMajorClass() {
		return majorClass;
	}
	public void setMajorClass(String majorClass) {
		this.majorClass = majorClass;
	}
	public Integer getAllCn() {
		return allCn;
	}
	public void setAllCn(Integer allCn) {
		this.allCn = allCn;
	}
	public Integer getPrcCn() {
		return prcCn;
	}
	public void setPrcCn(Integer prcCn) {
		this.prcCn = prcCn;
	}
	public Integer getMaskCn() {
		return maskCn;
	}
	public void setMaskCn(Integer maskCn) {
		this.maskCn = maskCn;
	}
	public Integer getNonCn() {
		return nonCn;
	}
	public void setNonCn(Integer nonCn) {
		this.nonCn = nonCn;
	}
	public Integer getErrCn() {
		return errCn;
	}
	public void setErrCn(Integer errCn) {
		this.errCn = errCn;
	}
	public Integer getVerifyCn() {
		return verifyCn;
	}
	public void setVerifyCn(Integer verifyCn) {
		this.verifyCn = verifyCn;
	}
	public Integer getVerifyUpdateCn() {
		return verifyUpdateCn;
	}
	public void setVerifyUpdateCn(Integer verifyUpdateCn) {
		this.verifyUpdateCn = verifyUpdateCn;
	}
	public Integer getNomaskCn() {
		return nomaskCn;
	}
	public void setNomaskCn(Integer nomaskCn) {
		this.nomaskCn = nomaskCn;
	}
	public Integer getPrcDtCnt() {
		return prcDtCnt;
	}
	public void setPrcDtCnt(Integer prcDtCnt) {
		this.prcDtCnt = prcDtCnt;
	}
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
	public Integer getTotRowCnt() {
		return totRowCnt;
	}
	public void setTotRowCnt(Integer totRowCnt) {
		this.totRowCnt = totRowCnt;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getStartPageNumber() {
		return startPageNumber;
	}
	public void setStartPageNumber(Integer startPageNumber) {
		this.startPageNumber = startPageNumber;
	}
	public String getStPrcDt() {
		return stPrcDt;
	}
	public void setStPrcDt(String stPrcDt) {
		this.stPrcDt = stPrcDt;
	}
	public String getEdPrcDt() {
		return edPrcDt;
	}
	public void setEdPrcDt(String edPrcDt) {
		this.edPrcDt = edPrcDt;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	
	
	public String getGridLabels() {
		return gridLabels;
	}
	public void setGridLabels(String gridLabels) {
		this.gridLabels = gridLabels;
	}
	public String getGridNames() {
		return gridNames;
	}
	public void setGridNames(String gridNames) {
		this.gridNames = gridNames;
	}
	public String getGridWidths() {
		return gridWidths;
	}
	public void setGridWidths(String gridWidths) {
		this.gridWidths = gridWidths;
	}
	public String getGridAligns() {
		return gridAligns;
	}
	public void setGridAligns(String gridAligns) {
		this.gridAligns = gridAligns;
	}
	@Override
	public String toString() {
		return "InspectVO [prcDt=" + prcDt + ", bprBsnDsc=" + bprBsnDsc + ", prcRat=" + prcRat + ", maskRat=" + maskRat
				+ ", majorClass=" + majorClass + ", allCn=" + allCn + ", prcCn=" + prcCn + ", maskCn=" + maskCn
				+ ", nonCn=" + nonCn + ", errCn=" + errCn + ", verifyCn=" + verifyCn + ", verifyUpdateCn="
				+ verifyUpdateCn + ", nomaskCn=" + nomaskCn + ", prcDtCnt=" + prcDtCnt + ", pageNumber=" + pageNumber
				+ ", totPageCnt=" + totPageCnt + ", totRowCnt=" + totRowCnt + ", pageSize=" + pageSize
				+ ", startPageNumber=" + startPageNumber + ", stPrcDt=" + stPrcDt + ", edPrcDt=" + edPrcDt
				+ ", columnName=" + columnName + ", sortOrder=" + sortOrder + ", gridLabels=" + gridLabels
				+ ", gridNames=" + gridNames + ", gridWidths=" + gridWidths + ", gridAligns=" + gridAligns + "]";
	}
	

}
