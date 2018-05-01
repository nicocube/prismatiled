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
  , Matrix = require(__dirname + '/../lib/matrix.js')

test('matrix generation empty horiz 10 vert 5', function(t) {
  let matrix = new Matrix(10, 5)
    , expected = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]
  t.deepEqual(matrix.impl.asArray(), expected)
  t.plan(1)
  t.end()
})

test('matrix generation horiz 10 vert 5 set get', function(t) {
  let matrix = new Matrix(10, 5)
    , expected = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, 'bar', null, null],
      [null, 'foo', null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]

  matrix.set(1, 2, 'foo')
  matrix.set(7, 1, 'bar')

  t.deepEqual(matrix.get(1, 2), 'foo')
  t.deepEqual(matrix.get(7, 1), 'bar')
  t.deepEqual(matrix.impl.asArray(), expected)
  t.plan(3)
  t.end()
})
