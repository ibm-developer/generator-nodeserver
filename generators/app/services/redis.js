let redis= {
    "db_type": "redis",
    "maps": [],
    "name": "bmix-dal-yp-11111111-1111-1111-1111-87d2894a1111",
    "uri": "redis://admin:PASSCODE@hostname.dblayer.com:11111",
    "uri_cli": "redis-cli -h hostname.dblayer.com -p 11111 -a PASSCODE",
    "deployment_id": "1234123412346f001800558a",
    "serviceInfo": {
        "label": "compose-for-redis",
        "name": "my-redis",
        "plan": "Standard"
    }
}
exports.redis = redis; 