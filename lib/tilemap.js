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

module.exports = function(init) {
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
    
    var coordOffset = {
        "centered": function () {
            this.offsetLat = Math.ceil(this.map.length/2)
            this.offsetLng = Math.floor(this.map[0].length/2)
            
        },
        "topleft": function () {
        }
    }
    
    
    function Tilemap(init) {
        for (var u in init) {
            this[u]=init[u]
        }
        
        if (this.map.length == 0) throw new Error('Map height should be > 0')
        if (this.map[0].length == 0) throw new Error('Map width should be > 0')
        
        if (this.coord in coordOffset) {
            (coordOffset[this.coord].bind(this))()        
        }
        console.log(this)
    }
    Tilemap.prototype = new Object()
    Tilemap.prototype.height = function () {
        return this.map.length
    }
    Tilemap.prototype.width = function () {
        return this.map[0].length
    }
    Tilemap.prototype.convLat = function (lat) {
        return this.map.length - (this.offsetLat + lat)
    }
    Tilemap.prototype.convLng = function (lng) {
        return this.offsetLng + lng
    }
    Tilemap.prototype.at = function (lat,lng) {
        //console.log('lat:'+lat+"=>"+a, 'lng:'+lng+"=>"+b)
        return this.map[this.convLat(lat)][this.convLng(lng)]
    }
    Tilemap.prototype.sub = function (o) {
        var res = [], verti = o.dim[0], horiz = o.dim[1]
        var vertiStart, horizStart
        if ('center' in o) {
            vertiStart = this.convLat(o.center[0]) - Math.floor(verti/2)
            horizStart = this.convLng(o.center[1]) - Math.floor(horiz/2)
        }
        if ('topleft' in o) {
            vertiStart = o.topleft[0] - Math.floor(verti/2)
            horizStart = o.topleft[1] - Math.floor(horiz/2)
        }
        for (var i = 0; i < verti; i++) {
            res[i] = []
            for (var j = 0; j < horiz; j++) {
                res[i][j] = this.map[vertiStart+i][horizStart+j]
            }              
        }
        return res
    }
    
    return new Tilemap(init)
    
    function parse_string(s) {
        throw new Error('uninmplemented')
    }
}
