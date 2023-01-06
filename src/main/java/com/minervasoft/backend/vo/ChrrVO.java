package com.minervasoft.backend.vo;

import java.util.Date;

public class ChrrVO extends AbstractVO {
	

	
	
    private String chrrId = null;

    private String chrrNm = null;

    private String deptnm = null;

    private String uyn = null;

    private Date rgDtm = null;

    private String rgEno = null;

    private Date chgDtm = null;

    private String chgEno = null;

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
        return this.uyn;
    }

    public void setUyn(String uyn) {
        this.uyn = uyn;
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

    public Date getChgDtm() {
        return this.chgDtm;
    }

    public void setChgDtm(Date chgDtm) {
        this.chgDtm = chgDtm;
    }

    public String getChgEno() {
        return this.chgEno;
    }

    public void setChgEno(String chgEno) {
        this.chgEno = chgEno;
    }
}
