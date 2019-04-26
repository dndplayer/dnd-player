# Maps Data format plan

- ***TODO/WIP***: Normalize the assets "arrays" so they just reference assets in another collection. This would be useful so that the shared data I.E. health-points etc is common everywhere, but context specific e.g. visualisation data like the localTransform is specific to the ''user'' of the referenced Asset I.E. the map is the user.
- ***Question/Problem***: Having this referenced asset system would mean needing to handle the case where an asset is deleted, what would the remaining references of it do ?
  - One solution is prevent asset deletion 
  - Ensure that Asset references don't crash/error without the referenced asset, but make this apparent to the users (I.E. Big ? or X where there is no image).
- Perhaps still having a mechnism for assets to be "local" and only exist on a map could be beneficial. It's useful to have a shared character or monster asset for example, but probably pointless for a Bush image asset or something I guess.
- ***Idea***: It would be nice if assets allowed cascading properties, so properties defined at the local level would overide the same named one if it exists at the global level. Probably only useful for specific use cases e.g. A Monster asset needing to use a specific different image on a certain map due to scale/state/spell etc, but elsewhere maintain it's original image.

## Map Data Structure

``` json
{
    "id": "",
    "name": "Test Map",
    "creator": "<UserUID>",
    "timestamp": "<CreationTimestamp>",
    "layers": { // The available layers in this map
        "dm": {  // Layer with all assets only visible by the DM
            "assets": {
                "id": {  // Key is Id of the map asset - NOT the AssetID itself
                    // Context specific asset properties exist here 
                    "assetId": "<Asset ID from global asset collection>",
                    "localTransform": "<A PIXI Matrix>"
                },
                ...
            }
        },
        "background": { // A Layer kept in the background that is visible to everyone
            "assets": {
                ...
            }
        },
        "all": { // A Layer that has complete visiblity to everyone connected
            "assets": {
                ...
            }
        }
    }
}
```

## Assets Data Structure

```json
{
    "<assetId>": {
        "name": "<Asset Name>",
        "imageUrl": "<Uploaded or remote image url of asset>",
        // Any other global asset properties can exist here e.g. health points, ammo etc.
    }
}
```

## Points from recent discussion

- PlayerChar and NonPlayerChar data should be kept in 2 distinct collections
- Concept of Assets isn't needed, PC and NPC is enough for global data tracking, the rest is contained within the Map
- "Items" which need to move across maps e.g. a caravan would just become NPCs
- Drag PC or NPC onto map should create a MapObject that links to that asset
- Drag Uploaded image onto map should create a MapObject that is local only and references the uploaded imageUrl

``` json
"playerCharacters": {

},
"nonPlayerCharacters": {

},
"maps": {
    "somemap": {
        "layers": {
            "tokens": {
                "children": {
                    "mapObj1": {
                        "pcId": null,   // Only one of pcId or npcId should be populated, or neither
                        "npcId": null,
                        ... Override Props from pc or npc asset
                        ... 
                    }
                }
            }
        }
    }
}
```