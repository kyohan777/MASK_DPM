package com.minervasoft.backend.vo;

public class BizStatsTodayVO extends AbstractVO {

    private String basDt = null;

    private String bprBsnDsc = null;

    private String bizBsnNm = null;

    private Integer prcCn = null;

    private Integer maskCn = null;
    
	private String gridLabels = null;
	
	private String gridNames = null;
	
	private String gridWidths = null;
	
	private String gridAligns = null;
	
    private String excelDownYn = null;    

    public String getBasDt() {
        return this.basDt;
    }

    public void setBasDt(String basDt) {
        this.basDt = basDt;
    }

    public String getBprBsnDsc() {
        return this.bprBsnDsc;
    }

    public void setBprBsnDsc(String bprBsnDsc) {
        this.bprBsnDsc = bprBsnDsc;
    }

    public String getBizBsnNm() {
        return this.bizBsnNm;
    }

    public void setBizBsnNm(String bizBsnNm) {
        this.bizBsnNm = bizBsnNm;
    }

    public Integer getPrcCn() {
        return this.prcCn;
    }

    public void setPrcCn(Integer prcCn) {
        this.prcCn = prcCn;
    }

    public Integer getMaskCn() {
        return this.maskCn;
    }

    public void setMaskCn(Integer maskCn) {
        this.maskCn = maskCn;
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
