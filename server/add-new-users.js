// var users = [
//       {lname:"Parmentier",fname:"Gia",    email:"msparmentier@masteryma.com",roles:['admin']},
//       {lname:"West",fname:"Ryan",         email:"mrwest@masteryma.com",roles:['manager']},
//       {lname:"Force",fname:"Chelsea",     email:"mrsforce@masteryma.com",roles:['manager']},
//       {lname:"Pezillo",fname:"Michael",   email:"mrpezillo@masteryma.com",roles:['']},
//     ];

//   _.each(users, function (user) {
//     var id;

//     id = Accounts.createUser({
//       email: user.email,
//       password: "apple1",
//       profile: { fname: user.fname, lname: user.lname, org_id: "ECv22bXaLjNNipW8X", pin: "1111"}
//     });

//     if (user.roles.length > 0) {
//       Roles.addUsersToRoles(id, user.roles);
//     }

// });