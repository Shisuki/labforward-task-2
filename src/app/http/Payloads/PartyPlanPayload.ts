import { Joi } from 'celebrate';

namespace PartyPlanPayload {
    export interface shape {
        from: Date;
        to: Date;
        locations: string[];
    }

    export const get = Joi.object<shape>().keys({
        from: Joi.date().required(),
        to: Joi.date().optional().default(new Date()),
        locations: Joi.array().items(Joi.string().trim().max(256)).min(1).required(),
    });
}

export default PartyPlanPayload;
