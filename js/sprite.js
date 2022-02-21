class SpriteList {
    constructor() {

    }
}

class Sprite {
    constructor(canvas, x, y, g=9.8) {
        this.canvas = canvas;
        
        this.x= x;
        this.y= y;
        this.g = g;
        this.a = 0;
        this.m = 1;
        this.type = 0;
        this.position = [];
        this.width = 1;
        this.height = 1;
    }
    addForce(x=0,y=0){
        this.x += x;
        this.y += y;
        console.log(this.x, this.y);
    }
    setType(num) {
        this.type = num;
    }
    getType() {
        return this.type;
    }
    addPosition(position){
        this.position.push(position);
    }
    setPosition(positions) {
        this.position = positions;
    }
    getPosition() {
        return this.position;
    }
    getCircle() {
        let r = 0;
        let idx = [];
        for (let i=0; i<this.getPosition().length-1; i++) {
            for (let j=i+1; j<this.getPosition().length; j++) {
                const r2 = this.distanceD2D(this.getPosition()[i].x,this.getPosition()[i].y,this.getPosition()[j].x,this.getPosition()[j].y);
                if (r<r2) {
                    r=r2;
                    idx = [];
                    idx.push(i);
                    idx.push(j);
                }
            }
        }
        return {r:r, idx:idx};
    }
    distanceD2D(x,y,x1,y1){
        return Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
    }
    
}