package com.minervasoft.backend.vo;

import java.util.Date;

public class MenuVO extends AbstractVO {

    private Integer menuSqno = null;

    private Integer upMenuSqno = null;

    private String mnnm = null;
    
    private String upMnnm = null;

    private Integer menuMrkSq = null;

    private Date rgDtm = null;

    private String rgEno = null;

    private Date chgDtm = null;

    private String chgEno = null;

    public Integer getMenuSqno() {
        return this.menuSqno;
    }

    public void setMenuSqno(Integer menuSqno) {
        this.menuSqno = menuSqno;
    }

    public Integer getUpMenuSqno() {
        return this.upMenuSqno;
    }

    public void setUpMenuSqno(Integer upMenuSqno) {
        this.upMenuSqno = upMenuSqno;
    }

    public String getMnnm() {
        return this.mnnm;
    }

    public void setMnnm(String mnnm) {
        this.mnnm = mnnm;
    }
    
    public String getUpMnnm() {
        return this.upMnnm;
    }

    public void setUpMnnm(String upMnnm) {
        this.upMnnm = upMnnm;
    }

    public Integer getMenuMrkSq() {
        return this.menuMrkSq;
    }

    public void setMenuMrkSq(Integer menuMrkSq) {
        this.menuMrkSq = menuMrkSq;
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
