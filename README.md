# Create a JavaScript Action

[![GitHub Super-Linter](https://github.com/gh-actions-org/open-issue-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/gh-actions-org/open-issue-action/actions/workflows/ci.yml/badge.svg)

This action opens a new issue on GitHub with a title, body, and a list of
assignees.

## Inputs

#### `token`

**Required** The GitHub token.

#### `title`

**Required** The title of the issue.

#### `body`

The body content of the issue.

#### `assignees`

A comma-separated list of assignees for the issue.

## Outputs

#### `issue`

The issue object as a JSON string.

## Usage

After testing, you can create version tag(s) that developers can use to
reference different stable versions of your action. For more information, see
[Versioning](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md)
in the GitHub Actions toolkit.

To include the action in a workflow in another repository, you can use the
`uses` syntax with the `@` symbol to reference a specific branch, tag, or commit
hash.

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Open GitHub Issue
    id: open-issue
    uses: gh-actions-org/open-issue-action@v1
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      title: 'Issue Title'
      body: 'Issue Body'
      assignees: 'user1,user2'

  - name: Print Issue
    id: print-issue
    run: echo "${{ steps.open-issue.outputs.issue }}"
```
