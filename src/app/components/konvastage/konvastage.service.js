import {DrawablePoint, DrawableParallelogram, DrawableCircle} from '../../tools/geom.konva.wrapper';
import {approximateParallelogram, approximateCircle} from '../../tools/geom/solver';

class KonvastageService {
    constructor($window) {
        'ngInject';

        this.$window = $window;
    }

    init(container) {
        let w = this.$window.innerWidth;
        let h = this.$window.innerHeight;

        this.stage = new Konva.Stage({
            container: container,
            width: w,
            height: h
        });

        this.reset();

        this.stage.on('contentClick', () => {
            if(this.points.length >= 3){
                return;
            }

            let pos = this.stage.getPointerPosition();
            let point = new DrawablePoint(pos.x, pos.y);

            point.model.on('dragmove', () => {
                this.layer2.destroy();
                this.layer1.remove();
                this.layer2 = new Konva.Layer();
                this.stage.add(this.layer2);
                this.stage.add(this.layer1);

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

    reset() {
        this.layer1 = new Konva.Layer();
        this.layer2 = new Konva.Layer();
        this.stage.add(this.layer2);
        this.stage.add(this.layer1);

        this.points = [];
    }

    recalculateObjects(w, h) {
         if(this.points.length === 3) {
            let pdata = approximateParallelogram(this.points[0], this.points[1], this.points[2], w, h);
            let p = new DrawableParallelogram(pdata.p1, pdata.p2, pdata.p3, pdata.p4);

            let cdata = approximateCircle(p);
            let c = new DrawableCircle(cdata.center, cdata.diameter);

            this.layer2.add(p.model);
            this.layer2.add(c.model);
        }
    }
}

export default KonvastageService;
