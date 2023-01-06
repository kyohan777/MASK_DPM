import Anno from"/sfview/js/anno/Anno.js";export default class ShapeArray extends Array{doDrawMasking=true;doDrawAnnotation=true;draw(ctx,clearBackground=true){if(clearBackground){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.restore()}this.forEach((x=>{if(this.doDrawMasking&&x.isMasking()||this.doDrawAnnotation&&!x.isMasking()){x.draw(ctx)}}))}redraw(){this.draw(Anno.ctx)}findLast(func){let shapes=this;for(let i=shapes.length-1;i>=0;i--){let result;if(result=func(shapes[i])){return result}}return null}forEachSelected(func){this.forEach(((shape,index,array)=>{if(shape.selected){func(shape,index,array)}}))}forEachSelectedReverse(func){let shapes=this;for(let i=shapes.length-1;i>=0;i--){const shape=shapes[i];if(shape.selected){func(shape,i,shapes)}}return null}findLastShape(x,y){return this.findLast((function(shape){if(shape.contains(x,y)){return shape}}))}swap(i,j){const temp=this[j];this[j]=this[i];this[i]=temp}unselectAll(){this.forEach((x=>x.selected=false))}removeSelected(){const shapes=this;let i=0;while(i<shapes.length){let shape=shapes[i];if(shape.selected){shapes.splice(i,1)}else{i++}}}clear(){this.splice(0,this.length)}getSelectedCount(){let count=0;this.forEachSelected((_=>count++));return count}}