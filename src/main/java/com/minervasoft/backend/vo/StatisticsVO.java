package com.minervasoft.backend.vo;

public class StatisticsVO extends AbstractVO{
	private String  prcDt	="";
	private String textPrcDt="";
	private Integer prcDtCnt=0;
	private Integer prcCn=0;
	private Integer noCn=0;
	private Integer errCn=0;
	private String  errRat="";
	private String  prcRat="";
	private String  verifyUpdateRat="";
	private Integer verifyUpdateCn=0;
	private Integer verifyCn=0;
	private Integer maintainCn=0;
	private Integer ay=0;
	private Integer an=0;
	private Integer by=0;
	private Integer bn=0;
	private Integer cy=0;
	private Integer cn=0;
	private Integer dy=0;
	private Integer dn=0;
	private Integer ey=0;
	private Integer en=0;
	private Integer tmRecvY=0;
	private Integer tmRecvN=0;
	private Integer smsRecvY=0;
	private Integer smsRecvN=0;
	private Integer dmRecvY=0;
	private Integer dmRecvN=0;
	private Integer emailRecvY=0;
	private Integer emailRecvN=0;
	private Integer tmOfferY=0;
	private Integer tmOfferN=0;
	private Integer dmOfferY=0;
	private Integer dmOfferN=0;
	private Integer emailOfferY=0;
	private Integer emailOfferN=0;
	private Integer smsOfferY=0;
	private Integer smsOfferN=0;
	private Integer idNo=0;
	private String  elementId="";
	private String  imgFileName="";
	private String  imgFormatType="";
	private String  maskPrgStsc="";
	private String  userConfirm="";
	private String  userUpdateYn="";
	private String  gridLabels = "";
	private String  gridNames = "";
	private String  gridWidths = "";
	private String  gridAligns = "";
	private String  excelDownYn = "";
	private String  ayn= "";
	private String  byn= "";
	private String  cyn= "";
	private String  dyn= "";
	private String  eyn= "";
	private String  tmRecvYn= "";
	private String  smsRecvYn= "";
	private String  dmRecvYn= "";
	private String  emailRecvYn= "";
	private String  tmOfferYn= "";
	private String  dmOfferYn= "";
	private String  emailOfferYn= "";
	private String  smsOfferYn= "";
	private String  intvisionImr="";
	private Integer cgnRzt = 0;
	private Integer pageNumber = 0;
	private Integer totPageCnt = 0;
	private Integer totRowCnt  = 0;
	private Integer pageSize   = 0;
	private Integer startPageNumber = 0;
	private Integer fstImrPage  = 0;
	private String  chgEno = "";
	private String  custId = "";
	private String  contractId = "";
	private String  maskPrgStscTxt="";
	private String  userConfirmTxt="";
	private String  userUpdateYnTxt="";
	private String  resultImgPath="";
	private String  stPrcDt="";
	private String  edPrcDt="";
	private String  imgPathOrg="";
	private String  bprImr="";
	private String  columnName="";
	private String  sortOrder="";
	
	public String getBprImr() {
		return bprImr;
	}
	public void setBprImr(String bprImr) {
		this.bprImr = bprImr;
	}
	public String getImgPathOrg() {
		return imgPathOrg;
	}
	public void setImgPathOrg(String imgPathOrg) {
		this.imgPathOrg = imgPathOrg;
	}
	public String getResultImgPath() {
		return resultImgPath;
	}
	public void setResultImgPath(String resultImgPath) {
		this.resultImgPath = resultImgPath;
	}
	public String getMaskPrgStscTxt() {
		return maskPrgStscTxt;
	}
	public void setMaskPrgStscTxt(String maskPrgStscTxt) {
		this.maskPrgStscTxt = maskPrgStscTxt;
	}
	public String getUserConfirmTxt() {
		return userConfirmTxt;
	}
	public void setUserConfirmTxt(String userConfirmTxt) {
		this.userConfirmTxt = userConfirmTxt;
	}
	public String getUserUpdateYnTxt() {
		return userUpdateYnTxt;
	}
	public void setUserUpdateYnTxt(String userUpdateYnTxt) {
		this.userUpdateYnTxt = userUpdateYnTxt;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getChgEno() {
		return chgEno;
	}
	public void setChgEno(String chgEno) {
		this.chgEno = chgEno;
	}
	public Integer getFstImrPage() {
		return fstImrPage;
	}
	public void setFstImrPage(Integer fstImrPage) {
		this.fstImrPage = fstImrPage;
	}
	public String getPrcDt() {
		return prcDt;
	}
	public void setPrcDt(String prcDt) {
		this.prcDt = prcDt;
	}
	public Integer getPrcDtCnt() {
		return prcDtCnt;
	}
	public void setPrcDtCnt(Integer prcDtCnt) {
		this.prcDtCnt = prcDtCnt;
	}
	public Integer getPrcCn() {
		return prcCn;
	}
	public void setPrcCn(Integer prcCn) {
		this.prcCn = prcCn;
	}
	public Integer getErrCn() {
		return errCn;
	}
	public void setErrCn(Integer errCn) {
		this.errCn = errCn;
	}
	public Integer getVerifyUpdateCn() {
		return verifyUpdateCn;
	}
	public void setVerifyUpdateCn(Integer verifyUpdateCn) {
		this.verifyUpdateCn = verifyUpdateCn;
	}
	public Integer getMaintainCn() {
		return maintainCn;
	}
	public void setMaintainCn(Integer maintainCn) {
		this.maintainCn = maintainCn;
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
	public String getErrRat() {
		return errRat;
	}
	public void setErrRat(String errRat) {
		this.errRat = errRat;
	}
	public String getPrcRat() {
		return prcRat;
	}
	public void setPrcRat(String prcRat) {
		this.prcRat = prcRat;
	}
	public String getTextPrcDt() {
		return textPrcDt;
	}
	public void setTextPrcDt(String textPrcDt) {
		this.textPrcDt = textPrcDt;
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
	public Integer getCgnRzt() {
		return cgnRzt;
	}
	public void setCgnRzt(Integer cgnRzt) {
		this.cgnRzt = cgnRzt;
	}
	
	public Integer getIdNo() {
		return idNo;
	}
	public void setIdNo(Integer idNo) {
		this.idNo = idNo;
	}
	public String getElementId() {
		return elementId;
	}
	public void setElementId(String elementId) {
		this.elementId = elementId;
	}
	public String getImgFileName() {
		return imgFileName;
	}
	public void setImgFileName(String imgFileName) {
		this.imgFileName = imgFileName;
	}
	public String getImgFormatType() {
		return imgFormatType;
	}
	public void setImgFormatType(String imgFormatType) {
		this.imgFormatType = imgFormatType;
	}
	public String getMaskPrgStsc() {
		return maskPrgStsc;
	}
	public void setMaskPrgStsc(String maskPrgStsc) {
		this.maskPrgStsc = maskPrgStsc;
	}
	public String getUserConfirm() {
		return userConfirm;
	}
	public void setUserConfirm(String userConfirm) {
		this.userConfirm = userConfirm;
	}
	public String getUserUpdateYn() {
		return userUpdateYn;
	}
	public void setUserUpdateYn(String userUpdateYn) {
		this.userUpdateYn = userUpdateYn;
	}
	public String getIntvisionImr() {
		return intvisionImr;
	}
	public void setIntvisionImr(String intvisionImr) {
		this.intvisionImr = intvisionImr;
	}
	public Integer getAy() {
		return ay;
	}
	public void setAy(Integer ay) {
		this.ay = ay;
	}
	public Integer getAn() {
		return an;
	}
	public void setAn(Integer an) {
		this.an = an;
	}
	public Integer getBy() {
		return by;
	}
	public void setBy(Integer by) {
		this.by = by;
	}
	public Integer getBn() {
		return bn;
	}
	public void setBn(Integer bn) {
		this.bn = bn;
	}
	public Integer getCy() {
		return cy;
	}
	public void setCy(Integer cy) {
		this.cy = cy;
	}
	public Integer getCn() {
		return cn;
	}
	public void setCn(Integer cn) {
		this.cn = cn;
	}
	public Integer getDy() {
		return dy;
	}
	public void setDy(Integer dy) {
		this.dy = dy;
	}
	public Integer getDn() {
		return dn;
	}
	public void setDn(Integer dn) {
		this.dn = dn;
	}
	public Integer getEy() {
		return ey;
	}
	public void setEy(Integer ey) {
		this.ey = ey;
	}
	public Integer getEn() {
		return en;
	}
	public void setEn(Integer en) {
		this.en = en;
	}
	public Integer getTmRecvY() {
		return tmRecvY;
	}
	public void setTmRecvY(Integer tmRecvY) {
		this.tmRecvY = tmRecvY;
	}
	public Integer getTmRecvN() {
		return tmRecvN;
	}
	public void setTmRecvN(Integer tmRecvN) {
		this.tmRecvN = tmRecvN;
	}
	public Integer getSmsRecvY() {
		return smsRecvY;
	}
	public void setSmsRecvY(Integer smsRecvY) {
		this.smsRecvY = smsRecvY;
	}
	public Integer getSmsRecvN() {
		return smsRecvN;
	}
	public void setSmsRecvN(Integer smsRecvN) {
		this.smsRecvN = smsRecvN;
	}
	public Integer getDmRecvY() {
		return dmRecvY;
	}
	public void setDmRecvY(Integer dmRecvY) {
		this.dmRecvY = dmRecvY;
	}
	public Integer getDmRecvN() {
		return dmRecvN;
	}
	public void setDmRecvN(Integer dmRecvN) {
		this.dmRecvN = dmRecvN;
	}
	public Integer getEmailRecvY() {
		return emailRecvY;
	}
	public void setEmailRecvY(Integer emailRecvY) {
		this.emailRecvY = emailRecvY;
	}
	public Integer getEmailRecvN() {
		return emailRecvN;
	}
	public void setEmailRecvN(Integer emailRecvN) {
		this.emailRecvN = emailRecvN;
	}
	public Integer getTmOfferY() {
		return tmOfferY;
	}
	public void setTmOfferY(Integer tmOfferY) {
		this.tmOfferY = tmOfferY;
	}
	public Integer getTmOfferN() {
		return tmOfferN;
	}
	public void setTmOfferN(Integer tmOfferN) {
		this.tmOfferN = tmOfferN;
	}
	public Integer getDmOfferY() {
		return dmOfferY;
	}
	public void setDmOfferY(Integer dmOfferY) {
		this.dmOfferY = dmOfferY;
	}
	public Integer getDmOfferN() {
		return dmOfferN;
	}
	public void setDmOfferN(Integer dmOfferN) {
		this.dmOfferN = dmOfferN;
	}
	public Integer getEmailOfferY() {
		return emailOfferY;
	}
	public void setEmailOfferY(Integer emailOfferY) {
		this.emailOfferY = emailOfferY;
	}
	public Integer getEmailOfferN() {
		return emailOfferN;
	}
	public void setEmailOfferN(Integer emailOfferN) {
		this.emailOfferN = emailOfferN;
	}
	public String getAyn() {
		return ayn;
	}
	public void setAyn(String ayn) {
		this.ayn = ayn;
	}
	public String getByn() {
		return byn;
	}
	public void setByn(String byn) {
		this.byn = byn;
	}
	public String getCyn() {
		return cyn;
	}
	public void setCyn(String cyn) {
		this.cyn = cyn;
	}
	public String getDyn() {
		return dyn;
	}
	public void setDyn(String dyn) {
		this.dyn = dyn;
	}
	public String getEyn() {
		return eyn;
	}
	public void setEyn(String eyn) {
		this.eyn = eyn;
	}
	public String getTmRecvYn() {
		return tmRecvYn;
	}
	public void setTmRecvYn(String tmRecvYn) {
		this.tmRecvYn = tmRecvYn;
	}
	public String getSmsRecvYn() {
		return smsRecvYn;
	}
	public void setSmsRecvYn(String smsRecvYn) {
		this.smsRecvYn = smsRecvYn;
	}
	public String getDmRecvYn() {
		return dmRecvYn;
	}
	public void setDmRecvYn(String dmRecvYn) {
		this.dmRecvYn = dmRecvYn;
	}
	public String getEmailRecvYn() {
		return emailRecvYn;
	}
	public void setEmailRecvYn(String emailRecvYn) {
		this.emailRecvYn = emailRecvYn;
	}
	public String getTmOfferYn() {
		return tmOfferYn;
	}
	public void setTmOfferYn(String tmOfferYn) {
		this.tmOfferYn = tmOfferYn;
	}
	public String getDmOfferYn() {
		return dmOfferYn;
	}
	public void setDmOfferYn(String dmOfferYn) {
		this.dmOfferYn = dmOfferYn;
	}
	public String getEmailOfferYn() {
		return emailOfferYn;
	}
	public void setEmailOfferYn(String emailOfferYn) {
		this.emailOfferYn = emailOfferYn;
	}
	public Integer getVerifyCn() {
		return verifyCn;
	}
	public void setVerifyCn(Integer verifyCn) {
		this.verifyCn = verifyCn;
	}
	public Integer getSmsOfferY() {
		return smsOfferY;
	}
	public void setSmsOfferY(Integer smsOfferY) {
		this.smsOfferY = smsOfferY;
	}
	public Integer getSmsOfferN() {
		return smsOfferN;
	}
	public void setSmsOfferN(Integer smsOfferN) {
		this.smsOfferN = smsOfferN;
	}
	public String getSmsOfferYn() {
		return smsOfferYn;
	}
	public void setSmsOfferYn(String smsOfferYn) {
		this.smsOfferYn = smsOfferYn;
	}
	public Integer getNoCn() {
		return noCn;
	}
	public void setNoCn(Integer noCn) {
		this.noCn = noCn;
	}
	public String getVerifyUpdateRat() {
		return verifyUpdateRat;
	}
	public void setVerifyUpdateRat(String verifyUpdateRat) {
		this.verifyUpdateRat = verifyUpdateRat;
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
	public Integer getStartPageNumber() {
		return startPageNumber;
	}
	public void setStartPageNumber(Integer startPageNumber) {
		this.startPageNumber = startPageNumber;
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
	@Override
	public String toString() {
		return "StatisticsVO [prcDt=" + prcDt + ", textPrcDt=" + textPrcDt + ", prcDtCnt=" + prcDtCnt + ", prcCn="
				+ prcCn + ", noCn=" + noCn + ", errCn=" + errCn + ", errRat=" + errRat + ", prcRat=" + prcRat
				+ ", verifyUpdateRat=" + verifyUpdateRat + ", verifyUpdateCn=" + verifyUpdateCn + ", verifyCn="
				+ verifyCn + ", maintainCn=" + maintainCn + ", ay=" + ay + ", an=" + an + ", by=" + by + ", bn=" + bn
				+ ", cy=" + cy + ", cn=" + cn + ", dy=" + dy + ", dn=" + dn + ", ey=" + ey + ", en=" + en + ", tmRecvY="
				+ tmRecvY + ", tmRecvN=" + tmRecvN + ", smsRecvY=" + smsRecvY + ", smsRecvN=" + smsRecvN + ", dmRecvY="
				+ dmRecvY + ", dmRecvN=" + dmRecvN + ", emailRecvY=" + emailRecvY + ", emailRecvN=" + emailRecvN
				+ ", tmOfferY=" + tmOfferY + ", tmOfferN=" + tmOfferN + ", dmOfferY=" + dmOfferY + ", dmOfferN="
				+ dmOfferN + ", emailOfferY=" + emailOfferY + ", emailOfferN=" + emailOfferN + ", smsOfferY="
				+ smsOfferY + ", smsOfferN=" + smsOfferN + ", idNo=" + idNo + ", elementId=" + elementId
				+ ", imgFileName=" + imgFileName + ", imgFormatType=" + imgFormatType + ", maskPrgStsc=" + maskPrgStsc
				+ ", userConfirm=" + userConfirm + ", userUpdateYn=" + userUpdateYn + ", gridLabels=" + gridLabels
				+ ", gridNames=" + gridNames + ", gridWidths=" + gridWidths + ", gridAligns=" + gridAligns
				+ ", excelDownYn=" + excelDownYn + ", ayn=" + ayn + ", byn=" + byn + ", cyn=" + cyn + ", dyn=" + dyn
				+ ", eyn=" + eyn + ", tmRecvYn=" + tmRecvYn + ", smsRecvYn=" + smsRecvYn + ", dmRecvYn=" + dmRecvYn
				+ ", emailRecvYn=" + emailRecvYn + ", tmOfferYn=" + tmOfferYn + ", dmOfferYn=" + dmOfferYn
				+ ", emailOfferYn=" + emailOfferYn + ", smsOfferYn=" + smsOfferYn + ", intvisionImr=" + intvisionImr
				+ ", cgnRzt=" + cgnRzt + ", pageNumber=" + pageNumber + ", totPageCnt=" + totPageCnt + ", totRowCnt="
				+ totRowCnt + ", pageSize=" + pageSize + ", startPageNumber=" + startPageNumber + ", fstImrPage="
				+ fstImrPage + ", chgEno=" + chgEno + ", custId=" + custId + ", contractId=" + contractId
				+ ", maskPrgStscTxt=" + maskPrgStscTxt + ", userConfirmTxt=" + userConfirmTxt + ", userUpdateYnTxt="
				+ userUpdateYnTxt + ", resultImgPath=" + resultImgPath + ", stPrcDt=" + stPrcDt + ", edPrcDt=" + edPrcDt
				+ ", imgPathOrg=" + imgPathOrg + ", bprImr=" + bprImr + ", columnName=" + columnName + ", sortOrder="
				+ sortOrder + "]";
	}
	
}
