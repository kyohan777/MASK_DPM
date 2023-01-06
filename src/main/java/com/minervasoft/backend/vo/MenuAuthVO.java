package com.minervasoft.backend.vo;

import java.util.Date;

public class MenuAuthVO extends MenuVO {
    private Integer menuSqno = null;

    private Integer upMenuSqno = null;

    private String mnnm = null;
	
    private String authGrpId = null;

    private String authUyn = null;

    private String inqYn = null;

    private String rgEnnm = null;

    private String chgEnnm = null;
    
    private String chrrId = null;
    
    private Integer menuMrkSq = null;
    
    private Date rgDtm = null;

    private String rgEno = null;

    private Date chgDtm = null;

    private String chgEno = null;    
    
    public Integer getMenuSqno() {
		return menuSqno;
	}

	public void setMenuSqno(Integer menuSqno) {
		this.menuSqno = menuSqno;
	}

	public Integer getUpMenuSqno() {
		return upMenuSqno;
	}

	public void setUpMenuSqno(Integer upMenuSqno) {
		this.upMenuSqno = upMenuSqno;
	}

	public String getMnnm() {
		return mnnm;
	}

	public void setMnnm(String mnnm) {
		this.mnnm = mnnm;
	}

	public String getAuthGrpId() {
        return this.authGrpId;
    }

    public void setAuthGrpId(String authGrpId) {
        this.authGrpId = authGrpId;
    }
    
    public String getAuthUyn() {
        return this.authUyn;
    }

    public void setAuthUyn(String authUyn) {
        this.authUyn = authUyn;
    }

    public String getInqYn() {
        return this.inqYn;
    }

    public void setInqYn(String inqYn) {
        this.inqYn = inqYn;
    }

    public String getRgEnnm() {
        return this.rgEnnm;
    }

    public void setRgEnnm(String rgEnnm) {
        this.rgEnnm = rgEnnm;
    }

    public String getChgEnnm() {
        return this.chgEnnm;
    }

    public void setChgEnnm(String chgEnnm) {
        this.chgEnnm = chgEnnm;
    }

	public String getChrrId() {
		return chrrId;
	}

	public void setChrrId(String chrrId) {
		this.chrrId = chrrId;
	}

	public Integer getMenuMrkSq() {
		return menuMrkSq;
	}

	public void setMenuMrkSq(Integer menuMrkSq) {
		this.menuMrkSq = menuMrkSq;
	}

	public Date getRgDtm() {
		return rgDtm;
	}

	public void setRgDtm(Date rgDtm) {
		this.rgDtm = rgDtm;
	}

	public String getRgEno() {
		return rgEno;
	}

	public void setRgEno(String rgEno) {
		this.rgEno = rgEno;
	}

	public Date getChgDtm() {
		return chgDtm;
	}

	public void setChgDtm(Date chgDtm) {
		this.chgDtm = chgDtm;
	}

	public String getChgEno() {
		return chgEno;
	}

	public void setChgEno(String chgEno) {
		this.chgEno = chgEno;
	}
    
    
}
