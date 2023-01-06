export default class Shape{name;type;shapeType;shapeStyle;selected=false;drawShape=null;strokeStyle=null;lineWidth=null;tracker;constructor(strokeStyle=null,drawShape=null){this.strokeStyle=strokeStyle;if(drawShape)this.drawShape=drawShape}setBase(name,type,shapeType,shapeStyle){this.name=name;this.type=type;this.shapeType=shapeType;this.shapeStyle=shapeStyle}moveStep(sx,sy){console.error(this,"moveStep() not defined")}contains(rx,ry){console.error(this,"contains() not defined");return false}*getPoints(){console.error(this,"*getPoints() not defined");yield[-1,-1]}sizeStep(sw,sh){}shapeStep(sx,sy,sw,sh){}rotate(ctx,cx,cy){}normalize(){}setStepAngle(){}draw(ctx){if(this.drawShape==null)return;ctx.save();this.rotate(ctx);if(this.fillStyle)ctx.fillStyle=this.fillStyle;if(this.strokeStyle)ctx.strokeStyle=this.strokeStyle;if(this.lineWidth)ctx.lineWidth=this.lineWidth;ctx.beginPath();this.drawShape(ctx);if(this.fillStyle)ctx.fill();if(this.strokeStyle)ctx.stroke();if(this.selected){this.tracker.draw(ctx,this)}ctx.closePath();ctx.restore()}contained(bx,by,ex,ey){let iterator=this.getPoints();while(true){let next=iterator.next();if(next.done)break;const[x,y]=next.value;if(x<bx||x>ex||y<by||y>ey)return false}return true}setJson(json){this.angle=json.angle*Math.PI/180;const style=json.style;if(style&&style.hasOwnProperty("stroke")){this.strokeStyle=style.stroke.color;this.lineWidth=style.stroke.width}}getJson(){const json=new Object;json.name=this.name;json.type=this.type;json.shapeType=this.shapeType;json.shapeStyle=this.shapeStyle;json.angle=this.angle*180/Math.PI;const style=new Object;json.style=style;if(this.strokeStyle||this.lineWidth){const stroke=new Object;style.stroke=stroke;stroke.color=this.strokeStyle;stroke.width=this.lineWidth}return json}isMasking(){return this.type=="masking"}}