package com.minervasoft.backend.vo;

public class LoginChrrVO extends AbstractVO {

    private String chrrId = "";

    private String chrrNm = "";
    
    private String companyId = "";

    private String deptnm = "";

    private String uyn = "";    
    
    private String chrrPwd = "";
    
    private String pwdYn="Y";
    
    private String idNo = "";
    
    private String xpDtm = "";
    
    private String xpYn = "N";
    
    private String xp10DayYn = "N";
    
    private long xpDay;
    

    public String getChrrPwd() {
		return chrrPwd;
	}

	public void setChrrPwd(String chrrPwd) {
		this.chrrPwd = chrrPwd;
	}

	public String getChrrId() {
        return this.chrrId;
    }

    public void setChrrId(String chrrId) {
        this.chrrId = chrrId;
    }

    public String getChrrNm() {
        return this.chrrNm;
    }

    public void setChrrNm(String chrrNm) {
        this.chrrNm = chrrNm;
    }

    public String getDeptnm() {
        return this.deptnm;
    }

    public void setDeptnm(String deptnm) {
        this.deptnm = deptnm;
    }

	public String getUyn() {
		return uyn;
	}

	public void setUyn(String uyn) {
		this.uyn = uyn;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getPwdYn() {
		return pwdYn;
	}

	public void setPwdYn(String pwdYn) {
		this.pwdYn = pwdYn;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getXpDtm() {
		return xpDtm;
	}

	public void setXpDtm(String xpDtm) {
		this.xpDtm = xpDtm;
	}

	public String getXpYn() {
		return xpYn;
	}

	public void setXpYn(String xpYn) {
		this.xpYn = xpYn;
	}

	public String getXp10DayYn() {
		return xp10DayYn;
	}

	public void setXp10DayYn(String xp10DayYn) {
		this.xp10DayYn = xp10DayYn;
	}

	public long getXpDay() {
		return xpDay;
	}

	public void setXpDay(long xpDay) {
		this.xpDay = xpDay;
	}


}
