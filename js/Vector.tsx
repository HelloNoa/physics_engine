export interface I_Vector2 {
    x: number;
    y: number;
}
export class Vector2 implements I_Vector2{
    x: number;
    y: number;
    constructor(x: number=0, y: number=0) {
        this.x = x;
        this.y = y;
    }
    Get(): object{
        return this;
    }
    Set(v:any): void{
        this.x = v.x;
        this.y = v.y;
    }
    Plus(v1: I_Vector2, v2: I_Vector2): I_Vector2 {
        return new Vector2(v2.x+v1.x, v2.y+v1.y);
    }
    Minus(v1: I_Vector2, v2: I_Vector2): I_Vector2 {
        return new Vector2(v2.x-v1.x, v2.y-v1.y);
    }
    Multiple(v1: I_Vector2, d: number): I_Vector2 {
        return new Vector2(v1.x*d, v1.y*d);
    }
    Divide(v1: I_Vector2, d: number): I_Vector2 {
        return new Vector2(v1.x/d, v1.y/d);
    }
    Distance(v1: I_Vector2, v2: I_Vector2): number {
        return Math.sqrt(Math.pow(v2.x-v1.x,2)+Math.pow(v2.y-v1.y,2));
    }
}