import * as gcore from './gcore';

describe('Line', () => {
    it('Line should have A == 0 when parallel to Ox', () => {
        let l = gcore.createLineByPoints(new gcore.Point(2, 2), new gcore.Point(5, 2));
        expect(l.a === 0).toBeTruthy();
        expect(l.b !== 0).toBeTruthy();
        expect(l.c !== 0).toBeTruthy();
    });

    it('Line should have B == 0 when parallel to Oy', () => {
        let l = gcore.createLineByPoints(new gcore.Point(2, 5), new gcore.Point(2, 2));
        expect(l.a !== 0).toBeTruthy();
        expect(l.b === 0).toBeTruthy();
        expect(l.c !== 0).toBeTruthy();
    });

    it('Line should have С == 0 when goes through (0,0)', () => {
        let l = gcore.createLineByPoints(new gcore.Point(1, 1), new gcore.Point(2, 2));
        expect(l.a !== 0).toBeTruthy();
        expect(l.b !== 0).toBeTruthy();
        expect(l.c === 0).toBeTruthy();
    });

    it('Two lines should intersect in the point of (3,3)', () => {
        let l1 = gcore.createLineByPoints(new gcore.Point(1, 1), new gcore.Point(2, 2));
        let l2 = gcore.createLineByPoints(new gcore.Point(3, 0), new gcore.Point(3, 8));
        let intersection = l1.intersectionPoint(l2);
        expect(intersection.isEqual(new gcore.Point(3,3)));
    });
});

describe('Circle', () => {
    it('Circle with radius 1 should have area of PI', () => {
        let c = new gcore.Circle(new gcore.Point(3, 3), 2);
        expect(c.area() === Math.PI).toBeTruthy();
    });
});
