import Anno from"/sfview/js/anno/Anno.js";import Rectangle from"/sfview/js/anno/Rectangle.js";import Ellipse from"/sfview/js/anno/Ellipse.js";import Line from"/sfview/js/anno/Line.js";import Polyline from"/sfview/js/anno/Polyline.js";import Text from"/sfview/js/anno/Text.js";import Stamp from"/sfview/js/anno/Stamp.js";import Img from"/sfview/js/anno/Img.js";export default class Factory{static create(id,x,y){let shape;const width=1;switch(id){case"annotation.rectangle":shape=new Rectangle(x,y,width,width);shape.setBase("rectangle","annotation","shape","box");break;case"annotation.ellipse":shape=new Ellipse(x,y,width,width);shape.setBase("ellipse","annotation","shape","box");break;case"annotation.line":shape=new Line(x,y,x+width,y+width);shape.setBase("line","annotation","shape","line");break;case"annotation.arrow":shape=new Line(x,y,x+width,y+width);shape.setBase("arrow","annotation","shape","line");shape.setLineCapHead();shape.setLineCapTail();break;case"annotation.pen":shape=new Polyline;shape.setBase("pen","annotation","shape","box");shape.add(x,y);break;case"annotation.highlightpen":shape=new Polyline("#ffff00a6");shape.setBase("highlightpen","annotation","shape","box");shape.lineWidth=20;shape.add(x,y);break;case"annotation.textbox":shape=new Text(x,y,width,width,"#feeeb0","#5b522b","#000000");shape.setBase("textbox","annotation","shape","box");break;case"annotation.stamp":shape=new Stamp(x,y,width,width,"APPROVE");shape.setBase("stamp","annotation","shape","box");break;case"annotation.checker":shape=new Img(x,y,width,width,Anno.checker);shape.setBase("checker","annotation","image","box");break;case"masking.ellipse":shape=new Ellipse(x,y,width,width,"#000000",null);shape.setBase("masking.ellipse","masking","shape","box");break;case"masking.rectangle":shape=new Rectangle(x,y,width,width,"#000000",null);shape.setBase("masking.rectangle","masking","shape","box");break;default:console.log("undefined shape id:"+id);return}if(shape){shape.tracker=Anno.tracker.getTracker(shape);Anno.shapes.push(shape)}return shape}}