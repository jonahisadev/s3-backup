const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

var s3;

module.exports.init = () => {
	fs.readFile(path.join(__dirname, '..', 'config', 'aws.json'), (err, data) => {
		if (err) {
			console.log("Error reading config file");
			return;
		}
		AWS.config.update(JSON.parse(data));
		s3 = new AWS.S3({ apiVersion: '2006-03-01' });
	});
}

module.exports.loadConfig = () => {
	console.log("Implement loadConfig()");
}

module.exports.getBuckets = (cb) => {
	s3.listBuckets((err, data) => {
		if (err) {
			console.log("Could not load buckets");
			return;
		}
		cb(data.Buckets);
	});
}