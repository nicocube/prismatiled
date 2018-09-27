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
  , Matrix = require('./matrix')
  , orientCoordLookup = {
    N: [[-1,-1],[0,-1],[1,-1]],
    S: [[-1,1],[0,1],[1,1]],
    W: [[-1,-1],[-1,0],[-1,1]],
    E: [[1,-1],[1,0],[1,1]],
    NW: [[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],
    NE: [[-1,-1],[0,-1],[1,-1],[1,0],[1,1]],
    SW: [[-1,-1],[-1,0],[-1,1],[0,1],[1,1]],
    SE: [[-1,1],[0,1],[1,1],[1,0],[1,-1]]
  }
module.exports = class Generator {
  constructor(landtypes) {
    this.landtypes = landtypes
  }
  lvlrange() {
    return this.landtypes.reduce((p,c)=>([c.min < p[0] ? c.min : p[0], p[1] < c.max ? c.max : p[1] ]), [0,0])
  }
  lvlMap() {
    let res = this.landtypes.reduce((p,c)=>{
        for (let i = c.min, l = c.max +1 ; i < l ; i++) {
          if (!(i in p)) { p[''+i] = [] }
          p[''+i].push(Object.freeze(c.create(i)))
        }
        return p
      }, {})
      , [ minlvl, maxlvl ] = this.lvlrange()
    res.minlvl = minlvl
    res.maxlvl = maxlvl
    res.deepest = res[minlvl][0]
    res.highest = res[maxlvl][0]
    return res
  }
  vectorProba(p, l) {
    let i = 0
      , r = new Array(l)
    for(; i < l ; i+=1) {
      r[i] = Math.pow(Math.sin(Math.PI/(2*(1 + Math.abs(p - i)))), 2)
    }
    return r
  }
  createLandMass(ns = 10, we = 10, seed = 'default') {
    let rng = seedrandom(seed)
      , tiles = new Matrix(we, ns)
      , northX = Math.floor(rng() * we)
      , southX = Math.floor(rng() * we)
      , westY = Math.floor(rng() * (ns - 2)) +1
      , eastY = Math.floor(rng() * (ns - 2)) +1
      , mapPerLvl = this.lvlMap()

    // console.log(northX, southX, westY, eastY)

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
    firstRowProba.map(buildRandFun(northX)).forEach((x,i) => { if (x === 1) { tiles.set(i, 0, mapPerLvl.deepest) } })
    lastRowProba.map(buildRandFun(southX)).forEach((x,i) => { if (x === 1) { tiles.set(i, ns-1, mapPerLvl.deepest) } })
    firstColProba.map(buildRandFun(westY)).forEach((x,i) => { if (x === 1) { tiles.set(0, i+1, mapPerLvl.deepest) } })
    lastColProba.map(buildRandFun(eastY)).forEach((x,i) => { if (x === 1) { tiles.set(we-1, i+1, mapPerLvl.deepest) } })

    // for ( i = 1; i <  )

    this.drawInnerSquare(1, we -2, ns -2, mapPerLvl, tiles, rng)

    return new LandMass(LandType.buildMap(this.landtypes), tiles.asArray())
  }
  /**
   * maxX is max horizontal
   * maxY is max vertical
   */
  drawInnerSquare(min, maxX, maxY, mapPerLvl, tiles, rng){
    this.drawInnerCorner(min, min, 'NW', mapPerLvl, tiles, rng)
    this.drawInnerCorner(maxX, min, 'NE', mapPerLvl, tiles, rng)
    this.drawInnerCorner(min, maxY, 'SW', mapPerLvl, tiles, rng)
    this.drawInnerCorner(maxX, maxY, 'SE', mapPerLvl, tiles, rng)
    /*
    this.drawInnerRow(min, min, maxX, 'N', tiles, rng)
    this.drawInnerRow(maxY, min, maxX, 'S', tiles, rng)
    this.drawInnerCol(min, min, maxY, 'W', tiles, rng)
    this.drawInnerCol(maxX, min, maxY, 'E', tiles, rng)
    */
  }
  orientCoord(x,y,orient) {
    return orientCoordLookup[orient].map(([dx,dy])=>([x+dx,y+dy]))
  }
  drawInnerCorner(x, y, orient, mapPerLvl, tiles, rng) {
    let coord = this.orientCoord(x, y, orient)
      , around = coord.map(([x,y])=>tiles.get(x, y))
      , notNull = around.filter(o=>o!==null)//.reduce((p,c)=>(p+c))
      , notNullLvl = notNull.length > 0 ? Math.floor(notNull.map(o=>o.lvl).reduce((p,c)=>(p+c), 0) / notNull.length) : null
      , elevate = rng() + rng() * notNull.length / coord.length
      , elt = elevate > 1 ? (notNullLvl !== null ? mapPerLvl[notNullLvl+1][Math.round(rng()) % mapPerLvl[notNullLvl+1].length] : mapPerLvl.deepest) : (notNullLvl !== null ? mapPerLvl[notNullLvl][Math.round(rng()) % mapPerLvl[notNullLvl].length] : null)
    console.log('>', elt)
    tiles.set(x, y, elt)
  }
/*
  drawInnerRow(y, minX, maxX, orient, tiles, rng) {
    
  }
  drawInnerCol(x, minY, maxY, orient, tiles, rng) {
    
  }
*/
}
