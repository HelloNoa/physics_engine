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
    // 두 2차원 백터의 내적 연산
    Dot(v1: I_Vector2, v2: I_Vector2): number {
       return  (v1.x*v2.x)+(v1.y*v2.y);
    }
    GetUnitVector2(v: I_Vector2): I_Vector2 {
        return new Vector2(Math.sqrt(1 - Math.pow(v.y, 2)), Math.sqrt(1 - Math.pow(v.x, 2)));
    }
}
export interface I_Vector3 {
    x: number;
    y: number;
    z: number;
}

export class Vector3 implements I_Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // 두 3차원 백터의 외적 연산
    Cross(v1: I_Vector3, v2: I_Vector3): I_Vector3{
        return new Vector3((v1.y*v2.z) - (v1.z*v2.y), (v1.z*v2.x) - (v1.x*v2.z), (v1.x*v2.y) - (v1.y*v2.x));
    }
}