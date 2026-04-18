const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

 
  this.before('*', (req) => {
    console.log('User ID:', req.user.id);
    console.log('User Roles:', req.user.roles);
  });

});