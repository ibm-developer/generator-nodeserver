let mongodb = {
    "ca_certificate_base64": "BASE64-CERT",
    "db_type": "mongodb",
    "maps": [],
    "name": "bmix-dal-yp-11111111-1111-1111-1111-87d2894a1111",
    "uri": "mongodb://admin:PASSCODE@hostname1.dblayer.com:11111,hostname2.dblayer.com:22222/compose?ssl=true&authSource=admin",
    "uri_cli": "mongo --ssl --sslAllowInvalidCertificates hostname1.7.dblayer.com:11111/compose --authenticationDatabase admin -u admin -p PASSCODE",
    "deployment_id": "1234123412346f001800558a",
    "serviceInfo": {
        "label": "compose-for-mongodb",
        "name": "my-mongodb",
        "plan": "Standard"
    }
}
exports.mongodb = mongodb;