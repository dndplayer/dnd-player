# DND Player

[![Build Status](https://travis-ci.org/dndplayer/dnd-player.svg?branch=master)](https://travis-ci.org/dndplayer/dnd-player)
[![Coverage Status](https://coveralls.io/repos/github/dndplayer/dnd-player/badge.svg?branch=master)](https://coveralls.io/github/dndplayer/dnd-player?branch=master)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/dndplayer/dnd-player.svg)](https://codeclimate.com/github/dndplayer/dnd-player)

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://lbesson.mit-license.org/)
[![OGL license](https://img.shields.io/badge/license-OGL-yellow.svg)](http://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf)

[![Discord](https://img.shields.io/discord/569979191186030607.svg)](https://discord.gg/PBhkjVA)

[![Website dnd-player.com](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://dnd-player.com/)

Open-source DND shared experience play space ... or something.

## Demo

https://dnd-player.com

## Setting up Firebase

- Create a Google account if you do not already have one.
- Log into the [Firebase Console](https://console.firebase.google.com/u/0/).
- Click `Add project`.
- Enter a project name (e.g. dnd-player), accept the controller-controller terms, and click `Create project`.
- Open the Project Overview page.
- Navigate to `Develop -> Authentication` in the side menu.
- Click `Set up sign-in method`.
- Select the `Email/Password` sign-in provider, click the top `Enable` switch and click `Save`.
- Click on `Develop -> Authentication` in the side menu again to get back to the Users page.
- Click `Add user`.
- Enter your email address and a password, and click `Add user`.
- Click the `Copy UID` icon that appears when you mouse-over the created user.
- Navigate to `Develop -> Database` in the side menu.
- Scroll down to Realtime Database, and click `Create database`.
- Choose `Start in test mode` and click `Enable`.
- Click the `add child` plus icon next to your project name.
- Enter 'users' into the `Name` field, and click on the `add child` plus item in the new row.
- Paste the copied UID into the `Name` field, and click on the `add child plus item in the new row.
- Enter 'dm' into the `Name` field, and 'true' into the `Value` field.
- Click `Add`.
- Navigate to `Develop -> Storage` in the side menu.
- Click `Get Started`, then `Got it`.
- Navigate to https://console.cloud.google.com/home/dashboard.
- Click on the `Activate Cloud Shell` icon in the top right.
- vim cors.json
```json
[
  {
    "origin": ["https://dnd-player.com"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```
- `gsutil cors set cors.json gs://<project_id>.appspot.com`

- Click on the cog next to `Project Overview` in the side menu, and click on `Project settings`.

You can now log into dnd-player.com with the Project ID and Web API Key listed on that page, along with the email and password you entered.

## Docs

**DEV.md** contains developer specific details

**CONTRIBUTION.md** contains details about contributing, code building and IDE niceties.

**DEBUGGING.md** details on the ideal setup for debugging the site.

dnd-player is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards.
Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.

dnd-player uses material and mechanics from the System Reference Document 5.1 published under the Open Gaming License 1.0a.
Please see LICENSE for more information.

Dungeons & Dragons, D&D, their respective logos, and all Wizards titles and characters are property
of Wizards of the Coast LLC in the U.S.A. and other countries. ©2019 Wizards. dnd-player is not
affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.

