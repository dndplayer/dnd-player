# DND Player

## Features / Functionality
- SRD/5e specific
- Chat
- Parametric character sheets
- Data import/export
  - Characters
  - Monsters
- Collaborative whiteboard
  - Maps
  - Drawing
  - Images
  - Distance measurement / grid
  - Character tokens with critical data exposed
    - HP / Max HP
    - AC
    - Status effects / buffs
    - Altitude?
  - Initiative tracker
    - Character name
    - HP / Max HP
    - AC
    - Initiative roll
    - Status effects / buffs
  - 3 whiteboard layers
    - Background
    - Character
    - DM only
- Quick dice rolling
  - Ability to roll custom dice
  - Advantage/Disadvantage
  - Roll for specific ability / spell
  - Secret DM rolls
- Try to use external API's where possible for data or calculations

## Out of Scope

- Video / audio chat
- Character creation
- Synchronized music player / sound effects

## Plans

Functionality over form - I.E. get something working before making it nice to look at or nice to use.

## Routing

My initial thought was that something like this probably didn't need routing I.E. React-Router or something similar.
I've since realised it may be useful even though most of the interface is just 1 page because it could allow us to 
do popout char sheets (potentially) similar to Roll20 as well as other possible interesting use cases.

## Architecture

- Could it be serverless?
  - Where would data be stored?
    - DM's local storage?
- Initial site could be hosted in GitHub Pages direct from here with CI (travis etc)
- If a server was required, what would be the bare minimum it could do?
  - Prefer client side calculations etc (e.g. Dice rolls) as DND is a game of trust anyway so no point worrying about fudged rolls etc.
- Could it run on something like Firebase, so that the effort of synching clients and saving data is offloaded to a third party?
  - Cost?
  - Would this actually provide the functionality we need I.E. would we still need some kind of WebSocket server to handle the real-time bits I.E. Whiteboarding / Chat or does Firebase provide this feature.
  - [Firebase Spark](https://firebase.google.com/pricing/) plan is free, the [RealtimeDatabase](https://firebase.google.com/products/realtime-database/) offering grants 1GB data, and 100 simultaneous connections.
  - [Cloud Firestore](https://firebase.google.com/products/firestore/?authuser=0) is a newer version of RealtimeDatabase, with more features, but slightly more restrictive limits potentially
  - This seems like it would take a lot of the legwork out of it?

### RealtimeDatabase vs Cloud Firestore
  Cloud Firestore has a free limit of 20K writes/day. Assuming a party of 6 doing a 5 hour session, that's 11 writes/minute each. I envision a write being any form of moving/rolling/chat activity. It also has a limit of 50K reads/day, which is 27 updates/minute. This is... probably fine? Cloud Firestore is newer as well and might be easier to set up DM/player restrictions on its queries, which RealtimeDatabase doesn't handle.
  RealtimeDatabase just has a 10GB bandwidth limit per month, which is almost certainly fine.
  
  - Each 'party' would need to set up their own firebase account; probably not an insurmountable issue
- If we support image uploading to display on whiteboard / maps how is this policed ?
  - If the images are actually uploaded and stored somewhere then we not only need to provide that storage but also presumably need to somehow prevent mis-use.
  - If images that are used are just stored in local storage and treat the DM's machine as the primary store. The downside of this is the same as the above point, where the DM's machine (which should be considered volatile) is now critical and could quite easily loose important data.
    - Once again it seems that Firebase Storage also solves this as it's designed for "user generated content"

![Architecture Plan](docs/diagrams/DNDPlayerArchitecturePlan.jpg)

### Data

#### Backend Data requirements

- Character sheets
- Chat history

## Todo

[DONE] Create initial CRA application

## Links / Notes

- https://firebase.google.com/products/database
- https://www.pubnub.com/blog/2016-09-01-diy-virtual-white-board-using-google-and-firebase/
- https://stackoverflow.com/questions/42974365/how-to-store-canvas-in-firebase-usnig-android-for-realtime-collaboration
- Someone discussing serializing the PIXI stage for a similar sounding situation as ours
  - https://github.com/pixijs/pixi.js/issues/3798#issuecomment-287484347
