import { SchemaObject } from 'neode';

const MQSchema: SchemaObject = {
    id: {
        type: 'uuid',
        primary: true,
        required: true,
    },
    mediaX: { type: 'number' },
    mediaY: { type: 'number' },
    delta: { type: 'number' },
    coefficienteA: { type: 'number' },
    coefficienteB: { type: 'number' },
    sigmaY: { type: 'number' },
    sigmaA: { type: 'number' },
    sigmaB: { type: 'number' },
    incertezzaA: { type: 'number' },
    incertezzaB: { type: 'number' },
    analisiX: { type: 'string' },
    analisiY: { type: 'string' },
    IS_IN: {
        type: 'relationships',
        target: 'Point',
        relationship: 'IS_IN',
        direction: "in",
        eager: true,
        cascade: "detach",

    }
};

export default MQSchema;