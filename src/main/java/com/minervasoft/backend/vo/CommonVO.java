package com.minervasoft.backend.vo;

public class CommonVO extends AbstractVO {

	private String serverTime = null;
	
    private String serverDate = null;
    
    private String fileExeCase = null;
    
    private String filePath = null;
    
    private String copyFilePath = null;
    
    private String fileExeYn = null;

	public String getServerTime() {
		return serverTime;
	}

	public void setServerTime(String serverTime) {
		this.serverTime = serverTime;
	}

	public String getServerDate() {
		return serverDate;
	}

	public void setServerDate(String serverDate) {
		this.serverDate = serverDate;
	}

	public String getFileExeCase() {
		return fileExeCase;
	}

	public void setFileExeCase(String fileExeCase) {
		this.fileExeCase = fileExeCase;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getCopyFilePath() {
		return copyFilePath;
	}

	public void setCopyFilePath(String copyFilePath) {
		this.copyFilePath = copyFilePath;
	}

	public String getFileExeYn() {
		return fileExeYn;
	}

	public void setFileExeYn(String fileExeYn) {
		this.fileExeYn = fileExeYn;
	}


}
