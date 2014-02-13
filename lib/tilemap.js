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
                this.height = this.map.length
                if (this.height == 0) throw new Error('Map height should be > 0')
                this.width = this.map[0].length
                if (this.width == 0) throw new Error('Map width should be > 0')
                var _i=0
                if (this.map.some(function (l,i) { _i=i; return l.length !== this.width }.bind(this))) throw new Error('Map lines should be consistant with first line width: '+this.width+'. Line '+_i+' is '+this.map[_i].length)
            }
            if (! ('_id' in this)) {
                this._id = uuid()
            }
            if (! ('morph' in this)) {
                this.morph = "bounded"
            }
        }
        TileMap.prototype = new Object()
        
        function CenteredTileMap() {
            TileMap.apply(this,arguments)
            this.offsetLat = Math.floor(this.map.length/2)
            this.offsetLng = Math.floor(this.map[0].length/2)
            this.northBound = this.offsetLat
            this.southBound = - this.offsetLat
            this.eastBound = this.offsetLng
            this.westBound = - this.offsetLng
        }
        CenteredTileMap.prototype = new TileMap()
        CenteredTileMap.prototype.convLat = function (lat) {
            if (lat > this.northBound) throw new Error('Northern bound attained.')
            if (lat < this.southBound) throw new Error('Southern bound attained.')
            return this.offsetLat - lat
        }
        CenteredTileMap.prototype.convLng = function (lng) {
            if (this.morph === 'bounded') {
                if (lng > this.eastBound) throw new Error('Eastern bound attained.')
                if (lng < this.westBound) throw new Error('Western bound attained.')
            } else if (this.morph === 'cylinder') {
                lng = this.modLng(lng)
            }
            return this.offsetLng + lng
        }
        CenteredTileMap.prototype.modLng = function (lng) {            
            if (lng > this.eastBound) return ((this.offsetLng+lng)%this.width) - this.offsetLng
            if (lng < this.westBound) return this.offsetLng + ((lng-this.offsetLng)%this.width)
            return lng
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
        CenteredTileMap.prototype.northOf = function (lat,lng) {
            return {_: this.at(lat+1,lng), lat: lat+1, lng: lng  }
        }
        CenteredTileMap.prototype.eastOf = function (lat,lng) {
            return {_: this.at(lat,lng+1), lat: lat, lng: this.modLng(lng+1)  }
        }
        CenteredTileMap.prototype.southOf = function (lat,lng) {
            return {_: this.at(lat-1,lng), lat: lat-1, lng: lng  }
        }
        CenteredTileMap.prototype.westOf = function (lat,lng) {
            return {_: this.at(lat,lng-1), lat: lat, lng: this.modLng(lng-1)  }
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
