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
  , LandType = require(__dirname + '/../lib/landtype.js')
  , LandMass = require(__dirname + '/../lib/landmass.js')
  , Generator = require(__dirname + '/../lib/generator.js')

test('test lvlrange', function(t) {

  let landtypes = [
      LandType.build({k:'-', name:'sea', pos: false, min: -3, max: 0}),
      LandType.build({k:'s', name:'shore'}),
      LandType.build({k:'f', name:'forest', min: 1, max: 3})
    ]
    , generator = new Generator(landtypes)
    , [ minlvl, maxlvl ] = generator.lvlrange()

  t.deepEqual(minlvl, -3)
  t.deepEqual(maxlvl, 3)
  t.plan(2)
  t.end()
})

test('test lvlMap', function(t) {

  let landtypes = [
      LandType.build({k:'-', name:'sea', pos: false, min: -3, max: -1}),
      LandType.build({k:'s', name:'shore'}),
      LandType.build({k:'f', name:'forest', min: 1, max: 3})
    ]
    , generator = new Generator(landtypes)
    , actual = generator.lvlMap()
    , expected = {
      minlvl: -3,
      maxlvl: 3,
      deepest: { k: '-', t: 'sea', lvl: -3 },
      highest: { k: 'f', t: 'forest', lvl: 3 },
      '-3': [ { k: '-', t: 'sea', lvl: -3 } ],
      '-2': [ { k: '-', t: 'sea', lvl: -2 } ],
      '-1': [ { k: '-', t: 'sea', lvl: -1 } ],
      '0': [ { k: 's', t: 'shore', lvl: 0 } ],
      '1': [ { k: 'f', t: 'forest', lvl: 1 } ],
      '2': [ { k: 'f', t: 'forest', lvl: 2 } ],
      '3': [ { k: 'f', t: 'forest', lvl: 3 } ] }


  t.deepEqual(actual, expected)
  t.plan(1)
  t.end()
})

test('test vectorProba', function(t) {

  let landtypes = [
      LandType.build({k:'-', name:'sea', pos: false, min: -3, max: -1}),
      LandType.build({k:'s', name:'shore'}),
      LandType.build({k:'f', name:'forest', min: 1, max: 3})
    ]
    , generator = new Generator(landtypes)
    , testVectorProba = (p, l, expected) => {
      let actual = generator.vectorProba(p , l)
//      console.log(actual)
      t.deepEqual(actual, expected)
    }
  testVectorProba(4, 10, [ 0.09549150281252627,
    0.14644660940672624,
    0.24999999999999994,
    0.4999999999999999,
    1,
    0.4999999999999999,
    0.24999999999999994,
    0.14644660940672624,
    0.09549150281252627,
    0.06698729810778066 ])
  testVectorProba(2, 10, [ 0.24999999999999994,
    0.4999999999999999,
    1,
    0.4999999999999999,
    0.24999999999999994,
    0.14644660940672624,
    0.09549150281252627,
    0.06698729810778066,
    0.049515566048790434,
    0.03806023374435662 ])
  testVectorProba(1, 10, [ 0.4999999999999999,
    1,
    0.4999999999999999,
    0.24999999999999994,
    0.14644660940672624,
    0.09549150281252627,
    0.06698729810778066,
    0.049515566048790434,
    0.03806023374435662,
    0.030153689607045803 ])
  testVectorProba(7, 10, [ 0.03806023374435662,
    0.049515566048790434,
    0.06698729810778066,
    0.09549150281252627,
    0.14644660940672624,
    0.24999999999999994,
    0.4999999999999999,
    1,
    0.4999999999999999,
    0.24999999999999994 ])
  t.plan(4)
  t.end()
})

test.skip('test createLandMass', function(t) {

  let landtypes = [
      LandType.build({k:'-', name:'sea', pos: false, min: -3, max: -1}),
      LandType.build({k:'s', name:'shore'}),
      LandType.build({k:'f', name:'forest', min: 1, max: 3})
    ]
    , generator = new Generator(landtypes)
    , landmass = generator.createLandMass()
    , expected = LandMass.parse(LandType.buildMap(landtypes), `
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
      . . . . . . . . . . 
`)

  console.log(landmass.stringify())
  t.deepEqual(landmass, expected)
  t.plan(1)
  t.end()
})
