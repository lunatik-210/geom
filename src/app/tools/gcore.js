
/*
    Implements the core structures and maths for doing Geometric calculus
*/

const ZERO = 0.000001;

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(point){
        return point.x === this.x && point.y === this.y;
    }

    isOnTheLine(l){
        return isPointBelongsToLine(this, l);
    }

    sub(point) {
        return new Point(this.x-point.x, this.y-point.y);
    }
}

/*
    General defenition of the line is xA + yB + C = 0;
    a, b, c are able to fully describe a line
*/
export class Line {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // according to wikipedia
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    intersectionPoint(line) {
        const denominator = this.a * line.b - line.a * this.b;
        const x = (line.c * this.b - this.c * line.b) / denominator;
        const y = (line.a * this.c - this.a * line.c) / denominator;
        return new Point(x, y);
    }

    isLineParallel(line) {
        return Math.abs(this.a * line.b - line.a * this.b) < ZERO;
    }

    isPointBelongs(p) {
        return isPointBelongsToLine(p, this);
    }
}

export class RangedLine extends Line {
    constructor(p1, p2)
    {
        let l = createLineByPoints(p1, p2);
        super(l.a, l.b, l.c);

        this.p1 = p1;
        this.p2 = p2;
    }
}

export class Circle {
    constructor(center, diameter) {
        this.center = center;
        this.diameter = diameter;
    }

    area() {
        return Math.PI * Math.pow(this.diameter / 2.0, 2);
    }
}


export class ColorCircle extends Circle {
    constructor(center, diameter, color) {
        super(center, diameter);

        this.color = color;
    }
}


export class Parallelogram {
    constructor(p1, p2, p3, p4) {
        this.points = [p1, p2, p3, p4];
        let lines = [];

        this.edges = [];
        this.diagonals = [];

        for(let i=0; i<this.points.length; ++i)
        {
            for(let j=i+1; j<this.points.length; ++j)
            {
                lines.push(new RangedLine(this.points[i], this.points[j]));
            }            
        }

        while(lines.length != 0)
        {
            let l = lines[0];
            let index = undefined;

            lines.splice(0, 1);

            for(let i=0; i<lines.length; ++i)
            {
                if(l.isLineParallel(lines[i]))
                {
                    index = i;
                    break;
                }
            }

            if(index !== undefined)
            {
                this.edges.push(l);
                this.edges.push(lines[index]);
                lines.splice(index, 1);
            } else {
                this.diagonals.push(l);
            }
        }
    }

    center() {
        return this.diagonals[0].intersectionPoint(this.diagonals[1]);
    }

    area() {
        let l1 = this.edges[0];
        let l2 = undefined;

        for(let i=1; i<this.edges.length; ++i)
        {
            if(!l1.isLineParallel(this.edges[i]))
            {
                l2 = this.edges[i];
                break;
            }
        }

        let a = undefined;
        let b = undefined;
        let c = undefined;

        if(l1.p1.isEqual(l2.p1))
        {
            a = l1.p1;
            b = l1.p2;
            c = l2.p2;
        } else if(l1.p1.isEqual(l2.p2)) {
            a = l1.p1;
            b = l1.p2;
            c = l2.p1;
        } else if(l1.p2.isEqual(l2.p1)) {
            a = l1.p2;
            b = l1.p1;
            c = l2.p2;            
        } else {
            a = l1.p2;
            b = l1.p1;
            c = l2.p1;     
        }

        let ab = b.sub(a);
        let ac = c.sub(a);

        return Math.abs(ab.x*ac.y -ab.y*ac.x);
    }
}

/*
    Some analytical helpers and 'factories'
*/

export function isPointBelongsToLine(p0, l) {
    return Math.abs(l.a * p0.x + l.b * p0.y + l.c) < ZERO;
}

export function createLineByPoints(p1, p2) {
    const a = p2.y - p1.y;
    const b = p1.x - p2.x;
    const c = -p1.y * b - p1.x * a;
    return new Line(a, b, c);
}

export function createLineParallelToLineThroughPoint(l, p0) {
    if(p0.isOnTheLine(l))
    {
        return undefined;
    }
    const c = -p0.y * l.b - p0.x * l.a;
    return new Line(l.a, l.b, c);
}

export function arePointsOnTheSameLine(p1, p2, p3) {
    return Math.abs((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)) < ZERO;
}
