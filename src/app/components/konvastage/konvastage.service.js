import {DrawablePoint, DrawableParallelogram, DrawableCircle} from '../../tools/geom.konva.wrapper';
import {approximateParallelogram, approximateCircle} from '../../tools/geom/solver';

/*
    You can think of it like a Scene 
    Responsible for rendering
*/

export default class KonvastageService {
    constructor($rootScope) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.optimize = false;
    }

    init(container, w, h) {
        this.stage = new Konva.Stage({
            container: container,
            width: w,
            height: h
        });

        this.reset();

        this.stage.on('contentClick', () => {
            if(this.scene.points.length >= 3){
                return;
            }

            let pos = this.stage.getPointerPosition();
            let point = new DrawablePoint(pos.x, pos.y);

            if(!this.optimize) {
               point.model.on('dragmove', () => {
                    point.updatePos();

                    this._destroyModelObject(this.scene.parallelogram);
                    this._destroyModelObject(this.scene.circle);
                    this.stage.batchDraw();

                    if(this._recalculateObjects(w, h)) { this.stage.batchDraw(); }
                    this._broadcastSceneChanges();
                });
            } else {
                point.model.on('dragstart', () => {
                    this._destroyModelObject(this.scene.parallelogram);
                    this._destroyModelObject(this.scene.circle);
                    this.stage.batchDraw();
                });

                point.model.on('dragend', () => {
                    point.updatePos();
                    
                    if(this._recalculateObjects(w, h)) { this.stage.batchDraw(); }
                    this._broadcastSceneChanges();
                });
            }

            this.scene.points.push(point);
            this.pointsLayer.add(point.model);
            
            this._recalculateObjects(w, h);
            this.stage.draw();
            this._broadcastSceneChanges();
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

        this.scene = {
            points: [],
            parallelogram: undefined,
            circle: undefined
        }

        this.pointsAreIncorrect = false;
    }

    reInit(container, w, h) {
        this.reset();
        this.stage.destroy();
        this.init(container, w, h);
        this._broadcastSceneChanges();
    }

    setOptimization(optimize){
        this.optimize = optimize;
        this._broadcastSceneChanges();
    }

    _recalculateObjects(w, h) {
         if(this.scene.points.length === 3) {
            let pdata = approximateParallelogram(this.scene.points[0], this.scene.points[1], this.scene.points[2], w, h);
            
            if(!pdata) {
                this.pointsAreIncorrect = true;
                this.scene.parallelogram = undefined;
                this.scene.circle = undefined;
                return false;
            }
            this.pointsAreIncorrect = false;

            this.scene.parallelogram = new DrawableParallelogram(pdata.p1, pdata.p2, pdata.p3, pdata.p4);

            let cdata = approximateCircle(this.scene.parallelogram);
            this.scene.circle = new DrawableCircle(cdata.center, cdata.diameter);

            this.objectsLayer.add(this.scene.parallelogram.model);
            this.objectsLayer.add(this.scene.circle.model);

            return true;
        }
    }

    _destroyModelObject(object) {
        if(object && object.model)
        {
            object.model.destroy();
            object = undefined;
        }
    }

    _broadcastSceneChanges() {
        this.$rootScope.$broadcast('KonvastageService:onSceneChanged');
    }
}
