### Gameplan

1. Figure how to put in place sprites (Together)
2. Create map (Together)
3. Bomber Person / Blocks (Solo)
4. Bombs / Explosion (Solo)
5. Game Engine (Together)
6. Timer / Map Shrink (Together)
7. Multiplayer Local (Solo)
8. Keeping score (Solo)

### Objects
- Bomber Person
- Map (inclusive of pillars)
- Blocks
- Explosion
- Tile
- Bombs

#### Tile
- A tile has boundaries
- MVP: A tile is occupied or not occupied
- Has attributes that will describe what is on or in the tile

#### Bomber Person
- They can be controlled using keys
  - Arrow keys or WADS
  - Bombs can be dropped using "M" or "Q" respectively
- Bomber Person can only lay one bomb at a time
- They can die when touched with explosion

#### Map
- Has boundaries
- Has pillars
- Explosion can not go through pillars
- Bomber person can not go past boundaries or go through pillars

#### Block
- Bomber Person can not go through blocks
- Explosion can destroy blocks
- Explosion can not go through multiple blocks

#### Explosion
- Births from Bomb
- Bomber Person death on touch
- Blocks death on touch
- Temporary existence
- Unclear fire is behind

#### Bomb
- Birthed by Bomber Person
- Temporary existence
- Bomber Person can not go through bomb
  - Needs logic for initial birth which is on top of Bomber Person
- Bomber Person can die from their own bomb or other's bombs
