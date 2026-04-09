const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

  const { User } = this.entities;


  this.before('CREATE', User, (req) => {
    setRole(req.data);
  });


  this.before('UPDATE', User, async (req) => {

   
    if (!req.data.username) {
      const existing = await SELECT.one
        .from(User)
        .where({ ID: req.params[0].ID });

      req.data.username = existing.username;
    }

    setRole(req.data);
  });

});


function setRole(data) {

  if (!data.username) return;

  let isAdmin = data.username.match(/admin/i);

  if (isAdmin) {
    data.role = 'ADMIN';
  } else {
    data.role = 'USER';
  }
}
