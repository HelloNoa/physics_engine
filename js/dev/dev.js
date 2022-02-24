import {Layer} from './../other.js';

export class Dev{
    constructor(Enguine){
        this.Enguine = Enguine;
        const layer = document.createElement('div');
        document.body.appendChild(layer);
    }
}