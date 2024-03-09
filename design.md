# Design
Platformer-esque game-like thing, collecting letters across maps, finding the word, level complete.
*What is it that you are looking for here?*

# To-Do and Reference
living design doc: https://docs.google.com/document/d/1L96RvfJ76lwCKamRVTSOhkrxuKnlo6P4RsxwS-RaKzw/edit#heading=h.e905tppnwuaj\
source image: https://twitter.com/LootBndt/status/1757167754895892501\
related to source: https://lootbndt.itch.io/pnpgolf

## Setup
[x] file structure *02-22-2024*\
[x] tiled setup *02-22-2024*\
[x] 'clues' image recreation *02-22-2024*\
[x] load scene *02-22-2024*\
[x] baseline scene hand-offs *02-22-2024*\
[x] font https://www.dafont.com/zx-spectrum.font *02-22-2024*\
[x] rules pop-up config *02-23-2024*\
    - super({ key: 'rulesScene', active: true })\
    - https://labs.phaser.io/edit.html?src=src/scenes/ui%20scene%20es6.js&v=3.80.0\
[x] browser memory *02-22-2024*

## Familiarization (March 8, 2024)
**pinball, tilting the cabinet**\
**platformer**\
**pool?**\
[x] player controls *03-01-2024*\
    [x] tilt\
    [x] camera rotation\
    [x] jump\
[x] checkered tile *03-03-2024*\
[x] wavy tile *03-03-2024*\
    [x] death (temp)\
[x] tiny dot tile *03-07-2024*\
[ ] level what\
    [ ] letter display and collisions
[ ] level isit\
[ ] menu select functionality\
[x] tune 1 (temp) *02-22-2024*\
[x] jump sfx (temp) *03-07-2024*\
[x] respawn sfx (temp) *03-07-2024*\
[x] selection sfx (temp) *03-07-2024*\
[ ] jump emitter

## Playtest Goals (**WEDNESDAY**, March 14, 2024)
[x] tune 1 (full) *03-09-2024* (json files can be imported into beepbox)\
[x] tune 2 *03-09-2024* (json files can be imported into beepbox)\
[ ] rules display\
    - because of the load order, image, not text
[ ] full death\
[ ] triangle tile\
[ ] level that\
[ ] level you\
[ ] level are\
[ ] moving checkered tiles\
[ ] particle effects\
[ ] screen shake\
[ ] fix font

### Playtest rubric
- Basic Scene structure: You have defined Scenes (yes, plural) and some means to switch between them (e.g., via in-game actions, temporary key presses, etc.).  (1 point)
- Player interaction: The player can interact with the game. You should have at least one primary mechanic operational. If you make a platformer, perhaps movement and jumping are implemented. If you make a narrative game, perhaps the dialog boxes are implemented. If you're making a hidden object game, perhaps the basic point/click verbs are implemented. Primary mechanics will vary from game to game. (1 point)
- Temporary visual assets: What good are core loops and interactions if there is nothing to look at? These should be assets in place, even if they are geometric primitives, quick doodles, or magazine cutouts. (1 point)
- Temporary sound assets: Don't leave decisions about sound until the end of the design process. Sound is integral to making a game feel "real." Make sure your game makes some noise. (1 point)
- Code organization and hygiene: Be sure you're using good software engineering practices, including version control (git/GitHub), code commenting, code encapsulation (Scenes, prefabs, etc.), and other quality-of-life features (e.g., indenting, logical variable names, etc.). It doesn't have to be perfect, but a grader should be able to look at your GitHub repository and understand how your code is structured and how it works. (1 point)
- Playtest attendance: Show up for our in-class playtest sessions and have your build ready on your assigned day. (2 points)

## Final Goals (March 18, 2024)
[ ] slect sfx\
[ ] menu sfx\
[ ] mystery solved\
[ ] tile edits\
[ ] player shake\
[ ] level looking\
[ ] level for\
[ ] level here

## Stretch
[ ] randomly generated title screen\
    - randomly generated makes sense, but the grouping\
    - waves on bottom, then checkers, then triangles\
    - triangles closest to the center, triangles and checkers on the ouskirts of each group
[ ] letter prefab

## Office Hours and Discussion
[x] font licensing\
    - should be fine\
[ ] why can i not make a stupid player prefab\
[ ] player going slightly off screen??\
[ ] do i need both the tmx and the json? exporting json affects the game, tmx does not?

## Rubric and notes
### INFRASTRUCTURE
- +2 The game runs/executes without critical errors or crashes. (Graders will use Chrome, so be sure you game works in that browser.)
- +3 The project has a well-maintained and updated GitHub page that shows meaningful contributions, commits, and milestones throughout the course of the project's history (including contributions from all team members if you are not working solo).
### LOOK & FEEL
- +5 The game includes (scenes)
    [ ] a title screen
    [ ] some means to view credits
    [ ] some means of completion/conclusion
    [ ] the ability to restart from within the game
    [ ] in-game instructions/tutorial that allow the player to learn the game's premise and controls
    (These criteria are judged relative to your specific game, genre, artistic tone, etc.) If your game is purposefully difficult and you're concerned that graders won't be able to evaluate it properly, please provide a "grader mode" or debug menu that will allow us to see everything you've made, along with instructions for how to access that mode.
- +10 Your game has artistic cohesion, i.e. the art, sound, typography, etc. reflect your target media's aesthetic goals, your game is legible as a recreation of the fictional game, and your assets make sense together.
### TECHNICAL EXECUTION
- +5 Your game uses at least five of Phaser's major components, which may include: physics systems, cameras, particle effects, text objects, the animation manager, the tween manager, timers, tilemaps, pipeline FX, etc. (Please list these components in your main.js file.) Components that should appear in all projects, like Scenes and Game Objects, do not count.
- +10 Your game has mechanical cohesion, i.e. the mechanics reflect your adaptation's technical goals, the game controls and performs as expected, and the mechanics are well-implemented.
- +5 Your project and code are well-structured and organized, including legible comments, appropriate data structures, sensible prefabs, meaningful variable names, logical scene structures, etc. (Nathan's examples are a good baseline.)
### POLISH & STYLE
- +5 Your game has that extra bit of polish, creativity, technical prowess, and/or originality that helps it stand out from other games. We use this criteria as a grade "tilt" to reward games that we really enjoyed, that are bold and inventive, that adapt their target media thoughtfully, that demonstrate strong technical skills, and/or went beyond the stated objectives of the assignment. Feel free to add a comment to your main.js/Canvas submission if you wish to point out any features that we might miss.

## Notes
tileset name: clues_tilesheet
current beepbox url:
https://www.beepbox.co/#9n31s7k0l00e03t1qa7g0fj07r1i0o432T7v1u33f10m6q011d08HYw004000030000h0I4E0T1v1ue0f0q023d08A1F4B3Q217cPe433E361a6287bT1v1ue7f10p7q0331d08A0F5B3Q0140Pea77E361b627638T4v1uf0f0q011z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E0b4h400000000h4g000000014h000000004h400000000p1FFE-4z8TRRMldldBBsDpm00bdWfNSVLh-9LjuzZg00