class Vector2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    Get(){
        return this;
    }
    Set(v){
        this.x = v.x;
        this.y = v.y;
    }
    Plus(v1, v2) {
        return new Vector2(v2.x+v1.x, v2.y+v1.y);
    }
    Minus(v1, v2) {
        return new Vector2(v2.x-v1.x, v2.y-v1.y);
    }
    Multiple(v1,d) {
        return new Vector2(v1.x*d, v2.y*2);
    }
    Devide(v1, d) {
        return new Vector2(v1.x/d, v2.y/2);
    }
    Distance(v1, v2) {
        return Math.sqrt(Math.pow(v2.x-v1.x,2)+Math.pow(v2.y-v1.y,2));
    }
}

const pos = [];//new Vector();

function GetCircle(){
    let middle = new Vector2();
    let radius = 0;
    for (let i=0; i<length; i++) {
        for (let j=i+1; j<length; j++) {
            if (Vector2.Distance(pos[i], pos[j]) > radius) {
                radius = Vector2.Distance(pos[i], pos[j]);
                middle.Set( Vector2.Devide(Vector2.Plus(pos[i], pos[j]), 2) );
            }
        }
    }

    if (!IsOuterCircle(middle, radius)) {
        // 임의의 삼각형 외접원 중 가장 작은 원을 구한다.
        radius = float.maxValue;

        for (let i=0; i<length; i++) {
            for (let j=i+1; j<length; j++) {
                for (let k=j+1; k<length; k++) {
                    const mid1 = Vector2.Devide(new Vector2().Plus(pos[i] + pos[j]), 2);
                    const mid2 = Vector2.Devide(new Vector2().Plus(pos[j] + pos[k]), 2);

                    const grad1 = Gradient(pos[i], pos[j]);
                    const grad2 = Gradient(pos[j], pos[k]);
                    const tempX = (grad2*mid2.x - grad1*mid1.x + mid2.y - mid1.y)/(grad2 - grad1);
                    const tempY = grad1*(tempX - mid1.x) + mid1.y;

                    const tempMiddle = new Vector2(tempX, tempY);
                    const tempRadius = Vector2.Distance(tempMiddle, pos[i]);
                    if (tempRadius < radius && IsOuterCircle(tempMiddle, tempRadius)) { 
                        radius = tempRadius;
                        middle = tempMiddle; 
                    }
                }
            }
        }
    }
    
    return {radius:radius, middle:middle};
}

// 주어진 원이 pos의 모든 점을 포함하는지 체크
function IsOuterCircle(mid, rad) {//vector float
    pos.forEach(vec => {
        if (Vector2.Distance(vec, mid) > rad) return false;
    });
    // foreach (Vector2 vec in pos) if (Vector2.Distance(vec, mid) > rad) return false;
    return true;
}

// 기울기
function Gradient(pos1, pos2) { 
    return (pos2.y - pos1.y)/(pos2.x - pos1.x); 
}