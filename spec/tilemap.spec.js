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
 
var tilemap = require(__dirname+'/../lib/tilemap.js')

describe("Define centered map:", function() {
    
    map = tilemap({
        type : "Sq",
        coord : "centered",
        map : [
            ['tl','a','w','w','tr'],
            ['w','w','c','w','w'],
            ['bl','b','w','w','br']
        ]
    })
    
    it("check height", function() { expect(map.height()).toEqual(3) })
    it("check width", function() { expect(map.width()).toEqual(5) })

    it("check tile by coord center", function() { expect(map.at(0,0)).toEqual('c') })
    
    it("check tile by coord west", function() { expect(map.at(0,-2)).toEqual('w') })
    it("check tile by coord east", function() { expect(map.at(0,2)).toEqual('w') })
    it("check tile by coord north", function() { expect(map.at(1,0)).toEqual('w') })
    it("check tile by coord south", function() { expect(map.at(-1,0)).toEqual('w') })
    it("check tile by coord north-west", function() { expect(map.at(1,-2)).toEqual('tl') })
    it("check tile by coord north-east", function() { expect(map.at(1,2)).toEqual('tr') })
    it("check tile by coord south-west", function() { expect(map.at(-1,-2)).toEqual('bl') })
    it("check tile by coord south-east", function() { expect(map.at(-1,2)).toEqual('br') })
    
    it("check sub center horizontal", function() { expect(map.sub({center:[0,-1], dim: [1,3]})).toEqual([['w','w','c']]) })
    it("check sub center vertical", function() { expect(map.sub({center:[0,-1], dim: [3,1]})).toEqual([['a'],['w'],['b']]) })
    it("check sub topleft horizontal", function() { expect(map.sub({topleft:[1,1], dim: [1,3]})).toEqual([['w','w','c']]) })
    it("check sub topleft vertical", function() { expect(map.sub({topleft:[1,1], dim: [3,1]})).toEqual([['a'],['w'],['b']]) })
})

xdescribe("Define topleft map", function() {
    
    map = tilemap({
        type : "Sq",
        coord : "topleft",
        map : [
            ['tl','a','w','w','tr'],
            ['w','w','c','w','w'],
            ['bl','b','w','w','br']
        ]
    })
    
    it("", function() {
        expect(map.height()).toEqual(3)
        expect(map.width()).toEqual(5)
        expect(map.at(0,0)).toEqual('tl')
        expect(map.at(2,1)).toEqual('c')
        expect(map.at(4,0)).toEqual('tr')
        expect(map.at(0,2)).toEqual('bl')
        expect(map.at(4,2)).toEqual('br')
        
    })
})

xdescribe("Default minimal map definition", function() {
    
    map0 = tilemap()
    map1 = tilemap("Sq")
    map2 = tilemap("Sq/1x1")
    map3 = tilemap("Sq/1x1/0")
    map4 = tilemap("Sq/n0w0")
    map5 = tilemap("Sq/n0w0/0")
    map6 = tilemap("Sq/n0w0s0e0")
    map7 = tilemap("Sq/n0w0s0e0/0")
    map7 = tilemap({
        type: "Sq",
        coord: "centered",
        map : [['0']]
    })
    
    it("", function() {
        expect(map0).toEqual(map1)
        expect(map0).toEqual(map2)
        expect(map0).toEqual(map3)
        expect(map0).toEqual(map4)
        expect(map0).toEqual(map5)
        expect(map0).toEqual(map6)
        expect(map0).toEqual(map7)
        expect(map0.asArray()).toEqual([['0']])
    })
})
