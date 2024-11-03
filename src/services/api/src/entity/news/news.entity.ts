


export interface INews {
    id: string;
    durationTimeInSeconds: number;
    affectedFactorNumber: number;
    stage: number;
    stockId: string;
}



export class News implements INews {
    id: string;
    durationTimeInSeconds: number;
    affectedFactorNumber: number;
    stage: number;
    stockId: string;

    constructor(input: INews) {
        this.id = input.id
        this.durationTimeInSeconds = input.durationTimeInSeconds
        this.affectedFactorNumber = input.affectedFactorNumber
        this.stage = input.stage
        this.stockId = input.stockId
    }
}