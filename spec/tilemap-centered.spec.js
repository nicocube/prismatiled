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

"use strict"

var c=0
function fake_uuid() {return 'fake_'+(++c)}

var tilemap = require(__dirname + '/../lib/tilemap.js')(fake_uuid)

describe("Define centered implicit bounded map:", function () {
    
    var map = tilemap({
        coord : "centered",
        map : [
            ['tl','a','w','w','tr'],
            ['w','w','c','w','w'],
            ['bl','b','w','w','br']
        ]
    })
    common_centered_bounded(map)         
})
describe("Define centered explicit bounded map:", function () {
    var map = tilemap({
        coord : "centered",
        morph : "bounded",
        map : [
            ['tl','a','w','w','tr'],
            ['w','w','c','w','w'],
            ['bl','b','w','w','br']
        ]
    })
    common_centered_bounded(map)         
})
function common_centered_bounded(map) {
    it("map is defined", function() { expect(map).toBeDefined() })
    describe("common centered suite", common_centered(map))
    describe("centered bounded suite", function() {
        it("check north of 1,0", function() { expect(function() { map.northOf(1,0) }).toThrow() })
        it("check south of -1,0", function() { expect(function() { map.southOf(-1,0) }).toThrow() })

        it("check east of 0,2", function() { expect(function() { map.eastOf(0,2) }).toThrow() })
        it("check east of -1,2", function() { expect(function() { map.eastOf(-1,2) }).toThrow() })
        
        it("check west of 0,-2", function() { expect(function() { map.westOf(0,-2) }).toThrow() })
        it("check west of 1,-2", function() { expect(function() { map.westOf(1,-2) }).toThrow() })
        
    })
}

describe("Define centered cylinder map:", function() {
    
    var map = tilemap({
        coord : "centered",
        morph : "cylinder",
        map : [
            ['tl','a','w','w','tr'],
            ['w','w','c','w','w'],
            ['bl','b','w','w','br']
        ]
    })
    describe("common centered suite", common_centered(map))
    
    describe("centered cylinder suite", function() {
        it("check north of 1,0", function() { expect(function() { map.northOf(1,0) }).toThrow() })
        it("check south of -1,0", function() { expect(function() { map.southOf(-1,0) }).toThrow() })
        
        it("check east of 0,2", function() { expect(map.modLng(3)).toEqual(-2) })
        it("check east of 0,2", function() { expect(map.modLng(9)).toEqual(-1) })
        it("check east of 0,2", function() { expect(map.modLng(12)).toEqual(2) })
        it("check east of 0,2", function() { expect(map.modLng(42)).toEqual(2) })
        it("check east of 0,2", function() { expect(map.modLng(666)).toEqual(1) })
        
        it("check east of 0,2", function() { expect(map.modLng(-3)).toEqual(2) })
        it("check east of 0,2", function() { expect(map.modLng(-7)).toEqual(-2) })
        it("check east of 0,2", function() { expect(map.modLng(-8)).toEqual(2) })
        it("check east of 0,2", function() { expect(map.modLng(-10)).toEqual(0) })
        
        it("check east of 0,2", function() { expect(map.eastOf(0,2)).toEqual({_:'w', lat:0, lng:-2}) })
        it("check east of -1,2", function() { expect(map.eastOf(-1,2)).toEqual({_:'bl', lat:-1, lng:-2}) })
        
        it("check west of 0,-2", function() { expect(map.westOf(0,-2)).toEqual({_:'w', lat:0, lng:2}) })
        it("check west of 1,-2", function() { expect(map.westOf(1,-2)).toEqual({_:'tr', lat:1, lng:2}) })
    })
})
function common_centered(map) {    
    it("map is defined", function() { expect(map).toBeDefined() })
    return function () {
        it("check height", function() { expect(map.height).toEqual(3) })
        it("check width", function() { expect(map.width).toEqual(5) })

        it("check tile by coord center", function() { expect(map.at(0,0)).toEqual('c') })
        
        it("check tile by coord west", function() { expect(map.at(0,-2)).toEqual('w') })
        it("check tile by coord east", function() { expect(map.at(0,2)).toEqual('w') })
        it("check tile by coord north", function() { expect(map.at(1,0)).toEqual('w') })
        it("check tile by coord south", function() { expect(map.at(-1,0)).toEqual('w') })
        it("check tile by coord north-west", function() { expect(map.at(1,-2)).toEqual('tl') })
        it("check tile by coord north-east", function() { expect(map.at(1,2)).toEqual('tr') })
        it("check tile by coord south-west", function() { expect(map.at(-1,-2)).toEqual('bl') })
        it("check tile by coord south-east", function() { expect(map.at(-1,2)).toEqual('br') })
        
        it("check sub center - dim horizontal", function() { expect(map.sub({center:[0,-1], dim: [1,3]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['w','w','c']] })) })
        it("check sub center - dim vertical", function() { expect(map.sub({center:[0,-1], dim: [3,1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],['w'],['b']] })) })
        it("check sub topleft - dim horizontal", function() { expect(map.sub({tl:[0,-2], dim: [1,3]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['w','w','c']] })) })
        it("check sub topleft - dim vertical", function() { expect(map.sub({tl:[1,-1], dim: [3,1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],['w'],['b']] })) })
        it("check sub topleft - bottomright horizontal", function() { expect(map.sub({tl:[0,-2], br: [0,0]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['w','w','c']] })) })
        it("check sub topleft - bottomright vertical", function() { expect(map.sub({tl:[1,-1], br: [-1,-1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],['w'],['b']] })) })
        
        it("check north of 0,0", function() { expect(map.northOf(0,0)).toEqual({_:'w', lat:1, lng:0}) })
        it("check east of 0,0", function() { expect(map.eastOf(0,0)).toEqual({_:'w', lat:0, lng:1}) })
        it("check south of 0,0", function() { expect(map.southOf(0,0)).toEqual({_:'w', lat:-1, lng:0}) })
        it("check west of 0,0", function() { expect(map.westOf(0,0)).toEqual({_:'w', lat:0, lng:-1}) })
    }
}
