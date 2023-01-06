package com.minervasoft.backend.vo;

import java.util.Date;

public class GroupAuthVO extends AbstractVO {

    private String authGrpId = null;
    
    private String authGrpnm = null;
    
    private Date rgDtm = null;
    
    private String rgEno = null;
    
    private Date chgDtm = null;
    
    private String chgEno = null;

    private String rgEnnm = null;

    private String chgEnnm = null;    
    
    public String getAuthGrpId() {
        return this.authGrpId;
    }

    public void setAuthGrpId(String authGrpId) {
        this.authGrpId = authGrpId;
    }

    public String getAuthGrpnm() {
        return this.authGrpnm;
    }

    public void setAuthGrpnm(String authGrpnm) {
        this.authGrpnm = authGrpnm;
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
        
}
