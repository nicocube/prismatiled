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

xdescribe("Define centered implicit bounded map:", function () {
    
    var map = tilemap({
        coord : "centered",
        optimize : 'hierarchical',
        blocks : [ 1, 5, 25 ],
        morph : "cylinder",
        map : [
            [{s:25,c: ' '},
                {s:5, m: [
                    [{s:5, c: ' '}, {s:5, c: ' '}, {s:1, m: [
                            [' ', ' ', ' ', 'X', ' '],
                            [' ', ' ', 'X', 'X', ' '],
                            [' ', ' ', 'X', 'X', ' '],
                            [' ', 'X', 'X', 'X', ' '],
                            [' ', ' ', 'X', ' ', ' ']
                    ]}, {s:5, c: ' '}, {s:5, c: ' '}],
                    [{s:5, c: ' '}, {s:1, m: [
                            ['X', 'X', ' ', ' ', ' '],
                            ['X', 'X', 'X', 'X', ' '],
                            [' ', ' ', 'X', 'X', 'X'],
                            [' ', 'X', 'X', 'X', ' '],
                            [' ', ' ', 'X', ' ', ' ']
                    ]}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '} ],
                    [{s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}],
                    [{s:1, m: [
                            [' ', ' ', ' ', ' ', ' '],
                            [' ', ' ', ' ', 'X', 'X'],
                            [' ', ' ', 'X', 'X', 'X'],
                            [' ', 'X', 'X', 'X', 'X'],
                            [' ', ' ', 'X', ' ', ' ']
                    ]}, {s:1, m: [
                            ['X', 'X', ' ', ' ', ' '],
                            ['X', 'X', 'X', 'X', ' '],
                            ['X', 'X', 'X', 'X', 'X'],
                            ['X', ' ', 'X', 'X', ' '],
                            [' ', ' ', 'X', ' ', ' ']
                    ]}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}],
                    [{s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}, {s:5, c: ' '}],
                ]},
                {s:25, c: ' '},{s:25, c: ' '},{s:25, c: ' '}],
            [{s:25, c: ' '},{s:25, c: ' '},
                {s:1, m: [
                    [' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                    [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', ' '],
                    ['X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' '],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', ' '],
                    [' ', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' '],
                    [' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' '],
                    [' ', ' ', 'X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', ' ', 'X', 'X', ' '],
                    [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', ' ', ' '],
                    [' ', 'X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' '],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', ' ', 'X', 'X', ' ', 'X', ' ', ' ', 'X', 'X', 'X'],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', ' ', 'X'],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' '],
                    [' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', ' '],
                    [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' '],
                    [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' '],
                    [' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' '],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    [' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', 'X', 'X', ' '],
                    [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', ' '],
                    [' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', ' '],
                    [' ', 'X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
                    [' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
                ]},
                {s:25,c: ' '},{s:25,c: ' '}],
            [{s:25,c: ' '}, {s:25,c: ' '}, {s:25,c: ' '}, {s:25,c: ' '}, {s:25,c: ' '}]
        ]
    })
        
    describe("common centered suite", common_centered(map))
    describe("centered bounded suite", function() {
        it("check north of 1,0", function() { expect(function() { map.northOf(1,0) }).toThrow() })
        it("check south of -1,0", function() { expect(function() { map.southOf(-1,0) }).toThrow() })

        it("check east of 0,2", function() { expect(function() { map.eastOf(0,2) }).toThrow() })
        it("check east of -1,2", function() { expect(function() { map.eastOf(-1,2) }).toThrow() })
        
        it("check west of 0,-2", function() { expect(function() { map.westOf(0,-2) }).toThrow() })
        it("check west of 1,-2", function() { expect(function() { map.westOf(1,-2) }).toThrow() })
        
    })
})

function common_centered(map) {    
    it("map is defined", function() { expect(map).toBeDefined() })
    return function () {
        it("check height", function() { expect(map.height).toEqual(3) })
        it("check width", function() { expect(map.width).toEqual(5) })

        it("check tile by coord center", function() { expect(map.at(0,0)).toEqual('c') })
        
        it("check tile by coord west", function() { expect(map.at(0,-2)).toEqual(' ') })
        it("check tile by coord east", function() { expect(map.at(0,2)).toEqual(' ') })
        it("check tile by coord north", function() { expect(map.at(1,0)).toEqual(' ') })
        it("check tile by coord south", function() { expect(map.at(-1,0)).toEqual(' ') })
        it("check tile by coord north-west", function() { expect(map.at(1,-2)).toEqual('tl') })
        it("check tile by coord north-east", function() { expect(map.at(1,2)).toEqual('tr') })
        it("check tile by coord south-west", function() { expect(map.at(-1,-2)).toEqual('bl') })
        it("check tile by coord south-east", function() { expect(map.at(-1,2)).toEqual('br') })
        
        it("check sub center - dim horizontal", function() { expect(map.sub({center:[0,-1], dim: [1,3]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [[' ', ' ', 'c']] })) })
        it("check sub center - dim vertical", function() { expect(map.sub({center:[0,-1], dim: [3,1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],[' '],['b']] })) })
        it("check sub topleft - dim horizontal", function() { expect(map.sub({tl:[0,-2], dim: [1,3]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [[' ', ' ', 'c']] })) })
        it("check sub topleft - dim vertical", function() { expect(map.sub({tl:[1,-1], dim: [3,1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],[' '],['b']] })) })
        it("check sub topleft - bottomright horizontal", function() { expect(map.sub({tl:[0,-2], br: [0,0]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [[' ', ' ', 'c']] })) })
        it("check sub topleft - bottomright vertical", function() { expect(map.sub({tl:[1,-1], br: [-1,-1]})).toEqual(tilemap({coord : "centered", morph : "part", parent : 'fake_1', map : [['a'],[' '],['b']] })) })
        
        it("check north of 0,0", function() { expect(map.northOf(0,0)).toEqual({_:' ', lat:1, lng:0}) })
        it("check east of 0,0", function() { expect(map.eastOf(0,0)).toEqual({_:' ', lat:0, lng:1}) })
        it("check south of 0,0", function() { expect(map.southOf(0,0)).toEqual({_:' ', lat:-1, lng:0}) })
        it("check west of 0,0", function() { expect(map.westOf(0,0)).toEqual({_:' ', lat:0, lng:-1}) })
    }
}
