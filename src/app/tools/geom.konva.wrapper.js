import {Point, Circle, Parallelogram} from './geom/gcore';


const STROKE_WIDTH = 2;

const SHADOW = {
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: {x : 5, y : 5},
    shadowOpacity: 0.5
};

export class DrawablePoint extends Point {
    constructor(x, y) {
        super(x, y);

        let conf = {
            x: x,
            y: y,
            radius: 5.5,
            stroke: 'red',
            strokeWidth: STROKE_WIDTH,
            draggable: true
        };

        $.extend(conf, SHADOW);

        this.model = new Konva.Circle(conf);

        this.model.on('dragmove', () => this.updatePos());
    }

    updatePos() {
        let pos = this.model.getAbsolutePosition();

        this.x = pos.x;
        this.y = pos.y;
    }
}


export class DrawableCircle extends Circle {
    constructor(center, diameter) {
        super(center, diameter);

        let conf = {
            x: center.x,
            y: center.y,
            radius: diameter / 2.0,
            stroke: 'yellow',
            strokeWidth: STROKE_WIDTH
        };

        $.extend(conf, SHADOW);

        this.model = new Konva.Circle(conf);
    }
}


export class DrawableParallelogram extends Parallelogram {
    constructor(p1, p2, p3, p4) {
        super(p1, p2, p3, p4);

        this.model = new Konva.Group();

        for(let i = 0; i<this.edges.length; ++i)
        {
            let conf = {
                points: [this.edges[i].p1.x, this.edges[i].p1.y, this.edges[i].p2.x, this.edges[i].p2.y],
                stroke: 'blue',
                strokeWidth: STROKE_WIDTH,
                lineCap: 'round'
            };

            $.extend(conf, SHADOW);

            let line = new Konva.Line(conf);
            this.model.add(line);
        }
    }
}
