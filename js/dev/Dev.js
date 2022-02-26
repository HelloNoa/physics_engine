import { Layer } from '../Other.js';
export class Dev {
    constructor(Enguine) {
        this.Enguine = Enguine;
        console.log(Layer);
        const layer = document.createElement('div');
        document.body.appendChild(layer);
    }
}
