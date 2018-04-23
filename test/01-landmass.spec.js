/*
 * Copyright 2018 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

'use strict'

var test = require('tape')
  , LandMass = require(__dirname + '/../lib/landmass.js')
  , LandType = require(__dirname + '/../lib/landtype.js')

test('create one landmass', function(t) {

  let parsed = LandMass.parse(LandType.buildMap([
      LandType.build({k:'-', name:'sea', pos: false, min: -3, max: 0}),
      LandType.build({k:'s', name:'shore'}),
      LandType.build({k:'f', name:'forest', min: 1, max: 3})
    ]),`
    . . . -3-3. . . . . . . . . 
    . . -3-2-2-3. . . . . . . . 
    . . -3-2-1-1-2-3. . . . . . 
    . -3-2-1s0s0s0-2-3-3. . . . 
    -3-1s0s0f1f1f1s0-1-2-3. . . 
    . -2s0s0f1f1f1f1s0s0-1-2-3. 
    . . -2s0f1f3f2f1s0s0-1-2-3. 
    . -2s0s0f1f2f1f1f1s0s0-1-2-3
    -3-2s0s0f1f1s0s0s0-1-2-3. . 
    . -3-2-1s0s0s0-2-3-3. . . . 
    . . . -3-2-1s0-2-3. . . . . 
    . . . . -3-1s0-2-3. . . . . 
    . . . . -3-1-3. . . . . . . 
    . . . . . -3. . . . . . . . 
    `)
    , created = new LandMass([
      [ null, null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -3 }, null, null, null, null, null, null, null, null, null ],
      [ null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null, null, null, null, null, null, null ],
      [ null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null, null, null, null, null ],
      [ null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -3 }, null, null, null, null ],
      [ { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null, null ],
      [ null, { t: 'sea', lvl: -2 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null ],
      [ null, null, { t: 'sea', lvl: -2 }, { t: 'shore', lvl: 0 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 3 }, { t: 'forest', lvl: 2 }, { t: 'forest', lvl: 1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null ],
      [ null, { t: 'sea', lvl: -2 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 2 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 } ],
      [ { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'forest', lvl: 1 }, { t: 'forest', lvl: 1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null ],
      [ null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -1 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -3 }, null, null, null, null ],
      [ null, null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -1 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null, null, null, null ],
      [ null, null, null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -1 }, { t: 'shore', lvl: 0 }, { t: 'sea', lvl: -2 }, { t: 'sea', lvl: -3 }, null, null, null, null, null ],
      [ null, null, null, null, { t: 'sea', lvl: -3 }, { t: 'sea', lvl: -1 }, { t: 'sea', lvl: -3 }, null, null, null, null, null, null, null ],
      [ null, null, null, null, null, { t: 'sea', lvl: -3 }, null, null, null, null, null, null, null, null ]
    ])

  //console.log('XX', parsed)
  /*
  out:
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; j++) {
      if (JSON.stringify(parsed.tiles[i][j]) !== JSON.stringify(created.tiles[i][j])) {
        console.log(i+','+ j + '>', parsed.tiles[i][j], created.tiles[i][j])
        break out
      }
    }
  }
  */

  t.deepEqual(parsed, created)
  t.plan(1)
  t.end()
})