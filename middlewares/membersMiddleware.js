const memberValidation = require('../validations/members');

const memberMiddleware = {
  read: [
    memberValidation.isAdminRole,
    memberValidation.errorsCheck,
  ],
  create: [
    memberValidation.socialMediaInUse,
    memberValidation.errorsCheck,
  ],
  update: [
    memberValidation.memberExists,
    memberValidation.errorsCheck,
  ],
  delete: [
    memberValidation.memberExists,
    memberValidation.errorsCheck,
  ],
};

module.exports = memberMiddleware;
