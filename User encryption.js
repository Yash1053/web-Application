exports.register = function (api) {
    api.post('/v1/create', createUser);
};

function createUser(request,response){

/*
userModel json variable
*/

var userModel={};

/*
getting username and password from post
*/

userModel.username=request.body.username;
userModel.password=request.body.password;

/*
creating salt and cypher password
*/

userModel.salt=createSalt();

    require('crypto').randomBytes(48, function(ex, buf) {
    userModel.token = buf.toString('base64');
    });
    var clearText=userModel.password;
    hash(clearText,userModel.salt,function(err, crypted) {
    var cypherText=crypted;
    userModel.password=cypherText;

 /*
Do whatever with username,password and salt, more than likely store in a database
*/

     response.send(200, { success :'User encrypted'});
    });
