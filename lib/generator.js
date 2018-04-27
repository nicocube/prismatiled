/*
 * Copyright 2013 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

const seedrandom = require('seedrandom')
  , LandMass = require('./landmass')
  , LandType = require('./landtype')

module.exports = class Generator {
  constructor(landtypes) {
    this.landtypes = landtypes
  }
  lvlrange() {
    return this.landtypes.reduce((p,c)=>([c.min < p[0] ? c.min : p[0], p[1] < c.max ? c.max : p[1] ]), [0,0])
  }
  lvlMap() {
    return this.landtypes.reduce((p,c)=>{
      for (let i = c.min, l = c.max +1 ; i < l ; i++) {
        if (!(i in p)) { p[''+i] = [] }
        p[''+i].push(Object.freeze(c.create(i)))
      }
      return p
    }, {})
  }
  createLandMass(ns = 10, we = 10, seed = 'default') {
    let rng = seedrandom(seed)
      , tiles = new Array(ns).fill(null).map(() => (new Array(we)).fill(null))
      , northX = Math.floor(rng() * we)
      , southX = Math.floor(rng() * we)
      , westY = Math.floor(rng() * (ns - 2)) +1
      , eastY = Math.floor(rng() * (ns - 2)) +1
      , [ minlvl,  ] = this.lvlrange()
//      , [ minlvl, maxlvl ] = this.lvlrange()
      , mapPerLvl = this.lvlMap()
      , deepest = mapPerLvl[minlvl][0]

//    console.log(northX, southX, westY, eastY)

    let buildRandFun = coord => ((x, i) => i === coord ? x : 3 * rng() * x < 1 ? x : 1 )
      , firstRowProba = this.vectorProba(northX, we)
      , lastRowProba = this.vectorProba(southX, we)
      , firstColProba  = this.vectorProba(westY, ns - 2)
      , lastColProba  = this.vectorProba(eastY, ns - 2)
/*
    console.log(firstRowProba)
    console.log(lastRowProba)
    console.log(firstColProba)
    console.log(lastColProba)
*/
    firstRowProba.map(buildRandFun(northX)).forEach((x,i) => { if (x === 1) { tiles[0][i] = deepest } })
    lastRowProba.map(buildRandFun(southX)).forEach((x,i) => { if (x === 1) { tiles[ns-1][i] = deepest } })
    firstColProba.map(buildRandFun(westY)).forEach((x,i) => { if (x === 1) { tiles[i+1][0] = deepest } })
    lastColProba.map(buildRandFun(eastY)).forEach((x,i) => { if (x === 1) { tiles[i+1][we-1] = deepest } })

    // for ( i = 1; i <  )

//q    this.drawInnerSquare(1, we -1, ns -1, tiles, rng)

    return new LandMass(LandType.buildMap(this.landtypes), tiles)
  }

  vectorProba(p, l) {
    let i = 0
      , r = new Array(l)
    for(; i < l ; i+=1) {
      r[i] = Math.pow(Math.sin(Math.PI/(2*(1 + Math.abs(p - i)))), 2)
    }
    return r
  }
  /**
   * maxX is max horizontal
   * maxY is max vertical
  drawInnerSquare(min, maxX, maxY, tiles, rng){
    this.drawInnerCorner(min, min, 'NW', tiles, rng)
    this.drawInnerCorner(maxX, min, 'NE', tiles, rng)
    this.drawInnerCorner(min, maxY, 'SW', tiles, rng)
    this.drawInnerCorner(maxX, maxY, 'SE', tiles, rng)
    this.drawInnerRow(min, min, maxX, 'N', tiles, rng)
    this.drawInnerRow(maxY, min, maxX, 'S', tiles, rng)
    this.drawInnerCol(min, min, maxY, 'W', tiles, rng)
    this.drawInnerCol(maxX, min, maxY, 'E', tiles, rng)
  }
  drawInnerCorner(x, y, orient, tiles, rng) {
    
  }
  drawInnerRow(y, minX, maxX, orient, tiles, rng) {
    
  }
  drawInnerCol(x, minY, maxY, orient, tiles, rng) {
    
  }
   */
}