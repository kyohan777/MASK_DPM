package com.minervasoft.backend.common;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.AbstractView;

public class ExcelView  extends AbstractView  {		
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	 private static final String CONTENT_TYPE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

	    public ExcelView(){}

	    @Override
	    protected boolean generatesDownloadContent(){
	    	//logger.debug("ExcelView generatesDownloadContent  호출!!!");
	        return true;
	    }

	    @Override
	    protected final void renderMergedOutputModel(Map<String,Object> model , HttpServletRequest request , HttpServletResponse response) throws Exception {
	    	//logger.debug("ExcelView renderMergedOutputModel  호출!!!");
	    	// 컬럼정보
            String gridLabels = (String) model.get("gridLabels");
            String gridNames  = (String) model.get("gridNames");
            String gridWidths = (String) model.get("gridWidths");
            String gridAligns = (String) model.get("gridAligns");
            
            List<Object> rowList = (List<Object>) model.get("excelList");            
            String vo =  (String) model.get("VO");
            Class<?> voClass = Class.forName("com.minervasoft.backend.vo." + vo);                        
            List<Method> methodList = new ArrayList<Method>();            
            String[] nameList = gridNames.split(",");
            for(String name : nameList) {
            	String methodName = "get" + name.substring(0, 1).toUpperCase() + name.substring(1);
            	if (!methodName.equals("getCb")) {
            		methodList.add(voClass.getMethod(methodName, null));
            	}
            	            	
            }
            
	    	// SXSSFWorkbook 생성
	    	SXSSFWorkbook workbook = new SXSSFWorkbook();
	    	workbook.setCompressTempFiles(true);
	    	
	    	// SXSSFSheet 생성
	    	SXSSFSheet sheet = (SXSSFSheet) workbook.createSheet();
            sheet.setRandomAccessWindowSize(100); // 메모리 행 100개로 제한, 초과 시 Disk로 flush
            
            String[] widthList = gridWidths.split(",");
            for(int i=0; i<widthList.length; i++) {
            	sheet.setColumnWidth(i, Integer.parseInt(widthList[i]) * 50);
            }
            	      
            // Cell 스타일
            CellStyle headSt = workbook.createCellStyle();
            headSt.setAlignment(CellStyle.ALIGN_CENTER);
            headSt.setBorderBottom(CellStyle.BORDER_THIN);
            headSt.setBorderLeft(CellStyle.BORDER_THIN);
            headSt.setBorderRight(CellStyle.BORDER_THIN);
            headSt.setBorderTop(CellStyle.BORDER_THIN);
            headSt.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
            headSt.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
            
            CellStyle bodyStLeft = workbook.createCellStyle();
            bodyStLeft.setAlignment(CellStyle.ALIGN_LEFT);
            bodyStLeft.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStLeft.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStLeft.setBorderRight(CellStyle.BORDER_THIN);
            bodyStLeft.setBorderTop(CellStyle.BORDER_THIN);

            CellStyle bodyStCenter = workbook.createCellStyle();
            bodyStCenter.setAlignment(CellStyle.ALIGN_CENTER);
            bodyStCenter.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStCenter.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStCenter.setBorderRight(CellStyle.BORDER_THIN);
            bodyStCenter.setBorderTop(CellStyle.BORDER_THIN);
            
            CellStyle bodyStRight = workbook.createCellStyle();
            bodyStRight.setAlignment(CellStyle.ALIGN_RIGHT);
            bodyStRight.setBorderBottom(CellStyle.BORDER_THIN);
            bodyStRight.setBorderLeft(CellStyle.BORDER_THIN);
            bodyStRight.setBorderRight(CellStyle.BORDER_THIN);
            bodyStRight.setBorderTop(CellStyle.BORDER_THIN);
            
            String[] alignList = gridAligns.split(",");
            List<CellStyle> bodyStList = new ArrayList<CellStyle>();
            for(String align : alignList) {
            	if(align.equals("left")) {
            		bodyStList.add(bodyStLeft);            		
            	}
            	else if(align.equals("right")) {
            		bodyStList.add(bodyStRight);             		
            	}
            	else {
            		bodyStList.add(bodyStCenter);
            	}            
            }            

            // Header 생성
            SXSSFRow header = (SXSSFRow) sheet.createRow(0);
            setHeaderCellValue(header, gridLabels, headSt); // 헤더 칼럼명 설정
                        
            // 행 데이터 생성
            int rowCount = 1;
            if(rowList != null) {
            	for(int i = 0; i < rowList.size(); i++) {
            		SXSSFRow aRow = (SXSSFRow) sheet.createRow(rowCount++);
            		setEachRow(aRow, rowList.get(i), methodList, bodyStList);
            	}
            		
            }
            
            ServletOutputStream out = response.getOutputStream();
            workbook.write(out);
            if (out != null) out.close();

	    }
	    
		 
	    /**
	     * Header 생성
	     * @param header
	     * @param gridLabels
	     */
	    private void setHeaderCellValue(SXSSFRow header, String gridLabels, CellStyle headSt) {
	    	String[] labelList = gridLabels.split(",");
	    	if(labelList != null) {
	    		for(int i=0; i<labelList.length; i++) {
	    			Cell cell = header.createCell(i);
	    			cell.setCellValue(labelList[i]);
	    			cell.setCellStyle(headSt);
	    		}
	    	}
	    }
	    
	    /**
	     * 행 데이터 생성
	     * @param aRow
	     * @param vo
	     * @param methodList
	     * @throws Exception
	     */
	    private void setEachRow(SXSSFRow aRow, Object vo, List<Method> methodList, List<CellStyle> bodyStList) throws Exception {
	    	for(int i=0; i<methodList.size(); i++) {
	    		
	    		String val = methodList.get(i).invoke(vo).toString();
	    		//String val = methodList.get(i).invoke(vo).toString();
	    		Cell cell = aRow.createCell(i);
	    		cell.setCellValue(val);
	    		cell.setCellStyle(bodyStList.get(i));
	    	}
	    }	
}
