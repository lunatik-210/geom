import {arePointsOnTheSameLine, createLineByPoints, createLineParallelToLineThroughPoint} from './gcore';

/*
    Given 3 points on the surface there are 3 possible outcomes
    in order to draw Parallelogram 
*/
export function calcPossibilities(p1, p2, p3) {
    if(arePointsOnTheSameLine(p1, p2, p3))
    {
        return undefined;
    }

    let points = [[p1, p2, p3], [p1, p3, p2], [p2, p3, p1]];
    let lines = [];
    let outcomes = [];

    for(let i = 0; i<points.length; i++)
    {
        let l = createLineByPoints(points[i][0], points[i][1]);
        let ll = createLineParallelToLineThroughPoint(l, points[i][2]);
        lines.push(ll);
    }

    outcomes.push(lines[0].intersectionPoint(lines[1]));
    outcomes.push(lines[1].intersectionPoint(lines[2]));
    outcomes.push(lines[0].intersectionPoint(lines[2]));

    return outcomes;
}

export function filterOneByWindow(outcomes, width, height) {
    for(let i = 0; i<outcomes.length; i++)
    {
        if(outcomes[i].x > 0 && outcomes[i].x < width && outcomes[i].y > 0 && outcomes[i].y < height)
        {
            return outcomes[i];
        }
    }
    return undefined;
}