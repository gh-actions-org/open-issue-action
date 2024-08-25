const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // Get action inputs
    const token = core.getInput('token', { required: true })
    const title = core.getInput('title', { required: true })
    const body = core.getInput('body', { required: false })
    const assignees = core.getInput('assignees', { required: false })

    // Create a new GitHub client
    const octokit = github.getOctokit(token)

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Making request to create issue ...`)
    const response = await octokit.rest.issues.create({
      // owner: github.context.repo.owner,
      // repo: github.context.repo.repo,
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split('\n') : undefined
    })
    core.debug(`Successfully created issue..`)

    // Set outputs for other workflow steps to use
    core.setOutput('issue', JSON.stringify(response.data))
  } catch (error) {
    core.error(`Failed to create issue..`)
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
