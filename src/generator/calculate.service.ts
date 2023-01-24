import { Injectable } from '@nestjs/common';
import { MQDto } from './dto/mq.dto';

export type SD = {
    scarti: number[],
    scartiQ: number[],
    varianza: number,
    deviazioneStd: number,
}

export type AN = {
    sommatoria: number,
    media: number,
    standev: SD
}

@Injectable()
export class CalculateService {

    sommatoria(numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }

    media(x: number[]): number {
        if (!x.length) return 0;
        let avg = (this.sommatoria(x) / x?.length);
        return avg;
    }

    // vale sia per asse x che asse y
    standev(x: number[]): SD {
        let scarti = [];
        let scartiQ = [];

        const arrLen = x.length;
        const media = this.media(x);

        for (let i = 0; i < arrLen; i++) {
            scarti.push(x[i] - media);
            scartiQ.push(Math.pow((x[i] - media), 2));
        }

        const varianza = this.media(scartiQ);
        const deviazioneStd = Math.sqrt(varianza);

        return {
            scarti,
            scartiQ,
            varianza,
            deviazioneStd
        }
    }

    analisi(x: number[]): AN {
        return {
            sommatoria: this.sommatoria(x),
            media: this.media(x),
            standev: this.standev(x)
        }
    }

    sxq(x: number[]): number {
        let sxq = 0;
        let lenArr = x.length;

        for (let i = 0; i < lenArr; i++) {
            sxq += Math.pow(x[i], 2);
        }

        return sxq;
    }



    sxy(x: number[], y: number[]): number {
        if (x.length != y.length) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi');
        }

        let sxy = 0;
        let i = 0;

        for (i; i < x.length; i++) {
            sxy = sxy + x[i] * y[i];
        }

        return sxy;
    }

    delta(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const delta = (x.length * this.sxq(x)) - (Math.pow(this.sommatoria(x), 2));

        return delta;
    }

    CoefficienteA(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        let m1 = (this.sxq(x) * this.sommatoria(y)) - (this.sommatoria(x) * this.sxy(x, y));
        let a = m1 / (this.delta(x, y));

        return a;
    }

    CoefficienteB(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const m2 = (x.length * this.sxy(x, y)) - (this.sommatoria(x) * this.sommatoria(y));

        const b = m2 / (this.delta(x, y));

        return b;
    }

    SigmaY(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        let ny = 0;
        for (let i = 0; i < lenX; i++) {
            ny += Math.pow(y[i] - this.CoefficienteA(x, y) - x[i] * this.CoefficienteB(x, y), 2);

        }
        const sigmay = Math.sqrt(ny / (x.length - 2));

        return sigmay;
    }

    SigmaA(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const sigmaA = this.SigmaY(x, y) * Math.sqrt(this.sxq(x) / this.delta(x, y));

        return sigmaA;
    }

    SigmaB(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const sigmaB = this.SigmaY(x, y) * Math.sqrt(lenX / this.delta(x, y));

        return sigmaB;

    }

    IncertezzaA(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const incertezzaA = 3 * this.SigmaA(x, y);

        return incertezzaA;
    }

    IncertezzaB(x: number[], y: number[]): number {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY) {
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')
        }

        const incertezzaB = 3 * this.SigmaB(x, y);

        return incertezzaB;
    }

    MinimiQuadrati(x: number[], y: number[]): MQDto {
        const lenX = x.length;
        const lenY = y.length;

        if (lenX != lenY)
            throw Error('Controlla meglio, il numero delle x e quello delle y sono diversi')

        return {
            mediaX: this.media(x),
            mediaY: this.media(y),
            delta: this.delta(x, y),
            coefficienteA: this.CoefficienteA(x, y),
            coefficienteB: this.CoefficienteB(x, y),
            sigmaY: this.SigmaY(x, y),
            sigmaA: this.SigmaA(x, y),
            sigmaB: this.SigmaB(x, y),
            incertezzaA: this.IncertezzaA(x, y),
            incertezzaB: this.IncertezzaB(x, y),
            analisiX: this.analisi(x),
            analisiY: this.analisi(y),
        }
    }

}
