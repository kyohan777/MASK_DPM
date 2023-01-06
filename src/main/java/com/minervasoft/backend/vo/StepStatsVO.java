package com.minervasoft.backend.vo;

public class StepStatsVO extends AbstractVO {

    private String basDt = null;

    private String maskPrgStsc = null;

    private String maskPrgStsNm = null;

    private Integer allCn = null;

    private Integer prcCn = null;

    private String prgRatio = null;

    public String getBasDt() {
        return this.basDt;
    }

    public void setBasDt(String basDt) {
        this.basDt = basDt;
    }

    public String getMaskPrgStsc() {
        return this.maskPrgStsc;
    }

    public void setMaskPrgStsc(String maskPrgStsc) {
        this.maskPrgStsc = maskPrgStsc;
    }

    public String getMaskPrgStsNm() {
        return this.maskPrgStsNm;
    }

    public void setMaskPrgStsNm(String maskPrgStsNm) {
        this.maskPrgStsNm = maskPrgStsNm;
    }

    public Integer getAllCn() {
        return this.allCn;
    }

    public void setAllCn(Integer allCn) {
        this.allCn = allCn;
    }

    public Integer getPrcCn() {
        return this.prcCn;
    }

    public void setPrcCn(Integer prcCn) {
        this.prcCn = prcCn;
    }

    public String getPrgRatio() {
        return this.prgRatio;
    }

    public void setPrgRatio(String prgRatio) {
        this.prgRatio = prgRatio;
    }
}
