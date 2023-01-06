package com.minervasoft.backend.vo;

import java.util.Date;

public class CodeVO extends AbstractVO {

    private String cId = null;
    
    private String upCId = null;
    
    private String cnm = null;
    
    private String upCnm = null;
    
    private Integer scrnMrkSq = null;
    
    private String uyn = null;
    
    private Date rgDtm = null;
    
    private String rgEno = null;
    
    private Date chgDtm = null;
    
    private String chgEno = null;

    private String rgEnnm = null;

    private String chgEnnm = null;    
    
    public String getcId() {
        return this.cId;
    }

    public void setcId(String cId) {
        this.cId = cId;
    }

    public String getUpCId() {
        return this.upCId;
    }

    public void setUpCId(String upCId) {
        this.upCId = upCId;
    }

    public String getCnm() {
        return this.cnm;
    }

    public void setCnm(String cnm) {
        this.cnm = cnm;
    }
    
    public String getUpCnm() {
        return this.upCnm;
    }

    public void setUpCnm(String upCnm) {
        this.upCnm = upCnm;
    }

    public Integer getScrnMrkSq() {
        return this.scrnMrkSq;
    }

    public void setScrnMrkSq(Integer scrnMrkSq) {
        this.scrnMrkSq = scrnMrkSq;
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
