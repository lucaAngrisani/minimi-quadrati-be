import { SchemaObject } from 'neode';

const PointSchema: SchemaObject = {
    id: {
        type: 'uuid',
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
};

export default PointSchema;