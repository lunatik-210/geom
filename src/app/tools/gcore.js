
/*
    Implements the core structures and maths for doing Geometric calculus
*/

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

    isPointBelongs(p) {
        return isPointBelongsToLine(p, this);
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
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}

/*
    Some analytical helpers and 'factories'
*/

export function isPointBelongsToLine(p0, l) {
    return l.a * p0.x + l.b * p0.y + l.c === 0;
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
    return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y) === 0;
}
