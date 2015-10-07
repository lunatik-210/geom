import {DrawablePoint} from '../../tools/geom.konva.wrapper';

class KonvastageService {
    constructor($window) {
        'ngInject';
        this.$window = $window;
        this.points = 0;
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
        this.stage.add(this.layer1);


        this.stage.on('contentClick', () => {
            if(this.points >= 3){
                return;
            }
            this.points++;

            var pos = this.stage.getPointerPosition();
            var point = new DrawablePoint(pos.x, pos.y);

            this.layer1.add(point.model);
            this.stage.draw();
        });

        return this.stage;
    }
}

export default KonvastageService;
