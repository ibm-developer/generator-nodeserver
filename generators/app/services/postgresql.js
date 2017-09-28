'use strict';
let postgresql = {
  "db_type": "postgresql",
  "uri_cli": "psql \"sslmode=require hostname1.dblayer.com port=11111 dbname=compose user=admin\"",
  "uri_cli_1": "psql \"sslmode=require host=hostname2.dblayer.com port=22222 dbname=compose user=admin\"",
  "uri_direct_1": "postgres://admin:PASSCODE@hostname.dblayer.com:11111/compose",
  "maps": [],
  "name": "bmix-dal-yp-11111111-1111-1111-1111-87d2894a1111",
  "ca_certificate_base64": "BASE64-CERT",
  "uri": "postgres://admin:PASSCODE@sl-us-south-1-portal.7.dblayer.com:22107/compose",
  "deployment_id": "1234123412346f001800558a",
  "serviceInfo": {
    "label": "compose-for-postgresql",
    "name": "my-postgresql",
    "plan": "Standard"
  }
}
exports.postgresql = postgresql;