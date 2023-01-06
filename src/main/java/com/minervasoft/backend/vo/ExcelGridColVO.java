package com.minervasoft.backend.vo;

import java.util.List;

public class ExcelGridColVO extends AbstractVO {

	private String gridLabel = "";
	
	private String gridName = "";
	
	private Integer gridWidth = 0;	
	
	private String gridAlign = "";		

	public String getGridLabel() {
		return gridLabel;
	}

	public void setGridLabel(String gridLabel) {
		this.gridLabel = gridLabel;
	}

	public String getGridName() {
		return gridName;
	}

	public void setGridName(String gridName) {
		this.gridName = gridName;
	}

	public Integer getGridWidth() {
		return gridWidth;
	}

	public void setGridWidth(Integer gridWidth) {
		this.gridWidth = gridWidth;
	}

	public String getGridAlign() {
		return gridAlign;
	}

	public void setGridAlign(String gridAlign) {
		this.gridAlign = gridAlign;
	}	
	
}
