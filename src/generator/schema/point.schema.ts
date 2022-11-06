import { SchemaObject } from 'neode';

const PointSchema: SchemaObject = {
    id: {
        type: 'string',
        primary: true,
        required: true,
    },
    x: {
        type: 'float',
        required: true,
    },
    y: {
        type: 'float',
        unique: true,
        required: true,
    },
    deltaY: {
        type: 'float',
        required: true,
    },
    IS_IN: {
        type: 'relationship',
        target: 'MQ',
        relationship: 'IS_IN',
        direction: "out",
        eager: false,
    }
};

export default PointSchema;