
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
}

export function createLineByPoints(p1, p2) {
    const a = p2.y - p1.y;
    const b = p1.x - p2.x;
    const c = -p1.y * b - p1.x * a;
    return new Line(a, b, c);
}
