export class Layer {
    constructor(arg) {
        this.layer=[];
        this.type=[];
        arg === 'default' && this.SetDefault();
    }
    GetLayer() {
        return this.layer;
    }
    SetDefault() {
        this.type.push('background');
        this.type.push('ground');
        this.type.push('sprite');
        this.type.push('ui');

        const length = this.type.length;

        this.type.forEach(e=>{
            this.layer[e]=[];
            this.type.forEach(e2=>{
                this.layer[e][e2] = false;
            });
            this.layer[e].length = length;
        });
        this.layer.length = length;
    }
    AddLayer(layerName) {
        if(!layerName) return false;
        if(this.type.includes(layerName)) return false;
        const lastType = [...this.type];
        this.type.push(layerName);
        const length = this.type.length;
        this.layer[layerName] = [];
        lastType.forEach(e=>{
            this.layer[e][layerName] = false;
            this.layer[e].length = length;
        })
        this.type.forEach(e=>{
            this.layer[layerName][e] = false;
            this.layer[layerName].length = length;
        })
        this.layer.length = this.type.length;
    }
    
    EffectOneLayer(a,b) {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = true;
    }
    EffectBothLayer(a,b) {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = true;
        this.layer[b][a] = true;
    }
    RemoveEffectOneLayer(a,b) {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = false;
    }
    RemoveEffectBothLayer(a,b) {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = false;
        this.layer[b][a] = false;
    }
}

class Map {
    constructor() {

    }
}

class Global {
    constructor() {
        
    }
}

class Level {
    constructor(level=0) {
        this.level = level;
    }
}