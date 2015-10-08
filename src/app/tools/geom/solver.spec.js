import * as gcore from './gcore';
import * as solver from './solver';


describe('Parallelogram solver', () => {
    let p1 = new gcore.Point(8, 5);
    let p2 = new gcore.Point(13, 6);
    let p3 = new gcore.Point(11, 4);

    let r1 = new gcore.Point(6, 3);
    let r2 = new gcore.Point(10, 7);
    let r3 = new gcore.Point(16, 5);

    let outcoumes = solver.calcPossibilities(p1, p2, p3);

    it('Should calculate 3 new points as possible variants to build parallelogram using the old ones', () => {
        expect(outcoumes).toBeDefined();

        for(let i = 0; i<outcoumes.length; i++){
            expect(outcoumes[i].isEqual(r1) || outcoumes[i].isEqual(r2) || outcoumes[i].isEqual(r3)).toBeTruthy();
        }

        expect(outcoumes[0].isEqual(outcoumes[1])).toBeFalsy();
        expect(outcoumes[1].isEqual(outcoumes[2])).toBeFalsy();
        expect(outcoumes[2].isEqual(outcoumes[0])).toBeFalsy();
    });

    it('Should get one outcome by window size', () => {
        expect(solver.filterOneByWindow(outcoumes, 7, 7)).toBeDefined();
    });

    it('Should not get any outcome by window size', () => {
        expect(solver.filterOneByWindow(outcoumes, 0, 0)).toBeUndefined();
    });

    let pdata = solver.approximateParallelogram(p1, p2, p3, 7, 7);

    it('Data for making parallelogram should be defined', () => {
        expect(pdata).toBeDefined();
    });

    let p = new gcore.Parallelogram(pdata.p1, pdata.p2, pdata.p3, pdata.p4);

    it('Parallelogram should be defined', () => {
        expect(p).toBeDefined();
    });

    it('Area should be calculated', () => {
        expect(p.area()).toBe(8);
    });

    let cdata = solver.approximateCircle(p);

    it('Data for making circle should be defined', () => {
        expect(cdata).toBeDefined();
    });

    let c = new gcore.Circle(cdata.center, cdata.diameter);

    it('Circle should be defined', () => {
        expect(c).toBeDefined();
    });

    it('Circles area should be equal to Parallelograms one', () => {
        expect(c.area()).toBe(p.area());
    });
});
