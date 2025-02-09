import Joi from 'joi';

export const validateAuditLog = Joi.object({
  entityName: Joi.string().required(),
  entityId: Joi.number().integer().required(),
  action: Joi.string().required(),
  oldValue: Joi.object().optional(),
  newValue: Joi.object().optional(),
  metaData: Joi.object().optional(),
  performedById: Joi.number().integer().required(),
  comments: Joi.string().optional().allow(null),
});
