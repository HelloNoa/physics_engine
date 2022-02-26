import { I_Vector2 } from "../Vector.js";
import { Circle } from "./Circle.js";

interface I_Polygon{
    position: I_Vector2[];
    mass: number;
    circle: Circle;
}

export class Polygon implements I_Polygon{
    position: I_Vector2[];
    mass: number;
    circle: Circle;
    constructor(position: I_Vector2[], mass: number, circle: Circle) {
        this.position = position;
        this.mass = mass;
        this.circle = circle;
    }
}