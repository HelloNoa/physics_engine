export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    Get() {
        return this;
    }
    Set(v) {
        this.x = v.x;
        this.y = v.y;
    }
    Plus(v1, v2) {
        return new Vector2(v2.x + v1.x, v2.y + v1.y);
    }
    Minus(v1, v2) {
        return new Vector2(v2.x - v1.x, v2.y - v1.y);
    }
    Multiple(v1, d) {
        return new Vector2(v1.x * d, v1.y * d);
    }
    Divide(v1, d) {
        return new Vector2(v1.x / d, v1.y / d);
    }
    Distance(v1, v2) {
        return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
    }
    // 두 2차원 백터의 내적 연산
    Dot(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
    GetUnitVector2(v) {
        return new Vector2(Math.sqrt(1 - Math.pow(v.y, 2)), Math.sqrt(1 - Math.pow(v.x, 2)));
    }
}
export class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // 두 3차원 백터의 외적 연산
    Cross(v1, v2) {
        return new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x));
    }
}
