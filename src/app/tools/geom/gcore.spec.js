import * as gcore from './gcore';

describe('Line properties', () => {
    it('Line should have A == 0 when parallel to Ox', () => {
        let l1 = gcore.createLineByPoints(new gcore.Point(2, 2), new gcore.Point(5, 2));
        expect(l1.a === 0).toBeTruthy();
        expect(l1.b !== 0).toBeTruthy();
        expect(l1.c !== 0).toBeTruthy();
    });
});
