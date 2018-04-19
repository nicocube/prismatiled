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

const landtype = {
  's': 'shore',
  'f': 'forest'
}

module.exports = class LandMass {
  constructor(tiles) {
    this.tiles = tiles
  }
  static parse(str) {
    return new LandMass(str.split('\n')
    .map(x => x.replace(/^ +/g,''))
    .filter(x => x.length)
    .filter(x => { if (x.length%2 !== 0) throw new Error('line length must be even'); return true })
    .map(x => {
      let rx = /(\. )|-([0-9])|(([a-z])([0-9]))/g
        , match = ''
        , r = []
      while ((match = rx.exec(x)) !== null) {
        if (match[1]) r.push(null)
        if (match[2]) r.push({ t: 'sea', depth: +match[2]})
        if (match[3]) r.push({ t: landtype[match[4]], lvl: +match[5] })
      }
      return r
    }))
  }
  static build({ ns, ew, rows }) {
    let tiles = new Array(ns)
      , i = 0
    for (; i < ns; i++) {
      tiles[i] = (new Array(ew)).fill(null)
    }
    rows.forEach((r,ri) => {
      let ci = r.start
      r.blocks.forEach(b => {
        switch(b.t) {
        case 'sea':
          b.depth.forEach(x => {
            tiles[ri][ci] = { t: 'sea', depth: x }
            ci++
          })
          break
        case 'shore': {
          let i = 0
            , l = b.lgth
          for(; i < l; i++) {
            tiles[ri][ci+i] = { t: 'shore', lvl: b.lvl || 0 }
          }
          ci += l
        }
          break
        case 'forest': {
          if (typeof b.lvl === 'number') {
            let i = 0
              , l = b.lgth
            for(; i < l; i++) {
              tiles[ri][ci+i] = { t: 'forest', lvl: b.lvl }
            }
            ci += l
          } else {
            b.lvl.forEach(x => {
              tiles[ri][ci] = { t: 'forest', lvl:  x }
              ci++
            })
          }
        }
          break
        }
      })
    })
    return new LandMass(tiles)
  }
}