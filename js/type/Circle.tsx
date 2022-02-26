import { I_Vector2 } from "../Vector.js";

interface I_Circle {
    middle: I_Vector2;
    radius: number;
}

export class Circle implements I_Circle{
    middle: I_Vector2;
    radius: number;
    constructor(middle: I_Vector2, radius: number=1){
        this.middle = middle;
        this.radius = radius;
    }
}