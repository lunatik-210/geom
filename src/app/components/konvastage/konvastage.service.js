import {DrawablePoint, DrawableParallelogram, DrawableCircle} from '../../tools/geom.konva.wrapper';
import {approximateParallelogram, approximateCircle} from '../../tools/geom/solver';

export default class KonvastageService {
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
                this._destroyModelObject(this.parallelogram);
                this._destroyModelObject(this.circle);
                this.stage.draw();

                this._recalculateObjects(w, h);
                this.stage.draw();
            });

            this.points.push(point);
            this.pointsLayer.add(point.model);
            
            this._recalculateObjects(w, h);
            this.stage.draw();
        });
    }

    reset() {
        if(this.pointsLayer) {
            this.pointsLayer.destroy();
        }

        if(this.objectsLayer) {
            this.objectsLayer.destroy();
        }

        this.pointsLayer = new Konva.Layer();
        this.objectsLayer = new Konva.Layer();
        this.stage.add(this.objectsLayer);
        this.stage.add(this.pointsLayer);

        this.points = [];
        this.parallelogram = undefined;
        this.circle = undefined;
    }

    _recalculateObjects(w, h) {
         if(this.points.length === 3) {
            let pdata = approximateParallelogram(this.points[0], this.points[1], this.points[2], w, h);
            this.parallelogram = new DrawableParallelogram(pdata.p1, pdata.p2, pdata.p3, pdata.p4);

            let cdata = approximateCircle(this.parallelogram);
            this.circle = new DrawableCircle(cdata.center, cdata.diameter);

            this.objectsLayer.add(this.parallelogram.model);
            this.objectsLayer.add(this.circle.model);
        }
    }

    _destroyModelObject(object) {
        if(object && object.model)
        {
            object.model.destroy();
            object = undefined;
        }
    }
}
