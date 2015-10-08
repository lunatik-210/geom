import {DrawablePoint} from '../../tools/geom.konva.wrapper';
import {approximateParallelogram, approximateCircle} from '../../tools/geom/solver';

class KonvastageService {
    constructor($window) {
        'ngInject';
        this.$window = $window;
        this.points = [];
    }

    init(container) {
        let w = this.$window.innerWidth;
        let h = this.$window.innerHeight;

        this.stage = new Konva.Stage({
            container: container,
            width: w,
            height: h
        });

        this.layer1 = new Konva.Layer();
        this.layer2 = new Konva.Layer();
        this.layer3 = new Konva.Layer();
        this.stage.add(this.layer2);
        this.stage.add(this.layer3);
        this.stage.add(this.layer1);

        this.stage.on('contentClick', () => {
            if(this.points.length >= 3){
                return;
            }

            let pos = this.stage.getPointerPosition();
            let point = new DrawablePoint(pos.x, pos.y);

            point.model.on('dragstart', () => {
                this.layer2.destroy();
                this.layer3.destroy();
                this.layer1.remove();
                this.layer2 = new Konva.Layer();
                this.layer3 = new Konva.Layer();
                this.stage.add(this.layer2);
                this.stage.add(this.layer3);
                this.stage.add(this.layer1);
            });

            point.model.on('dragend', () => {
                this.recalculateObjects(w, h);
                this.stage.draw();
            });

            this.points.push(point);
            this.layer1.add(point.model);
            
            this.recalculateObjects(w, h);

            this.stage.draw();
        });

        return this.stage;
    }

    recalculateObjects(w, h) {
         if(this.points.length === 3) {
            let p = approximateParallelogram(this.points[0], this.points[1], this.points[2], w, h);
            let c = approximateCircle(p);

            for(let i = 0; i<p.edges.length; ++i)
            {
                let line = new Konva.Line({
                      points: [p.edges[i].p1.x, p.edges[i].p1.y, p.edges[i].p2.x, p.edges[i].p2.y],
                      stroke: 'blue',
                      strokeWidth: 2,
                      lineCap: 'round',
                      lineJoin: 'round'
                    });
                this.layer2.add(line);
            }

            let circle = new Konva.Circle({
                  x: c.center.x,
                  y: c.center.y,
                  radius: c.diameter / 2.0,
                  stroke: 'yellow',
                  strokeWidth: 2
                });
            this.layer3.add(circle);
        }
    }
}

export default KonvastageService;
