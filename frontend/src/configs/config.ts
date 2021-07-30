import firebaseConfig from "./firebaseConfig";

export default class AppConfig {
  static mode = "dev";
  static project = firebaseConfig.projectId;
  static apiBaseUrl =
    process.env.NODE_ENV === "production"
      ? "/api"
      : AppConfig.mode === "prod"
      ? `https://us-central1-${AppConfig.project}.cloudfunctions.net/api`
      : `http://localhost:5001/${AppConfig.project}/us-central1/api`;
  static timeout = 30000;
}
