package com.minervasoft.backend.vo;

public class AbstractResponseVO extends AbstractVO {

    private String rsYn = "Y";
    
    private String rsMsg = null;

    public String getRsYn() {
        return rsYn;
    }

    public void setRsYn(String rsYn) {
        this.rsYn = rsYn;
    }

    public String getRsMsg() {
        return rsMsg;
    }

    public void setRsMsg(String rsMsg) {
        this.rsMsg = rsMsg;
    }
}
