export class Vector2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    Get(){
        return this;
    }
    Set(v){
        this.x = v.x;
        this.y = v.y;
    }
    Plus(v1, v2) {
        return new Vector2(v2.x+v1.x, v2.y+v1.y);
    }
    Minus(v1, v2) {
        return new Vector2(v2.x-v1.x, v2.y-v1.y);
    }
    Multiple(v1,d) {
        return new Vector2(v1.x*d, v2.y*d);
    }
    Divide(v1, d) {
        return new Vector2(v1.x/d, v1.y/d);
    }
    Distance(v1, v2) {
        return Math.sqrt(Math.pow(v2.x-v1.x,2)+Math.pow(v2.y-v1.y,2));
    }
}