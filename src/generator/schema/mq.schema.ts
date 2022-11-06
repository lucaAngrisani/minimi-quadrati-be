import { SchemaObject } from 'neode';

const MQSchema: SchemaObject = {
    id: {
        type: 'uuid',
        primary: true,
        required: true,
    },
    IS_IN: {
        type: 'relationship',
        target: 'Point',
        relationship: 'IS_IN',
        direction: "in",
        eager: true,
        cascade: "detach",
        
    }
};

export default MQSchema;