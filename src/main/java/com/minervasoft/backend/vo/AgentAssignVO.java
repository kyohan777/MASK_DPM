package com.minervasoft.backend.vo;

import java.util.Date;

public class AgentAssignVO extends AbstractVO {

	private String serverNo = "";
	
	private String managerStatus = "";
	
	private Date lastActTime = null;
	
	private Integer agentCnt = 0;
	
	private String maskingMode = "";
	
	private Integer reprocCnt = 0;
	
	private String etc1 = "";
	
	private String etc2 = "";
	
	private String etc3 = "";
	
	private String etc4 = "";
	
	private String etc5 = "";
	
    private String chgDtm = "";

    private String chgEno = "";

	private Integer agentCntProd = 0;
    
    private Integer rowCnt = 0;
    
    private String startIpdttm = null;
    
    private String endIpdttm = null;
    
    private String edmsJobCfcd = "";
    
    private String startIpdttmProd = "";
    
    private String stats = "";


	public String getStats() {
		return stats;
	}

	public void setStats(String stats) {
		this.stats = stats;
	}

	public String getStartIpdttm() {
		return startIpdttm;
	}

	public void setStartIpdttm(String startIpdttm) {
		this.startIpdttm = startIpdttm;
	}

	public String getEndIpdttm() {
		return endIpdttm;
	}

	public void setEndIpdttm(String endIpdttm) {
		this.endIpdttm = endIpdttm;
	}

	public String getServerNo() {
		return serverNo;
	}

	public void setServerNo(String serverNo) {
		this.serverNo = serverNo;
	}

	public String getManagerStatus() {
		return managerStatus;
	}

	public void setManagerStatus(String managerStatus) {
		this.managerStatus = managerStatus;
	}

	public Date getLastActTime() {
		return lastActTime;
	}

	public void setLastActTime(Date lastActTime) {
		this.lastActTime = lastActTime;
	}

	public Integer getAgentCnt() {
		return agentCnt;
	}

	public void setAgentCnt(Integer agentCnt) {
		this.agentCnt = agentCnt;
	}

	public String getMaskingMode() {
		return maskingMode;
	}

	public void setMaskingMode(String maskingMode) {
		this.maskingMode = maskingMode;
	}

	public Integer getReprocCnt() {
		return reprocCnt;
	}

	public void setReprocCnt(Integer reprocCnt) {
		this.reprocCnt = reprocCnt;
	}

	public Integer getAgentCntProd() {
		return agentCntProd;
	}

	public void setAgentCntProd(Integer agentCntProd) {
		this.agentCntProd = agentCntProd;
	}

	public Integer getRowCnt() {
		return rowCnt;
	}

	public void setRowCnt(Integer rowCnt) {
		this.rowCnt = rowCnt;
	}

	public String getEdmsJobCfcd() {
		return edmsJobCfcd;
	}

	public void setEdmsJobCfcd(String edmsJobCfcd) {
		this.edmsJobCfcd = edmsJobCfcd;
	}

	public String getStartIpdttmProd() {
		return startIpdttmProd;
	}

	public void setStartIpdttmProd(String startIpdttmProd) {
		this.startIpdttmProd = startIpdttmProd;
	}

	public String getEndIpdttmProd() {
		return endIpdttmProd;
	}

	public void setEndIpdttmProd(String endIpdttmProd) {
		this.endIpdttmProd = endIpdttmProd;
	}

	public String getEdmsJobCfcdProd() {
		return edmsJobCfcdProd;
	}

	public void setEdmsJobCfcdProd(String edmsJobCfcdProd) {
		this.edmsJobCfcdProd = edmsJobCfcdProd;
	}

	public String getChgDtm() {
		return chgDtm;
	}

	public void setChgDtm(String chgDtm) {
		this.chgDtm = chgDtm;
	}

	private String endIpdttmProd = "";
    
    private String edmsJobCfcdProd = "";
    
    private String bprBsnDsc = null;

    private String elementid = null;

    private String idxId = null;

    private String imgStylId = null;

    private String crtDt = null;

    private String maskPrgStsc = null;

    private Integer maskReprcCnt = null;

    private String prcDt = null;

    private Integer cgnRzt = null;

    private Integer fpCn = null;

    private Integer fpScore = null;

    private Integer imgMaskCountInfo = null;

    private String maskSvrnm = null;

    private String maskAgent = null;

    private String prcmnEno = null;

    private Integer imgCountInfo = null;

    private String imgPath = null;

    private Date rgDtm = null;

    private String rgEno = null;

    private Integer cntAll = null;

    private Integer cnt10 = null;

    private Integer cnt20 = null;

    private Integer cnt30 = null;

    private Integer cnt40 = null;

    private Integer cnt50 = null;

    private Integer cnt60 = null;

    private Integer cnt70 = null;
    
    private Integer agentCn = null;
    
    private Integer svrCn = null;    

    public String getBprBsnDsc() {
        return this.bprBsnDsc;
    }

    public void setBprBsnDsc(String bprBsnDsc) {
        this.bprBsnDsc = bprBsnDsc;
    }

    public String getElementid() {
        return this.elementid;
    }

    public void setElementid(String elementid) {
        this.elementid = elementid;
    }

    public String getIdxId() {
        return this.idxId;
    }

    public void setIdxId(String idxId) {
        this.idxId = idxId;
    }

    public String getImgStylId() {
        return this.imgStylId;
    }

    public void setImgStylId(String imgStylId) {
        this.imgStylId = imgStylId;
    }

    public String getCrtDt() {
        return this.crtDt;
    }

    public void setCrtDt(String crtDt) {
        this.crtDt = crtDt;
    }

    public String getMaskPrgStsc() {
        return this.maskPrgStsc;
    }

    public void setMaskPrgStsc(String maskPrgStsc) {
        this.maskPrgStsc = maskPrgStsc;
    }

    public Integer getMaskReprcCnt() {
        return this.maskReprcCnt;
    }

    public void setMaskReprcCnt(Integer maskReprcCnt) {
        this.maskReprcCnt = maskReprcCnt;
    }

    public String getPrcDt() {
        return this.prcDt;
    }

    public void setPrcDt(String prcDt) {
        this.prcDt = prcDt;
    }

    public Integer getCgnRzt() {
        return this.cgnRzt;
    }

    public void setCgnRzt(Integer cgnRzt) {
        this.cgnRzt = cgnRzt;
    }

    public Integer getFpCn() {
        return this.fpCn;
    }

    public void setFpCn(Integer fpCn) {
        this.fpCn = fpCn;
    }

    public Integer getFpScore() {
        return this.fpScore;
    }

    public void setFpScore(Integer fpScore) {
        this.fpScore = fpScore;
    }

    public Integer getImgMaskCountInfo() {
        return this.imgMaskCountInfo;
    }

    public void setImgMaskCountInfo(Integer imgMaskCountInfo) {
        this.imgMaskCountInfo = imgMaskCountInfo;
    }

    public String getMaskSvrnm() {
        return this.maskSvrnm;
    }

    public void setMaskSvrnm(String maskSvrnm) {
        this.maskSvrnm = maskSvrnm;
    }

    public String getMaskAgent() {
        return this.maskAgent;
    }

    public void setMaskAgent(String maskAgent) {
        this.maskAgent = maskAgent;
    }

    public String getPrcmnEno() {
        return this.prcmnEno;
    }

    public void setPrcmnEno(String prcmnEno) {
        this.prcmnEno = prcmnEno;
    }

    public Integer getImgCountInfo() {
        return this.imgCountInfo;
    }

    public void setImgCountInfo(Integer imgCountInfo) {
        this.imgCountInfo = imgCountInfo;
    }

    public String getImgPath() {
        return this.imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public String getEtc1() {
        return this.etc1;
    }

    public void setEtc1(String etc1) {
        this.etc1 = etc1;
    }

    public String getEtc2() {
        return this.etc2;
    }

    public void setEtc2(String etc2) {
        this.etc2 = etc2;
    }

    public String getEtc3() {
        return this.etc3;
    }

    public void setEtc3(String etc3) {
        this.etc3 = etc3;
    }

    public String getEtc4() {
        return this.etc4;
    }

    public void setEtc4(String etc4) {
        this.etc4 = etc4;
    }

    public String getEtc5() {
        return this.etc5;
    }

    public void setEtc5(String etc5) {
        this.etc5 = etc5;
    }

    public Date getRgDtm() {
        return this.rgDtm;
    }

    public void setRgDtm(Date rgDtm) {
        this.rgDtm = rgDtm;
    }

    public String getRgEno() {
        return this.rgEno;
    }

    public void setRgEno(String rgEno) {
        this.rgEno = rgEno;
    }

    public String getChgEno() {
        return this.chgEno;
    }

    public void setChgEno(String chgEno) {
        this.chgEno = chgEno;
    }

    public Integer getCntAll() {
        return this.cntAll;
    }

    public void setCntAll(Integer cntAll) {
        this.cntAll = cntAll;
    }

    public Integer getCnt10() {
        return this.cnt10;
    }

    public void setCnt10(Integer cnt10) {
        this.cnt10 = cnt10;
    }

    public Integer getCnt20() {
        return this.cnt20;
    }

    public void setCnt20(Integer cnt20) {
        this.cnt20 = cnt20;
    }

    public Integer getCnt30() {
        return this.cnt30;
    }

    public void setCnt30(Integer cnt30) {
        this.cnt30 = cnt30;
    }

    public Integer getCnt40() {
        return this.cnt40;
    }

    public void setCnt40(Integer cnt40) {
        this.cnt40 = cnt40;
    }

    public Integer getCnt50() {
        return this.cnt50;
    }

    public void setCnt50(Integer cnt50) {
        this.cnt50 = cnt50;
    }

    public Integer getCnt60() {
        return this.cnt60;
    }

    public void setCnt60(Integer cnt60) {
        this.cnt60 = cnt60;
    }

    public Integer getCnt70() {
        return this.cnt70;
    }

    public void setCnt70(Integer cnt70) {
        this.cnt70 = cnt70;
    }

	public Integer getAgentCn() {
		return agentCn;
	}

	public void setAgentCn(Integer agentCn) {
		this.agentCn = agentCn;
	}

	public Integer getSvrCn() {
		return svrCn;
	}

	public void setSvrCn(Integer svrCn) {
		this.svrCn = svrCn;
	}

}
