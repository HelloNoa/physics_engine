import {I_Vector2, Vector2} from './Vector.js';
import { Polygon } from './type/Polygon.js';

interface I_Equation{
    degree: number;
    a: number;
    c: number;
}
class Equation implements I_Equation {
    degree: number;
    a: number;
    c: number;
    constructor() {
        this.degree = 0;
        this.a = 0;
        this.c = 0;
    }
}
class QuadraticEquation extends Equation {
    constructor(){
        super();
    }
    getData(x: number,y: number,x1: number,y1: number): number{
        return 1;
    }
}

class SpriteList {
    constructor() {

    }
}

export interface I_Sprite{
    x: number;
    y: number;
    g: number;
    a: number;
    m: number;
    type: number;
    position: object[];
    width: number;
    height: number;
    canvas: object;
}
export class Sprite implements I_Sprite{
    x: number;
    y: number;
    g: number;
    a: number;
    m: number;
    type: number;
    position: I_Vector2[];
    width: number;
    height: number;
    canvas: object;
    constructor(canvas: object, x: number, y: number, g: number=9.8) {
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
    addForce(x=0,y=0): void{
        this.x += x;
        this.y += y;
        console.log(this.x, this.y);
    }
    setType(num: number): void {
        this.type = num;
    }
    getType(): number {
        return this.type;
    }
    addPosition(position: I_Vector2): void{
        this.position.push(position);
    }
    setPosition(positions: I_Vector2[]): void {
        this.position = positions;
    }
    getPosition(): I_Vector2[] {
        return this.position;
    }

    //TODO GetCircle에서 사용할 예정
    /**도형의 무게중심을 중심으로 갖는 가장 작은 외접원을 반환합니다.*/
    GetSimpleCircle(): {radius: number, middle: I_Vector2} {
        let mid: I_Vector2 = new Vector2();
        let radius: number = 0;
        let length: number = this.position.length;

        // 도형의 무게중심 계산
        this.position.forEach(vec => {
            mid = new Vector2().Plus(mid, vec);
        });
        mid = new Vector2().Divide(mid, length);
        // 무게중심에서 제일 먼 점까지의 거리 계산
        this.position.forEach(vec => {
            let tempRad: number = new Vector2().Distance(mid, vec);
            if (tempRad > radius) radius = tempRad;
        });
        
        return {radius:radius, middle:mid};
    }
    /**i, j, k번째 점으로 이루어진 삼각형의 외접원을 반환합니다.*/
    GetSpecificCircle(i: number, j: number, k: number): {radius: number, middle: I_Vector2} {
        let middle: Vector2 = new Vector2();
        let radius: number = 0;

        // 세 점의 삼각형 외심(삼각형 모든 변의 수직이등분선 교점) 계산
        const mid1: I_Vector2 = new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2);
        const mid2: I_Vector2 = new Vector2().Divide(new Vector2().Plus(this.position[j], this.position[k]), 2);
        const grad1: number = -1/this.Gradient(this.position[i], this.position[j]);
        const grad2: number = -1/this.Gradient(this.position[j], this.position[k]);
        const tempX: number = (grad2*mid2.x - grad1*mid1.x - mid2.y + mid1.y)/(grad2 - grad1);
        const tempY: number = grad1*(tempX - mid1.x) + mid1.y;

        middle = new Vector2(tempX, tempY);
        radius = new Vector2().Distance(middle, this.position[i]);
        
        return {radius:radius, middle:middle};
    }
    GetCircle(): {radius: number, middle: Vector2} {
        let middle: Vector2 = new Vector2();
        let radius: number = 0;
        let length: number = this.position.length;
        for (let i=0; i<length; i++) {
            for (let j=i+1; j<length; j++) {
                if (new Vector2().Distance(this.position[i], this.position[j])/2 > radius) {
                    radius = new Vector2().Distance(this.position[i], this.position[j])/2;
                    middle.Set( new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2) );
                }
            }
        }

        if (!this.IsOuterCircle(middle, radius)) {
            // 임의의 삼각형 외접원 중 가장 작은 원 계산
            radius = Number.MAX_SAFE_INTEGER;
    
            for (let i=0; i<length; i++) {
                for (let j=i+1; j<length; j++) {
                    for (let k=j+1; k<length; k++) {
                        const mid1: I_Vector2 = new Vector2().Divide(new Vector2().Plus(this.position[i], this.position[j]), 2);
                        const mid2: I_Vector2 = new Vector2().Divide(new Vector2().Plus(this.position[j], this.position[k]), 2);
    
                        const grad1: number = -1/this.Gradient(this.position[i], this.position[j]);
                        const grad2: number = -1/this.Gradient(this.position[j], this.position[k]);
                        const tempX: number = (grad2*mid2.x - grad1*mid1.x - mid2.y + mid1.y)/(grad2 - grad1);
                        const tempY: number = grad1*(tempX - mid1.x) + mid1.y;
    
                        const tempMiddle: Vector2 = new Vector2(tempX, tempY);
                        const tempRadius: number = new Vector2().Distance(tempMiddle, this.position[i]);
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
    distanceD2D(x: number,y: number,x1: number,y1: number): number{
        return Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
    }
    /**주어진 원이 다각형을 완전히 덮으면 true를 반환합니다.*/
    IsOuterCircle(mid: I_Vector2, rad: number): boolean {//vector number
        // 해당 원을 벗어나는 점이 하나라도 존재할 경우 false를 반환.
        return !this.position.some(vec => { return new Vector2().Distance(vec, mid) > rad });
        // foreach (Vector2 vec in pos) if (new Vector2().Distance(vec, mid) > rad) return false;
    }

    Gradient(pos1: I_Vector2, pos2: I_Vector2): number { 
        return (pos2.y - pos1.y)/(pos2.x - pos1.x); 
    }

    /**적은 연산으로 두 다각형이 근접했는지 확인합니다.*/
    IsNear(pol1: Polygon, pol2: Polygon) : boolean {
        let dist = new Vector2().Distance(pol1.circle.middle, pol2.circle.middle);

        if (dist > pol1.circle.radius + pol2.circle.radius) return false;
        else return true;
    }
    
    /**두 볼록다각형의 충돌을 정밀 판정합니다.*/
    PolygonCollision(pol1: Polygon, pol2: Polygon) : boolean {
        for (let i=0; i<pol1.position.length + pol2.position.length; i++) {
            let side1 = new Vector2().Minus(pol1.position[i], (i < pol1.position.length - 1 ? pol1.position[i+1] : pol1.position[0]));

            // 정사영된 x좌표 범위를 저장하는 변수
            let range1 = {min : +Infinity, max : -Infinity}, range2 = {min : +Infinity, max : -Infinity};
            if (side1.y != 0) {
                // 다각형의 점을 정사영할 직선의 기울기
                let ang = -side1.x/side1.y;

                pol1.position.forEach((e) => {
                    let x1 = (e.x + ang*e.y) / (ang*ang + 1);
                    if (range1.min > x1) range1.min = x1;
                    if (range1.max < x1) range1.max = x1;
                });
                pol2.position.forEach((e) => {
                    let x2 = (e.x + ang*e.y) / (ang*ang + 1);
                    if (range2.min > x2) range2.min = x2;
                    if (range2.max < x2) range2.max = x2;
                });
            }
            else {
                // 정사영할 직선이 y축에 평행할 경우 (ang = Infinity)
                pol1.position.forEach((e) => {
                    if (range1.min > e.y) range1.min = e.y;
                    if (range1.max < e.y) range1.max = e.y;
                });
                pol2.position.forEach((e) => {
                    if (range2.min > e.y) range2.min = e.y;
                    if (range2.max < e.y) range2.max = e.y;
                });
            }
            // 임의의 수직선에서 두 범위가 겹치지 않으면 두 다각형은 충돌하지 않는다.
            if ((range1.max < range2.min) || (range1.min > range2.max)) return false;
        }

        // 완전 충돌을 가정하여 두 다각형의 질량을 사용해 이동 벡터를 정의한다.

        // collisionAngle_Normalized : 충돌 시 각을 나타내는 단위벡터
        let colAngleN = new Vector2().Minus(pol2.circle.middle, pol1.circle.middle);
        let x1 = pol1.velocity.x, y1 = pol1.velocity.y, x2 = pol2.velocity.x, y2 = pol2.velocity.y, cx = colAngleN.x, cy = colAngleN.y;
        let m1 = pol1.mass, m2 = pol2.mass;
        // 충돌로 인한 속도 변화를 적용한다. 참고 : https://williamecraver.wixsite.com/elastic-equations
        pol1.velocity.x = cx*((x1*cx+y1*cy)*(m1-m2) + 2*m2*(x2*cx+y2*cy))/(m1+m2) - cy*(y1*cx-x1*cy);
        pol1.velocity.y = cy*((x1*cx+y1*cy)*(m1-m2) + 2*m2*(x2*cx+y2*cy))/(m1+m2) - cx*(y1*cx-x1*cy);
        pol2.velocity.x = cx*((x2*cx+y2*cy)*(m2-m1) + 2*m1*(x1*cx+y1*cy))/(m1+m2) - cy*(y2*cx-x2*cy);
        pol2.velocity.y = cy*((x2*cx+y2*cy)*(m2-m1) + 2*m1*(x1*cx+y1*cy))/(m1+m2) - cx*(y2*cx-x2*cy);

        return true;
    }
}

