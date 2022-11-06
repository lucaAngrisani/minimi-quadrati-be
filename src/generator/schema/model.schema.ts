import { SchemaObject } from 'neode';

const MQSchema: SchemaObject = {
    id: {
        type: 'uuid',
        primary: true,
        required: true,
    },

};

export default MQSchema;