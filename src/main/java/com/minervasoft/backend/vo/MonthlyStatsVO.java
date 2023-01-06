package com.minervasoft.backend.vo;

public class MonthlyStatsVO extends AbstractVO {

    private String startBasMm = null;

    private String endBasMm = null;	
	
    private String basMm = null;			/*기준월*/

    private Integer allCn = null;			/*전체건수*/
    
    private Integer acmPrcCn = null;		/*누적처리건수*/
    
    private Integer acmMaskCn = null;    	/*누적마스킹건수*/
    
    private String accPrcRatio = null;		/*전체누적처리진행율*/
    
    private Integer acmPrcMms = null;		/*누적월수*/
    
    private Integer xpcPrcCn = null;		/*예상처리건수*/
    
    private String xpcPrcRatio = null;    	/*예상진척률*/

    private Integer prcCn = null;			/*처리건수*/    
    
    private Integer maskCn = null;			/*마스킹건수*/
     
    private String prcRatio = null;			/*실진척률*/
    
    private String xpcRealPrcRatio = null; 	/*예측대비실진척율*/    
    
	private String gridLabels = null;
	
	private String gridNames = null;
	
	private String gridWidths = null;
	
	private String gridAligns = null;
	
    private String excelDownYn = null;

	public String getStartBasMm() {
		return startBasMm;
	}

	public void setStartBasMm(String startBasMm) {
		this.startBasMm = startBasMm;
	}

	public String getEndBasMm() {
		return endBasMm;
	}

	public void setEndBasMm(String endBasMm) {
		this.endBasMm = endBasMm;
	}

	public String getBasMm() {
		return basMm;
	}

	public void setBasMm(String basMm) {
		this.basMm = basMm;
	}

	public Integer getAllCn() {
		return allCn;
	}

	public void setAllCn(Integer allCn) {
		this.allCn = allCn;
	}

	public Integer getAcmPrcCn() {
		return acmPrcCn;
	}

	public void setAcmPrcCn(Integer acmPrcCn) {
		this.acmPrcCn = acmPrcCn;
	}

	public Integer getAcmMaskCn() {
		return acmMaskCn;
	}

	public void setAcmMaskCn(Integer acmMaskCn) {
		this.acmMaskCn = acmMaskCn;
	}

	public String getAccPrcRatio() {
		return accPrcRatio;
	}

	public void setAccPrcRatio(String accPrcRatio) {
		this.accPrcRatio = accPrcRatio;
	}

	public Integer getAcmPrcMms() {
		return acmPrcMms;
	}

	public void setAcmPrcMms(Integer acmPrcMms) {
		this.acmPrcMms = acmPrcMms;
	}

	public Integer getXpcPrcCn() {
		return xpcPrcCn;
	}

	public void setXpcPrcCn(Integer xpcPrcCn) {
		this.xpcPrcCn = xpcPrcCn;
	}

	public String getXpcPrcRatio() {
		return xpcPrcRatio;
	}

	public void setXpcPrcRatio(String xpcPrcRatio) {
		this.xpcPrcRatio = xpcPrcRatio;
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

	public String getPrcRatio() {
		return prcRatio;
	}

	public void setPrcRatio(String prcRatio) {
		this.prcRatio = prcRatio;
	}

	public String getXpcRealPrcRatio() {
		return xpcRealPrcRatio;
	}

	public void setXpcRealPrcRatio(String xpcRealPrcRatio) {
		this.xpcRealPrcRatio = xpcRealPrcRatio;
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

	public String getExcelDownYn() {
		return excelDownYn;
	}

	public void setExcelDownYn(String excelDownYn) {
		this.excelDownYn = excelDownYn;
	}



}
