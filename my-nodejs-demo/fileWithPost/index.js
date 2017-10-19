
var formidable = require('formidable');
var fs = require('fs'); 
var cacheFolder = '/Users/iosappdev/Desktop/NodeJs/my-nodejs-demo/public/avatar';
console.log("postImage");
module.exports.postImage = function(req,res){
console.log(req.body);
var userDirPath = cacheFolder;
var displayUrl;
var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';
    form.unloadDir = userDirPath;//+ 'AVATAR_UPLOAD_FOLDER'
    form.keepExtensions = true;
    form.maxFieldsSize = 2*1024*1024;
    form.type = true;

    console.log(userDirPath);
    console.log('Hello - 3');
    form.parse(req.body["name"],function(err,fields,files) {
        console.log('Hello - 4');
    	if (err) {
            console.log(err);
    		res.status(200).json({
    			'error':err
    		});
    		return;
    	};
        console.log('Hello - 5');
    	var extName = '';
    	switch(files.upload.type){
            case 'image/pjpeg':
                 extName = 'jpg';
                  break;
            case 'image/jpeg':
                 extName  = 'jpg';
                 break;   
            case 'image/png':
                 extName = 'png';
                 break;
            case 'image/x-png':
                 extName = 'png';
                 break;
    	};
        console.log('Hello - 2');
    	if (extName.length === 0) {
            // res.json('只支持png和jpg格式图片'); 
            res.status(200).json({
                'error':'只支持png和jpg格式图片'
            });
            return;
    	};
    	var avatarName = '/' + Date.now()+'.'+extName;
    	var newPath    = form.uploadDir + avatarName;
        displayUrl  = UPLOAD_FOLDER + avatarName;
        console.log('Hello - 1');
    	fs.renameSync(files.upload.path,newPath);
        res.status(200).json({
          'success':'上传成功',
          'msg':displayUrl
        });
    });
    
};
