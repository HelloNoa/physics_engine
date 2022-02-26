import {I_Sprite, Sprite}  from './Sprite.js';
import {Layer} from './Other.js';
import {I_Vector2, Vector2} from './Vector.js';

import json from '../json/test.js';
import RandomColor from './RandomColor.js';
console.log(json);

interface I_Key{
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean,
}
interface I_Enguine{
    ratio: number;
    fps: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    box: I_Sprite[];
    char: Sprite;
    key: I_Key;
}
export class Enguine implements I_Enguine{
    ratio: number;
    fps: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    box: I_Sprite[];
    char: Sprite;
    key: I_Key;
    constructor (id: string) {
        this.key = {
            left: false,
            right: false,
            up: false,
            down: false,
        }
        this.ratio = 1;
        this.fps = 60;
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        //이미지 객체 생성
        var imgClo = new Image();
        imgClo.src="./is/project_eo.png";
        imgClo.addEventListener('load', ()=>{
            // ctx.drawImage( imgClo , 0, 0, 128/this.ratio, 128/this.ratio);
        },false);
        this.box = [];

        for(let i=0; i<60; i++) {
            this.box.push(new Sprite(this.canvas,i*8,0,9.8/60*(i+1)));
            // this.box.push(new Sprite(this.canvas,i*8,0,9.8));
        }
        this.char = new Sprite(this.canvas,0, 0, 9.8);
        this.char.addPosition({x:100, y:100});
        this.char.addPosition({x:200, y:50});
        this.char.addPosition({x:300, y:100});
        this.char.addPosition({x:250, y:200});
        this.char.addPosition({x:150, y:200});
        // this.draw();
        setTimeout(()=>{
            this.ddsada();
        },0);
        this.event();
        Layer.SetDefault();
        Layer.AddLayer('a');
        Layer.AddLayer('b');
        Layer.AddLayer('e');
        Layer.AddLayer('f');
        Layer.AddLayer('g');
        Layer.AddLayer('h');
        Layer.EffectOneLayer('a','b');
        console.log(Layer.GetLayer());
    }
    ddsada() {
        this.key.left && this.char.x--;
        this.key.right && this.char.x++;
        this.key.up && this.char.y--;
        this.key.down && this.char.y++;

        // console.log(this.ctx);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'orange';
        this.ctx.strokeStyle = 'orange';
        this.ctx.moveTo(100, 100);
        this.char.getPosition().forEach((e: I_Vector2, idx:number): void => {
            if (idx != 0) {
                this.ctx.lineTo(e.x, e.y);
            }
        });
        this.ctx.closePath();
        this.ctx.stroke();

        // this.ctx.fill();
        // this.ctx.stroke();

        // let circle = this.char.GetCircle();
        let circle = this.char.GetSimpleCircle();

        // let p1 = this.char.getPosition()[circle.idx[0]]
        // let p2 = this.char.getPosition()[circle.idx[1]]

        this.ctx.beginPath();
        // console.log(circle);
        this.ctx.strokeStyle = RandomColor.random(true);
        this.ctx.arc(circle.middle.x+this.char.x, circle.middle.y+this.char.y, circle.radius, 0, Math.PI * 2);
        this.ctx.stroke();

        setTimeout(() => {
            // this.ddsada();
        }, 1000/this.fps);
    }
    draw() {
        // ctx.drawImage( imgClo , 0, 0, 128/this.ratio, 128/this.ratio);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.box.forEach(e=>{
            if (this.canvas.height > e.y-4*this.ratio) {
                e.a += (e.g/this.fps);
                this.ctx.fillStyle = 'orange';
                e.a>=e.g && (e.a=e.g);
                e.y += e.a;
                // console.log(y);
                this.ctx.fillRect(e.x*this.ratio, e.y, 4*this.ratio, 4*this.ratio);
            } else {
                this.ctx.fillRect(e.x*this.ratio, e.height-(4*this.ratio), 4*this.ratio, 4*this.ratio);

                if (e.a != 0){
                    e.a=0;
                    setTimeout(()=>{
                        e.y=0;
                    }, 1000);
                }
            }
        });
        setTimeout(() => {
            this.draw();
        }, 1000/this.fps);
    }

    event() {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;
        window.onresize = (e)=>{
            width = document.body.clientWidth;
            height = document.body.clientHeight;
            this.ratio = width>height ? height/500 : width/500;
            console.log(this.ratio)
            this.canvas.width = width>height ? height : width;
            this.canvas.height = width>height ? height : width;
            this.ddsada();
        }

        window.onkeydown = (e)=>{
            switch(e.keyCode) {
                case 65: //left
                case 37:
                    this.key.left = true;
                    break;
                case 68: //right
                case 39:
                    this.key.right = true;
                    break;
                case 87: //up
                case 38:
                    this.key.up = true;
                    break;
                case 83: //down
                case 40:
                    this.key.down = true;
                    break;
                default:
                    break;
            }
            // 65 37
            // 68 39
            console.log(e.keyCode)
        }
        window.onkeyup = (e)=>{
            switch(e.keyCode) {
                case 65: //left
                case 37:
                    this.key.left = false;
                    // this.char.addForce(-1,0);
                    break;
                case 68: //right
                case 39:
                    this.key.right = false;
                    // this.char.addForce(1,0);
                    break;
                case 87: //up
                case 38:
                    this.key.up = false;
                    // this.char.addForce(1,0);
                    break;
                case 83: //down
                case 40:
                    this.key.down = false;
                    // this.char.addForce(1,0);
                    break;
                default:
                    break;
            }
        }

        this.ratio = width>height ? height/500 : width/500;
        console.log(this.ratio)
        this.canvas.width = width>height ? height : width;
        this.canvas.height = width>height ? height : width;
        this.ddsada();
    }
}
