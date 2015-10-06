

class Circle {
    constructor(center, diameter) {
        this.center = center;
        this.diameter = diameter;
    }

    area() {
        return Math.PI * Math.pow(this.diameter / 2.0, 2);
    }
}

class ColorCircle extends Circle {
    constructor(center, diameter, color) {
        super(center, diameter);

        this.color = color;
    }
}

class Parallelogram extends Basic {
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    area() {
    }
}
