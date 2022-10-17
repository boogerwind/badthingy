let ENG_ObjectList = [];
let ENG_cx = 0;
let ENG_cy = 0;
let ENG_czoom = 0;
function ENG_Collisions(a,b,x,y) {
	  let nx = a.x+x;
    let ny = a.y+y;
    return !(
        ((ny + a.height) < (b.y)) ||
        (ny > (b.y + b.height)) ||
        ((nx + a.width) < b.x) ||
        (nx > (b.x + b.width))
    );
}

class BaseObject {
	constructor(id,x,y,w,h,color,img) {
  	this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.img = img || "none";
    this.hitbox = 1;
    this.type = 1;
    this.func = "none";
    this.id = id;
    ENG_ObjectList.push(this);
  }
  show() {
  	if (this.img == "none") {
    	fill(this.color);
    	rect(this.x-ENG_cx,this.y-ENG_cy,this.width,this.height);
    } else {
    	image(this.img,(this.x-ENG_cx),(this.y-ENG_cy),this.width,this.height);
    }
  }
}
class Decor extends BaseObject {
	constructor(id,x,y,w,h,color,img) {
  	super(id,x,y,w,h,color,img);
    this.type = 2;
    this.hitbox = 0;
  }
  display() {
  	this.show();
  }
}
class Wall extends BaseObject {
		constructor(id,x,y,w,h,color,img) {
  	super(id,x,y,w,h,color,img);
    this.type = 1;
    this.hitbox = 1;
  }
  display() {
  	this.show();
  }
}
class ControllableObject extends BaseObject {
	constructor(id,x,y,w,h,color,img) {
  	super(id,x,y,w,h,color,img);
    ENG_ObjectList.pop();
    this.type = 3;
    this.keys = [87,83,65,68,32,188,190];
  }
  findCollision(ax,ay) {
  	for (let w of ENG_ObjectList) {
    	if (w.hitbox == 1) {
      	if (ENG_Collisions(this,w,ax,ay)) {
        	return w;
        }
      }
    }
  }
  onbtn1() {
  	
  }
  onbtn2() {
  	
  }
  onbtn3() {
  	
  }
  update() {
  	let xmov = 0;
    let ymov = 0;
  	if(keyIsDown(this.keys[0])) {
    	ymov = -1;
    }
    if(keyIsDown(this.keys[1])) {
    	ymov = 1;
    }
    if (keyIsDown(this.keys[2])) {
    	xmov = -1;
    }
    if (keyIsDown(this.keys[3])) {
    	xmov = 1;
    }
    if (keyIsDown(this.keys[5])) {
    	this.onbtn1();
    }
    if (keyIsDown(this.keys[6])) {
    	this.onbtn2();
    }
    if (!this.findCollision(xmov*2,0)) {
    	this.x+=xmov*playerSpeed;
      ENG_cx+=xmov*playerSpeed;
    }
    if (!this.findCollision(0,ymov*2)) {
    	this.y+=ymov*playerSpeed;
      ENG_cy+=ymov*playerSpeed;
    }
  }
  display() {
  	this.show();
  }
}
function renderObjects() {
	for (let x of ENG_ObjectList) {
  	x.display();
  }
}
function zoom(a) {
	ENG_czoom+=a;
}



let playerSpeed = 2;
let pImg;
let stoneimg;
function preload() {
	pImg = loadImage('data:image/jpeg;base64,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');
  stoneimg = loadImage('data:image/jpeg;base64,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');
}
class UIElement {
	constructor(x,y,w,h,bgcolor) {
  	this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.bgcolor = bgcolor;
  }
  show() {
  	fill(this.bgcolor);
  	rect(this.x,this.y,this.width,this.height);
  }
}
class Label extends UIElement {
	constructor(x,y,w,h,bgcolor,fgcolor,text) {
  	super(x,y,w,h,bgcolor);
    this.fgcolor = fgcolor;
    this.text = text;
  }
  updateText(newt) {
  	this.text = newt;
  }
  updateBG() {
  	this.width=this.text.length*7;
  }
  display() {
  	this.show();
    fill(this.fgcolor);
    text(this.text,this.x+1,this.y+11);
  }
  updatePos(x,y) {
  	this.x = x;
    this.y = y;
  }
 	update(newt,x,y) {
  	this.x = x;
    this.y = y;
    this.text = newt;
    this.width=this.text.length*7;
  }
}
function mousePressed() {
 let newx = Math.ceil(mouseX/16)*16;
 let newy = Math.ceil(mouseY/16)*16;
 let offx = Math.ceil(ENG_cx/16)*16;
 let offy = Math.ceil(ENG_cy/16)*16;
 j = new Decor("none",(Math.ceil((newx+offx)/16)*16)-16,(Math.ceil((newy+offy)/16)*16)-16,16,16,"blue",stoneimg);
}
