package com.minervasoft.backend.vo;

public class BizStatsVO extends AbstractVO {
    
    private String basDt = null;

    private String bprBsnDsc = null;

    private String bizBsnNm = null;

    private Integer allCn = null;

    private Integer prcCn = null;

    private Integer nonCn = null;
    
    private String prcRatio = null;

    private Integer maskCn = null;

    public Integer getNonCn() {
		return nonCn;
	}

	public void setNonCn(Integer nonCn) {
		this.nonCn = nonCn;
	}

	private String maskRatio = null;
    
    private Integer verCn = null;

    private Integer acmVerCn = null;
    
    private String verRatio = null;
    
    private Integer fnrCn = null;
    
    public Integer getAcmVerCn() {
		return acmVerCn;
	}

	public void setAcmVerCn(Integer acmVerCn) {
		this.acmVerCn = acmVerCn;
	}

	public Integer getAcmFnrCn() {
		return acmFnrCn;
	}

	public void setAcmFnrCn(Integer acmFnrCn) {
		this.acmFnrCn = acmFnrCn;
	}

	public Integer getAcmFprCn() {
		return acmFprCn;
	}

	public void setAcmFprCn(Integer acmFprCn) {
		this.acmFprCn = acmFprCn;
	}

	private Integer acmFnrCn = null;

    private String fnrRatio = null;
    
    private Integer fprCn = null;
    
    private Integer acmFprCn = null;

    private String fprRatio = null;
    
	public Integer getVerCn() {
		return verCn;
	}

	public void setVerCn(Integer verCn) {
		this.verCn = verCn;
	}

	public String getVerRatio() {
		return verRatio;
	}

	public void setVerRatio(String verRatio) {
		this.verRatio = verRatio;
	}

	public Integer getFnrCn() {
		return fnrCn;
	}

	public void setFnrCn(Integer fnrCn) {
		this.fnrCn = fnrCn;
	}

	public String getFnrRatio() {
		return fnrRatio;
	}

	public void setFnrRatio(String fnrRatio) {
		this.fnrRatio = fnrRatio;
	}

	public Integer getFprCn() {
		return fprCn;
	}

	public void setFprCn(Integer fprCn) {
		this.fprCn = fprCn;
	}

	public String getFprRatio() {
		return fprRatio;
	}

	public void setFprRatio(String fprRatio) {
		this.fprRatio = fprRatio;
	}

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

    public Integer getAllCn() {
        return this.allCn;
    }

    public void setAllCn(Integer allCn) {
        this.allCn = allCn;
    }

    public Integer getPrcCn() {
        return this.prcCn;
    }

    public void setPrcCn(Integer prcCn) {
        this.prcCn = prcCn;
    }

    public String getPrcRatio() {
        return this.prcRatio;
    }

    public void setPrcRatio(String prcRatio) {
        this.prcRatio = prcRatio;
    }

    public Integer getMaskCn() {
        return this.maskCn;
    }

    public void setMaskCn(Integer maskCn) {
        this.maskCn = maskCn;
    }

    public String getMaskRatio() {
        return maskRatio;
    }

    public void setMaskRatio(String maskRatio) {
        this.maskRatio = maskRatio;
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
