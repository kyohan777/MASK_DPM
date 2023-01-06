package com.minervasoft.backend.vo;

public class LoginChrrVO extends AbstractVO {

    private String chrrId = "";

    private String chrrNm = "";
    
    private String companyId = "";

    private String deptnm = "";

    private String uyn = "";    
    
    private String chrrPwd = "";
    
    private String pwdYn="Y";

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


}
