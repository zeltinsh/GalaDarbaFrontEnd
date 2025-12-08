export interface ManiPasakumiinterface {
    id?: number;
    pasakumaNosaukums: string;
    pasakumaApraksts: string;
    pasakumaDatums: string;
    pasakumaLaiks: string;
    pasakumaVieta: string;
    dalibniekuSkaits: number;
    pieteikusiesDalibnieki?: number;
}


export interface PasakumuSaraksts {
    pasakumaArrays: ManiPasakumiinterface[];
}