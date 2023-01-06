package com.minervasoft.backend.vo;

import java.util.Date;

public class ImageVerifyVO extends AbstractVO {
	
	private String startDt = "";
	
	private String endDt = "";
	
	private String fpExistYn = "";
	
	private String verifyYn = "";
	
	private String verifySts = "";
	
	private Integer pageNumber = 0;
	
	private Integer totPageCnt = 0;
	
	private Integer totRowCnt = 0;
	
	private Integer pageSize = 0;
	
	private String bprBsnDsc = "";	
	
	private String edmsJobCfcd = "";	
	
	private String prcDt = "";	
	
	private String crtDt = "";	
	
	public String getCrtDt() {
		return crtDt;
	}

	public void setCrtDt(String crtDt) {
		this.crtDt = crtDt;
	}

	private String bizBsnNm = "";	
	
	private String imgStylId = "";
	
	private String etc1 = "";
	
	private String etc2 = "";
	
	private String etc3 = "";

	private String etc4 = "";
  
	private String etc5 = "";
  
	private String imgStylNm = "";
  
	private Integer fpCn = 0;
	
	private Integer fpScore = 0;
	
	private Integer imgCountInfo = 0;
	
	private Integer imgMaskCountInfo = 0;
  
	private String idxId = "";
	
	private String elementid = "";	
	
	private String elementidMask = "";
	
	private String maskPrgStsc = "";	
	
	private String maskSvrnm = "";	

	private String maskAgent = "";
		
	private String imgPath = "";
	
    private String rgEno = "";

    private String chgEno = "";	
  
	private String gridLabels = "";
	
	private String gridNames = "";
	
	private String gridWidths = "";
	
	private String gridAligns = "";
	
	private String excelDownYn = "";
	
	private Integer cgnRzt = 0;
	
	public Integer getCgnRzt() {
		return cgnRzt;
	}

	public void setCgnRzt(Integer cgnRzt) {
		this.cgnRzt = cgnRzt;
	}

	public String getChrrNm() {
		return chrrNm;
	}

	public void setChrrNm(String chrrNm) {
		this.chrrNm = chrrNm;
	}

	private String chrrNm = "";

	public String getStartDt() {
		return startDt;
	}

	public void setStartDt(String startDt) {
		this.startDt = startDt;
	}

	public String getEndDt() {
		return endDt;
	}

	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
	
	public String getFpExistYn() {
		return fpExistYn;
	}

	public void setFpExistYn(String fpExistYn) {
		this.fpExistYn = fpExistYn;
	}

	public String getVerifyYn() {
		return verifyYn;
	}

	public void setVerifyYn(String verifyYn) {
		this.verifyYn = verifyYn;
	}
	
	public String getVerifySts() {
		return verifySts;
	}

	public void setVerifySts(String verifySts) {
		this.verifySts = verifySts;
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

	public String getBprBsnDsc() {
		return bprBsnDsc;
	}

	public void setBprBsnDsc(String bprBsnDsc) {
		this.bprBsnDsc = bprBsnDsc;
	}
	
	public String getEdmsJobCfcd() {
		return edmsJobCfcd;
	}

	public void setEdmsJobCfcd(String edmsJobCfcd) {
		this.edmsJobCfcd = edmsJobCfcd;
	}	
	
	public String getPrcDt() {
		return prcDt;
	}

	public void setPrcDt(String prcDt) {
		this.prcDt = prcDt;
	}

	public String getBizBsnNm() {
		return bizBsnNm;
	}

	public void setBizBsnNm(String bizBsnNm) {
		this.bizBsnNm = bizBsnNm;
	}

	public String getImgStylId() {
		return imgStylId;
	}

	public void setImgStylId(String imgStylId) {
		this.imgStylId = imgStylId;
	}

	public String getEtc1() {
		return etc1;
	}

	public void setEtc1(String etc1) {
		this.etc1 = etc1;
	}
	
	public String getEtc2() {
		return etc2;
	}

	public void setEtc2(String etc2) {
		this.etc2 = etc2;
	}
	
	public String getEtc3() {
		return etc3;
	}

	public void setEtc3(String etc3) {
		this.etc3 = etc3;
	}
	
	public String getEtc4() {
		return etc4;
	}

	public void setEtc4(String etc4) {
		this.etc4 = etc4;
	}

	public String getEtc5() {
		return etc5;
	}

	public void setEtc5(String etc5) {
		this.etc5 = etc5;
	}

	public String getImgStylNm() {
		return imgStylNm;
	}

	public void setImgStylNm(String imgStylNm) {
		this.imgStylNm = imgStylNm;
	}

	public Integer getFpCn() {
		return fpCn;
	}

	public void setFpCn(Integer fpCn) {
		this.fpCn = fpCn;
	}

	public Integer getFpScore() {
		return fpScore;
	}

	public void setFpScore(Integer fpScore) {
		this.fpScore = fpScore;
	}

	public Integer getImgCountInfo() {
		return imgCountInfo;
	}

	public void setImgCountInfo(Integer imgCountInfo) {
		this.imgCountInfo = imgCountInfo;
	}
	
	public Integer getImgMaskCountInfo() {
		return imgMaskCountInfo;
	}

	public void setImgMaskCountInfo(Integer imgMaskCountInfo) {
		this.imgMaskCountInfo = imgMaskCountInfo;
	}

	public String getIdxId() {
		return idxId;
	}

	public void setIdxId(String idxId) {
		this.idxId = idxId;
	}

	public String getElementid() {
		return elementid;
	}

	public void setElementid(String elementid) {
		this.elementid = elementid;
	}

	public String getElementidMask() {
		return elementidMask;
	}

	public void setElementidMask(String elementidMask) {
		this.elementidMask = elementidMask;
	}
	
	public String getMaskPrgStsc() {
		return maskPrgStsc;
	}

	public void setMaskPrgStsc(String maskPrgStsc) {
		this.maskPrgStsc = maskPrgStsc;
	}

	public String getMaskSvrnm() {
		return maskSvrnm;
	}

	public void setMaskSvrnm(String maskSvrnm) {
		this.maskSvrnm = maskSvrnm;
	}

	public String getMaskAgent() {
		return maskAgent;
	}

	public void setMaskAgent(String maskAgent) {
		this.maskAgent = maskAgent;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public String getRgEno() {
		return rgEno;
	}

	public void setRgEno(String rgEno) {
		this.rgEno = rgEno;
	}

	public String getChgEno() {
		return chgEno;
	}

	public void setChgEno(String chgEno) {
		this.chgEno = chgEno;
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
