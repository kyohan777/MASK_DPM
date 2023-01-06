<%@ page language="java"%>
<%
	String filename = request.getParameter("filename");
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IMG Viewer</title>
    <link rel="stylesheet alternative" href="/sfview/theme/dark/css/viewer.css" class="alternative" disabled id="dark">
    <link rel="stylesheet alternative" href="/sfview/theme/light/css/viewer.css" class="alternative" disabled id="light">
    <script src="/sfview/js/jquery-3.6.0.min.js"></script>
    <script src="/sfview/js/jszip.min.js"></script>

    <script src="/sfview/theme/js/toolbar.js"></script>
    <script src="/sfview/theme/js/page_control.js"></script>

    <script src="/sfview/js/event_map.js"></script>
    <script src="/sfview/js/thumbnails.js"></script>
    <script src="/sfview/js/view.js"></script>
    <style>
        @media screen  {	
            div#top {
                display: flex; 
                width:100%; 
                height:100%;
                margin: 0;
            }
            /*
            .biz-box {
                display: inline-block;
                position:absolute;
                overflow-x: visible;
                overflow-y: scroll;
                width:180px;
                height: 100vh;
            }
            */
            
            div.view-box{
                display: block;
                height:100vh;
                width:calc(100vw);
            }

			.v-main, iframe.embedded, .v-wrap .v-main .v-toolbar, .v-wrap .v-main .v-anno-wrap {
			  width: calc(100vw - 171px);	
			}
	
			.btn {
				margin: 10px 20px;
				cursor: pointer;
			}
			
			h2 {
				margin: 10px;
	  			font-weight: bolder;
			}		
        }
        
    </style>       
</head>
<body>
	<div id="top">
		<!-- 	
		<div class="biz-box no-print">
		</div>
		 -->
		<div id="id_view-box" class="view-box"></div>
	</div>
</body>
<script>
    $(document).ready(function(){
    	$('div#page').click(function(){
            $thumbnails.setImg("/sfview/show_file.jsp?filename=/lzwc.tif");
    	});
    	$('div#list').click(function(){
    		var data = [
    		    ["/sfview/show_file.jsp?filename=/g4_no_ext", "ccitt g4"],
    		    ["/sfview/show_file.jsp?filename=/lzwc.tif", "lzwc.tif"],
    		    ["/sfview/show_file.jsp?filename=/jpeg_5page.tif", "jpeg_5page.tif"],
    		    ["/sfview/show_file.jsp?filename=/100.pdf","100.pdf"]
    		];    		
            $thumbnails.setImg(data);
    	});
    	$('div#add').click(function(){
            $thumbnails.empty();
            $thumbnails.addImg("/sfview/show_file.jsp?filename=/g4_no_ext");
            $thumbnails.addImg("/sfview/show_file.jsp?filename=/lzwc.tif");
            $thumbnails.first();
            $thumbnails.show();
    	});
    	$('div#add2').click(function(){
    		var data = [
    		    ["/sfview/show_file.jsp?filename=/g4_no_ext", "g4 no extention"],
    		    ["/sfview/show_file.jsp?filename=/lzwc.tif", "lzwc file"],
    		    ["/sfview/show_file.jsp?filename=/jpeg_5page.tif", "jpeg 5 page tiff"]
    		];    		
            $thumbnails.empty();
            $thumbnails.addImg(data);
            $('img.thumbnail').each(function(_, img){
            	$(img).attr('isimg', true);
            })
            $thumbnails.first();
            $thumbnails.show();
    	});
    	$('div#addTag').click(function(){
    		var data = [
    		    ["/sfview/show_file.jsp?filename=/g4_no_ext", "ccitt g4", "tag1"],
    		    ["/sfview/show_file.jsp?filename=/lzwc.tif", "lzwc.tif", "tag2"],
    		];    		
            $thumbnails.setImg(data);
    	});
    	
    	$('div#getImgs').click(function(){
    		var data = $thumbnails.getImgs();
    		console.log(data);
    	});
    	$('div#getSelectedImgs').click(function(){
    		var data = $thumbnails.getSelectedImgs();
    		console.log(data);
    	});    	
    	
    	// view
    	$('div#fitVert').click(function(){
            $view.setFit('fit_vert');
    	});
    	$('div#fitHori').click(function(){
            $view.setFit('fit_hori');
    	});
    	$('div#fit100').click(function(){
            $view.setFit('fit_100');
    	});
    	$('div#zoomIn').click(function(){
            $view.zoom('zoom_in');
    	});
    	$('div#zoomOut').click(function(){
            $view.zoom('zoom_out');
    	});
    	$('div#setWidth').click(function(){
            Toolbar.setWidth('calc(100vw - 171px - 180px)'); // ref: style in head
            $view.setFit('fit_hori');           
    	});
    	$('div#margin').click(function(){
            $view.setMargin(50); //default:15
            $view.redraw();
    	});
    	$('div#empty').click(function(){
            $thumbnails.empty();
    	});
    	$('div#hide').click(function(){
           Toolbar.showThumbnails(false);
    	});
    	$('div#show').click(function(){
            Toolbar.showThumbnails(true);
     	});
    	$('div#min').click(function(){
            Toolbar.showMin(true);
     	});
    	$('div#max').click(function(){
            Toolbar.showMin(false);
     	});
    	
    	$('div#clear').click(function(){
            $view.clear();
    	});
    	$('div#load').click(function(){
            $view.loadImage("/sfview/show_file.jsp?filename=/lzwc.tif", "g4 image", function(width, height, ratio, curFit){
            	alert("loaded:" + width);
            });
    	});
    	
    	$('div#hideToolbar').click(function(){
            Toolbar.showToolbar(false);
     	});
     	$('div#showToolbar').click(function(){
             Toolbar.showToolbar(true);
      	});
     	
     	$('div#lastFit').click(function(){
     		//caution: run it in initViewer
            $view.on('fit', function(fit, curRatio) { 
            	$view.setInitFit(fit);
            });
     	});
   });
</script>   
<script>
    var $thumbnails = null; 
    var $view = null; 
    $('#light').prop('disabled', false);
    
    $(document).ready(function(){
    	initViewer(function(_thumbnails, _view){
            $thumbnails = _thumbnails;
            $view = _view;
            /*
            $.get('/sfview/list_file.jsp', { 'folder': '/' }, function(data){
                $thumbnails.setImg(data);
            });
            */
            
            Toolbar.showToolbar(false);
            Toolbar.showThumbnails(false);
        });
    	
    	/*
    	var rowid = parent.$("#jqGrid").jqGrid("getGridParam","selrow");
    	console.log("rowid:" + rowid);
    	if(rowid != null && rowid != undefined) {
    		parent.dataSelect(rowid);
    	}
    	*/
    	
    });
    
    function viewerSetImg(filename) {
    	console.log("filename:" + filename);
    	$thumbnails.empty();
    	$view.clear(); 
    	
    	//$thumbnails.setImg("/sfview/show_file.jsp?filename=" + filename);
    	$thumbnails.setImg("/showPathFile.do?filename=" + filename);
    }
    
    
	function scrollToSeq(pageno) {
		$thumbnails.scrollToSeq(pageno);
    }
    
</script>   
</html>