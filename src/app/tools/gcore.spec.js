import * as gcore from './gcore';

describe('Point', () => {
    let p1 = new gcore.Point(1, 1);
    let p2 = new gcore.Point(1, 1);
    let p3 = new gcore.Point(0, 0);

    it('Should be equal', () => {
        expect(p1.isEqual(p2)).toBeTruthy();
    });

    it('Subtraction should resulted in (0,0) point', () => {
        expect(p3.isEqual(p1.sub(p2)));
    });
});

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

    it('Lines are parallel', () => {
        let l1 = gcore.createLineByPoints(new gcore.Point(1, 2), new gcore.Point(1, 4));
        let l2 = gcore.createLineByPoints(new gcore.Point(3, 2), new gcore.Point(3, 4));
        expect(l1.isLineParallel(l2)).toBeTruthy();        
    });

    it('Lines are parallel', () => {
        let l1 = gcore.createLineByPoints(new gcore.Point(8, 5), new gcore.Point(6, 3));
        let l2 = gcore.createLineByPoints(new gcore.Point(13, 6), new gcore.Point(11, 4));
        expect(l1.isLineParallel(l2)).toBeTruthy();        
    });
});

describe('Circle', () => {
    it('Circle with radius 1 should have area of PI', () => {
        let c = new gcore.Circle(new gcore.Point(3, 3), 2);
        expect(c.area() === Math.PI).toBeTruthy();
    });
});

describe('Analytics', () => {
    let l = gcore.createLineByPoints(new gcore.Point(1, 1), new gcore.Point(2, 2));

    it('Create line which is parallel to another one and goes through the point', () => {
        let p = new gcore.Point(0, 1);
        let ll = gcore.createLineParallelToLineThroughPoint(l, p);
        expect(gcore.isPointBelongsToLine(p, ll)).toBeTruthy();
    });

    it('Line should not be created when point lies on it', () => {
        let p = new gcore.Point(3, 3);
        let ll = gcore.createLineParallelToLineThroughPoint(l, p);
        expect(ll).toBeUndefined();
    });

    it('Points lies on the same line', () => {
        let p1 = new gcore.Point(0, 1);
        let p2 = new gcore.Point(0, 2);
        let p3 = new gcore.Point(0, 3);
        let p4 = new gcore.Point(1, 4);
        expect(gcore.arePointsOnTheSameLine(p1, p2, p3)).toBeTruthy();
        expect(gcore.arePointsOnTheSameLine(p1, p2, p4)).toBeFalsy();
    });
});
