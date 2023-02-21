import OlProj from 'ol/proj';

export enum Projections {
    epsg3857 = 'EPSG:3857',
    epsg4326 = 'EPSG:4326'
}

export class MapUtils {
    public static reprojectPoint(point: [number, number], projSrc: Projections, projDest: Projections) {
        return OlProj.transform(point, projSrc as string, projDest as string);
    }

    public static swapLonLat(point: [number, number]): [number, number] {
        return [point[1], point[0]];
    }

    public static getDistance(startPoint: [number, number], endPoint: [number, number]) {
        const dx = Math.abs(endPoint[0] - startPoint[0]);
        const dy = Math.abs(endPoint[1] - startPoint[1]);
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance;
    }

    public static getSouthWestPoint(coordinates: number[][]): [number, number] {
        const lats = coordinates.map(x => x[0]);
        const longs = coordinates.map(x => x[1]);

        return [Math.min(...lats), Math.min(...longs)] as [number, number];
    }

    public static getNorthEastPoint(coordinates: number[][]): [number, number] {
        const lats = coordinates.map(x => x[0]);
        const longs = coordinates.map(x => x[1]);

        return [Math.max(...lats), Math.max(...longs)] as [number, number];
    }

    public static getPointAfterRotation(point: [number, number], angleRadians: number): [number, number] {
        const x = point[0] * Math.cos(angleRadians) - point[1] * Math.sin(angleRadians);
        const y = point[1] * Math.cos(angleRadians) + point[0] * Math.sin(angleRadians);
        return [-y, -x];
    }

    public static getRotation(startPoint: [number, number], endPoint: [number, number]) {
        const dx = endPoint[0] - startPoint[0];
        const dy = endPoint[1] - startPoint[1];
        const rotation = Math.atan2(Math.abs(dy), Math.abs(dx));

        return rotation;
    }

    public static fromRadiansToDegrees(radians: number) {
        return 180 / Math.PI * radians;
    }

    public static getRotationInDegrees(startPoint: [number, number], endPoint: [number, number]) {
        return this.fromRadiansToDegrees(this.getRotation(startPoint, endPoint));
    }
}
