import {Enguine} from './Engine.js';
import {Dev} from './dev/Dev.js';
window.onload = ()=>{
    new Enguine('enguine');
    new Dev(new Enguine('enguine'));

}
  