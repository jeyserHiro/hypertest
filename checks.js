import { Octokit } from "@octokit/rest"
import { createAppAuth } from "@octokit/auth-app"

const OWNER = process.env['owner']
const REPO = process.env['repo']
const INSTALLATION_ID = 100
const PULL_NUMBER = 1
const APP_ID = process.env['app_id']

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: APP_ID,
    privateKey: process.env["client_secret"],
    // optional: this will make appOctokit authenticate as app (JWT)
    //           or installation (access token), depending on the request URL
    installationId: INSTALLATION_ID,
  },
});

// const { data } = await appOctokit.request("/app");

const { token } = await appOctokit.auth({
  type: "installation",
  // defaults to `options.auth.installationId` set in the constructor
  installationId: INSTALLATION_ID,
})


// const { data: pullRequest } = await octokit.rest.pulls.get({
//   owner: OWNER,
//   repo: REPO,
//   pull_number: 1,
// });

const now = new Date()


await appOctokit.request(`POST /repos/${OWNER}/${REPO}/check-runs`, {
  owner: OWNER,
  repo: REPO,
  name: "test",
  head_sha: '7e6396ad182aa25cdf982aa73187e4bead5e15b2',
  status: 'in_progress', //completed,in_progress
  external_id: '42',
  started_at: now.getTime(),
  output: {
    title: 'Testing Simply report',
    summary: 'just kidding',
    text: 'hey'
  }
})



