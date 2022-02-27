import { I_Vector2, Vector2 } from "../Vector.js";
import { Circle } from "./Circle.js";

interface I_Polygon{
    position: I_Vector2[];
    mass: number;
    circle: Circle;

    velocity : I_Vector2;
}

export class Polygon implements I_Polygon{
    position: I_Vector2[];
    mass: number;
    circle: Circle;
    velocity: I_Vector2;
    constructor(position: I_Vector2[], mass: number, circle: Circle) {
        this.position = position;
        this.mass = mass;
        this.circle = circle;

        this.velocity = new Vector2();
    }
}