var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var CronJob=require('cron').CronJob;
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var model_push = require('./model_push');

var retrieve_and_rank = watson.retrieve_and_rank({
	username : 'ab43c847-4b7a-4fcf-a79b-1073432a38b7',
	password : 'R7jJFNN9US48',
	version : 'v1'
});

		
retrieve_and_rank.listConfigs({
	cluster_id : 'sc8624291e_d97e_46c3_bb65_f2c6f49d3bf9'
},function(err, response) {
	if (err) {
		console.log('Error', err);
	} else {
		console.log(JSON.stringify(response, null, 2));

	}
});


// router.post('/text', function(req, res, next) {
// 	console.log(res.p)
// 	var jquery = {
// 		title : req.body.cluster_title,
// 	};
var paramss = {
		cluster_id : 'sc8624291e_d97e_46c3_bb65_f2c6f49d3bf9',
		collection_name : 'Demo_coll',
		wt : 'json'
};
var values= {};
var index = 0;
solrClient = retrieve_and_rank.createSolrClient(paramss);
console.log('Searching all documents.');
var query = solrClient.createQuery();
	
query.q({

	'*':'*'
});

var xhr = new XMLHttpRequest();
xhr.open('get', 'http://diagnosisjp.mybluemix.net/api/vibration', false);
xhr.send();
var return_data = JSON.parse(xhr.responseText);

var array = {
	name:'user',
	message:''
}
var message = 'Why is my car vibrating?';

model_push.push('123',message,'Caroline');
//暂时注释掉
	// new CronJob('*/10 * * * * *',function()
	// {
	// 	console.log('-----------------'+index++);

	// 	/*1添加API
	// 	 2.添加判断 API是否出现异常
	// 	 * */
	// 	if (return_data['Vibration'] === 1)
	// 	{
 //           	solrClient.search(query, function(err, searchResponse)
 //           	{
	// 	       if (err)
	// 	      {
	// 		    console.log('Error searching for documents: ' + err);
	// 	      } 
	// 	      else 
	// 	      {
	// 		    console.log('Found ' + searchResponse.response.numFound + ' documents.');
	// 		    console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0].title, null, 2));
	// 		    // console.log(jquery.title);
	// 		    var values = 
	// 		    {
	// 			 name : searchResponse.response.docs[0].title,
	// 			 value : searchResponse.response.docs[0].body
	// 		    };
	// 		    var message = searchResponse.response.docs[0].title;
	// 		     /**/
			    
	// 		    model_push.push(array.name,message,'Caroline');
	// 		    console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0].body, null, 2));
	// 	      }
	//        });
	// 	}else{
 //            console.log('Nothing');
	// 	};
	// },null,true,'America/Los_Angeles');
	// res.render('text', {doc : values});	
// });

router.post('/alert',function(req,res,next){
	var index=0;
	var jquery = {
		title : req.body.cluster_title,
		body : req.body.cluster_body
	};
	console.log(jquery.title+'----'+jquery.body);
	var paramss = {
		cluster_id : 'sc8624291e_d97e_46c3_bb65_f2c6f49d3bf9',
		collection_name : 'Demo_coll',
		wt : 'json'
	};
	
	var doc = {
				id :index,
				author : 'brenckman,m.',
				bibliography : 'j. ae. scs. 25, 1958, 324.',
				body : jquery.body,
				title : jquery.title
			};
			solrClient = retrieve_and_rank.createSolrClient(paramss);
			console.log('Indexing a document...');
			solrClient.add(doc, function(err, response) {
				if (err) {
					console.log('Error indexing document: ', err);
				} else {
					
					console.log('Indexed a document.');
					solrClient.commit(function(err) {
						if (err) {
							console.log('error', err);
						} else {
							index++;
							console.log('Successfully committed changes.');
							console.log('-------------'+response);
							var alertto={name:'上传成功',
							value:'谢谢'};
				res.render('alert',{doc:alertto});

						}
					});
				}
				
			});
			
});
module.exports = router;

