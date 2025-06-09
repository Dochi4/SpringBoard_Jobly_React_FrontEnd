import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const token = localStorage.getItem("token");

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  //   Companies
  // --------------------------------------------------------------
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }
  static async getFilterCompany(searchFilters) {
    let res = await this.request(`companies`, searchFilters);
    return res.companies;
  }
  // --------------------------------------------------------------

  // Jobs
  // --------------------------------------------------------------
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  static async getFilterJob(searchFilters) {
    let res = await this.request(`jobs`, searchFilters);
    return res.jobs;
  }
  // ----------------------------------------------------------------

  // Authentication - REGISTER
  // --------------------------------------------------------------
  // below used for signup
  static async authRegister(userInfo) {
    let res = await this.request(`auth/register`, userInfo, "post");
    console.log(res);
    return res.token;
  }
  // below used for login
  static async authToken(userInfo) {
    let res = await this.request(`auth/token`, userInfo, "post");
    return res.token;
  }

  // ----------------------------------------------------------------

  // Users
  // ----------------------------------------------------------------
  static async patchUser(username, userInfo) {
    const res = await this.request(`users/${username}`, userInfo, "patch");
    return res.user;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async applyToJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res.applied;
  }
}
// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
