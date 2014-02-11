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

(/**
 * publish to Node or Browser depending on context 
 */		
function (publisher) {
    "type strict"
    var published = publisher()
	if (typeof module !== 'undefined') {
		module.exports = published
	} else {
		this['tilemap'] = published
	}
})(function () {
    "type strict"
    return function (uuid) { 
        function TileMap(init) {
            if (init) {
                for (var u in init) {
                    this[u]=init[u]
                }
                if (this.map.length == 0) throw new Error('Map height should be > 0')
                if (this.map[0].length == 0) throw new Error('Map width should be > 0')
            }
            if (! ('_id' in this)) {
                this._id = uuid()
            }
        }
        TileMap.prototype = new Object()
        TileMap.prototype.height = function () {
            return this.map.length
        }
        TileMap.prototype.width = function () {
            return this.map[0].length
        }
        
        function CenteredTileMap() {
            TileMap.apply(this,arguments)
            this.offsetLat = Math.ceil(this.map.length/2)
            this.offsetLng = Math.floor(this.map[0].length/2)        
        }
        CenteredTileMap.prototype = new TileMap()
        CenteredTileMap.prototype.convLat = function (lat) {
            return this.map.length - (this.offsetLat + lat)
        }
        CenteredTileMap.prototype.convLng = function (lng) {
            return this.offsetLng + lng
        }
        CenteredTileMap.prototype.at = function (lat,lng) {
            return this.map[this.convLat(lat)][this.convLng(lng)]
        }
        CenteredTileMap.prototype.sub = function (o) {
            var res = [],vertiStart,horizStart, vertiSize,horizSize
            if ('dim' in o) {
                vertiSize = o.dim[0]
                horizSize = o.dim[1]
            }
            if ('center' in o && 'dim' in o) {
                vertiStart = this.convLat(o.center[0]) - Math.floor(vertiSize/2)
                horizStart = this.convLng(o.center[1]) - Math.floor(horizSize/2)
            }
            else if ('tl' in o && 'dim' in o) {
                vertiStart = this.convLat(o.tl[0])
                horizStart = this.convLng(o.tl[1])
            }
            else if ('tl' in o && 'br' in o) {
                vertiStart = this.convLat(o.tl[0])
                horizStart = this.convLng(o.tl[1])
                vertiSize = o.tl[0] - o.br[0] + 1
                horizSize = o.br[1] - o.tl[1] + 1
            }
            
            for (var i = 0; i < vertiSize; i++) {
                res[i] = []
                for (var j = 0; j < horizSize; j++) {
                    res[i][j] = this.map[vertiStart+i][horizStart+j]
                }              
            }
            return new CenteredTileMap({coord : "centered", morph : "part", parent: this._id, map : res})
        }
        
        function TopLeftTileMap() {
            TileMap.apply(this,arguments)
        }
        TopLeftTileMap.prototype = new TileMap()
        TopLeftTileMap.prototype.at = function (lat,lng) {
            return this.map[lat][lng]
        }
        TopLeftTileMap.prototype.sub = function (o) {
            var res = [], verti = o.dim[0], horiz = o.dim[1],
            vertiStart = o.topleft[0] - Math.floor(verti/2),
            horizStart = o.topleft[1] - Math.floor(horiz/2);
            for (var i = 0; i < verti; i++) {
                res[i] = []
                for (var j = 0; j < horiz; j++) {
                    res[i][j] = this.map[vertiStart+i][horizStart+j]
                }              
            }
            return res
        }
        
        
        function parse_string(s) {
            throw new Error('uninmplemented')
        }
        
        function published(init) {
            "type strict"
            if (typeof init === 'string') {
                init = parse_string(init)
            }
            if (typeof init === 'undefined') {
                init = {
                    type: "Sq",
                    coord: "centered",
                    map : [['0']]
                }
            }
            
            switch(init.coord) {
                case "centered":
                    return new CenteredTileMap(init)
                case "topleft":
                    return new TopLeftTileMap(init)
                default:
                    throw new Error("init.coord should be defined!")
            }
        }
        
        published.TileMap = TileMap
        published.CenteredTileMap = CenteredTileMap
        published.TopLeftTileMap = TopLeftTileMap
        
        return published
    }
})
