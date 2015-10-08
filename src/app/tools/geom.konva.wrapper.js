import {Point} from './geom/gcore';

export class DrawablePoint extends Point {
    constructor(x, y) {
        super(x, y);

        this.model = new Konva.Circle({
            x: x,
            y: y,
            radius: 5.5,
            stroke: 'red',
            strokeWidth: 2,
            draggable: true
        });

        this.model.on('dragmove', () => this.updatePos());
    }

    updatePos() {
        let pos = this.model.getAbsolutePosition();

        this.x = pos.x;
        this.y = pos.y;
    }
}
