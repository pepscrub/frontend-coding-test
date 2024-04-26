# Lens Frontend Coding Test

This repository contains a heavily simplified version of the Lens UI.

## Installation

To install dependencies, run `pnpm i`. I recommend you install dependencies with [pnpm](https://pnpm.io/) but it should also work with yarn or npm.

To start storybook, run `pnpm run storybook`. Node 20 is required.

You should now be able to see the full application within storybook under the [Ingegration/App](http://localhost:6006/?path=/story/integration-app--app) story. This also contains some example tests.

Please note that the patent/scholar data is supplied via mock HTTP endpoints using MSW. It has the same shape as our real models, but there's no backend server required here.

## Task

Your task is to implement one of the following features:

1. Jurisdiction facet
2. Patent Preview
3. Facet Analysis

See the following screenshot for an illustration of what each of the above refers to:

![screenshot_2024-04-24_160030](https://private-user-images.githubusercontent.com/339630/325833490-1c4b3930-74dd-440d-a822-390c0e298971.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQxMDAxNzQsIm5iZiI6MTcxNDA5OTg3NCwicGF0aCI6Ii8zMzk2MzAvMzI1ODMzNDkwLTFjNGIzOTMwLTc0ZGQtNDQwZC1hODIyLTM5MGMwZTI5ODk3MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQyNlQwMjUxMTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYTY5MjhhNzc5ZDE0M2JlYjcyY2QxYzI1NGE2NGQxYmQ5YzA1NTc2YmY4YzljM2RiNzRiMzFmOTU0ZWI4MWQ2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.a0EAN9eG_ZeqefPSXd4LnJARAFwkVFHokaq2gnU1nUI)

See how the real functionality works by visiting [lens.org](https://lens.org) and performing a search.

## Submitting your solution

Please create your own github repository and push this solution to it.

Ideally, create an initial commit of this supplied code on main, then submit your changes as a Pull Request.

If you'd prefer the repository to remain private, invite @simon-lang as a collaborator when you're ready for me to review.


## What we are looking for

Write a story with interaction tests that show how the functionality works.

Your implementation does NOT need to be fully comparable to the versions on lens.org in either functionality or design.

Do not worry about browser navigation (e.g. useQueryParams) - it only needs to be visible through Storybook.

If you choose to implement analysis functionality note that [recharts](https://recharts.org/en-US/) is already installed, but you don't necessarily need to use it.

Feel free to implement more than one of the above if you find you have time. If you are unable to fully complete a feature, please submit it incomplete and explain in your documentation what challenges you faced and how you would go about solving them if you had the time.

Refactoring any existing part of the application is welcome but not necessary.

Submit as a PR containing a written description of your contribution. Approach this as you would any other PR in your daily work.

If you have questions or would like clarification, please do not hesitate to contact Simon. Treat this as a real task and reach out for help as you feel is appropriate.

Mostly we will be looking for clean, reusable code which is well documented via PR and storybook tests.

