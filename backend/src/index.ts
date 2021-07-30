import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import api from "./api";

admin.initializeApp();

exports.api = functions.region("us-central1").https.onRequest(api);
