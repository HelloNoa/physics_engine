import {Enguine} from './engine.js';
import {Dev} from './dev/dev.js';
window.onload = ()=>{
    // new Enguine('enguine');
    new Dev(new Enguine('enguine'));

}
  