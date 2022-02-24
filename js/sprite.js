import {Vector2} from './vector.js';

class equation {
    constructor() {
        this.degree;
        this.a;
        this.c;
    }
}
class QuadraticEquation extends equation {
    constructor(){

    }
    getData(x,y,x1,y1){
        
        return 
    }
}

class SpriteList {
    constructor() {

    }
}

export class Sprite {
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
<<<<<<< HEAD
    GetSpecificCircle(i, j, k) {
        let middle = new Vector2();
        let radius = 0;
        const mid1 = new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2);
        const mid2 = new Vector2().Divide(new Vector2().Plus(this.position[j], this.position[k]), 2);

=======
    GetSimpleCircle() {
        let middle = new Vector2();
        let radius = 0;
        let length = this.position.length;

        this.position.forEach(vec => {
            middle = middle.Plus(middle, vec);
        });
        middle = middle.Divide(middle, length);
        this.position.forEach(vec => {
            let tempRad = middle.Distance(middle, vec);
            if (tempRad > radius) radius = tempRad;
        });
        
        return {radius:radius, middle:middle};
    }
    GetSpecificCircle(i, j, k) {
        let middle = new Vector2();
        let radius = 0;

        const mid1 = new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2);
        const mid2 = new Vector2().Divide(new Vector2().Plus(this.position[j], this.position[k]), 2);
>>>>>>> origin/HEAD
        const grad1 = -1/this.Gradient(this.position[i], this.position[j]);
        const grad2 = -1/this.Gradient(this.position[j], this.position[k]);
        const tempX = (grad2*mid2.x - grad1*mid1.x - mid2.y + mid1.y)/(grad2 - grad1);
        const tempY = grad1*(tempX - mid1.x) + mid1.y;

        middle = new Vector2(tempX, tempY);
        radius = new Vector2().Distance(middle, this.position[i]);
        
        return {radius:radius, middle:middle};
    }
    GetCircle(){
        let middle = new Vector2();
        let radius = 0;
        let length = this.position.length;
        for (let i=0; i<length; i++) {
            for (let j=i+1; j<length; j++) {
                if (new Vector2().Distance(this.position[i], this.position[j])/2 > radius) {
                    radius = new Vector2().Distance(this.position[i], this.position[j])/2;
                    middle.Set( new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2) );
                }
            }
        }

        if (!this.IsOuterCircle(middle, radius)) {
            // 임의의 삼각형 외접원 중 가장 작은 원을 구한다.
            // radius = float.maxValue;
            radius = Number.MAX_SAFE_INTEGER;
    
            for (let i=0; i<length; i++) {
                for (let j=i+1; j<length; j++) {
                    for (let k=j+1; k<length; k++) {
                        const mid1 = new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2);
                        const mid2 = new Vector2().Divide(new Vector2().Plus(this.position[j], this.position[k]), 2);
    
                        const grad1 = -1/this.Gradient(this.position[i], this.position[j]);
                        const grad2 = -1/this.Gradient(this.position[j], this.position[k]);
                        const tempX = (grad2*mid2.x - grad1*mid1.x - mid2.y + mid1.y)/(grad2 - grad1);
                        const tempY = grad1*(tempX - mid1.x) + mid1.y;
    
                        const tempMiddle = new Vector2(tempX, tempY);
                        const tempRadius = new Vector2().Distance(tempMiddle, this.position[i]);
                        if (tempRadius < radius && this.IsOuterCircle(tempMiddle, tempRadius)) {
                            radius = tempRadius;
                            middle = tempMiddle;
                        }
                    }
                }
            }
            if (radius == Number.MAX_SAFE_INTEGER) console.log("Appropriate outer circle not found");
        }
        
        return {radius:radius, middle:middle};
    }
    distanceD2D(x,y,x1,y1){
        return Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
    }

    IsOuterCircle(mid, rad) {//vector float
        // 해당 원을 벗어나는 점이 하나라도 존재할 경우 false를 반환한다.
        return !this.position.some(vec => { return new Vector2().Distance(vec, mid) > rad });
        // foreach (Vector2 vec in pos) if (new Vector2().Distance(vec, mid) > rad) return false;
    }

    Gradient(pos1, pos2) { 
        return (pos2.y - pos1.y)/(pos2.x - pos1.x); 
    }
    
}

