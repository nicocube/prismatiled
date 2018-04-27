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

module.exports = class LandMass {
  constructor(landtypes, tiles) {
    this.landtypes = landtypes
    this.tiles = tiles
  }
  static parse(landtypes, str) {
    return new LandMass(landtypes, str.split('\n')
    .map(x => x.replace(/^ +/g,''))
    .filter(x => x.length)
    .filter(x => { if (x.length%2 !== 0) throw new Error('line length must be even'); return true })
    .map(x => {
      let rx = /(\. )|((.)([0-9]))/g
        , _index_void = 1
        , _index_filled = 2
        , _index_f_key = 3
        , _index_f_lvl = 4
        , match = ''
        , r = []
      while ((match = rx.exec(x)) !== null) {
        if (match[_index_void]) {
          r.push(null)
        } else if (match[_index_filled]) {
          let lt = landtypes.get(match[_index_f_key])
          r.push(lt.createAbs(match[_index_f_lvl]))
        }
      }
      return r
    }))
  }
  stringify(indent) {
    indent = indent || 0
    return this.tiles
    .map(l => {
      return ' '.repeat(indent) + l.map(x => x === null ? '. ' : x.k+Math.abs(x.lvl)).join('')
    }).join('\n')
  }
}