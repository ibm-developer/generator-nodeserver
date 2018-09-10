'use strict';

// labels for prompt checkbox 
const CHECKBOX_ALERT = "alert notification";
const CHECKBOX_APPID = "appid";
const CHECKBOX_CLOUDANT = "cloudant";
const CHECKBOX_MONGO = "mongo";
const CHECKBOX_OBJECT_STORAGE = "object storage";
const CHECKBOX_POSTGRE = "postgre";
const CHECKBOX_PUSH = "push";
const CHECKBOX_REDIS = "redis";
const CHECKBOX_WATSON_CONVERSATION = "watson conversation";

// array of labels for easy index lookup 
const SERVICE_LABELS= [ 
  CHECKBOX_ALERT,
  CHECKBOX_APPID,
  CHECKBOX_CLOUDANT,
  CHECKBOX_MONGO,
  CHECKBOX_OBJECT_STORAGE,
  CHECKBOX_POSTGRE,
  CHECKBOX_PUSH,
  CHECKBOX_REDIS,
  CHECKBOX_WATSON_CONVERSATION
];

// checkbox array for prompt 
const SERVICE_CHOICES= [
  {"name":CHECKBOX_ALERT},
  {"name":CHECKBOX_APPID},
  {"name":CHECKBOX_CLOUDANT},
  {"name":CHECKBOX_MONGO},
  {"name":CHECKBOX_OBJECT_STORAGE},
  {"name":CHECKBOX_POSTGRE},
  {"name":CHECKBOX_PUSH},
  {"name":CHECKBOX_REDIS},
  {"name":CHECKBOX_WATSON_CONVERSATION}
];

/* 
keys to select services via generator-ibm-service-enablement.
must match SCAFFOLDER_PROJECT_PROPERTY_NAME value in corresponding
service sub-generator (e.g. service-alert-notification)
*/

const SERVICES= [ 
  "alertNotification",
  "appid",
  "cloudant",
  "mongodb",
  "objectStorage",
  "postgresql",
  "push",
  "redis",
  "conversation"
];

module.exports = {
  SERVICE_LABELS,
  SERVICE_CHOICES,
  SERVICES
};