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

(function (publisher) {
    "type strict"
    var published = publisher()
	if (typeof module !== 'undefined') {
		module.exports = published
	} else {
		this['tilemap'] = published
	}
})
(function(crypto) {
    "type strict"
    var
    c = 0,
    last = 0,
    now = 0
    ;
    return function(salt, getNow) {
        salt = salt || 'i am a salt'
        getNow = typeof getNow === 'function' ? getNow : Date.now        
        return function () {
            now = getNow()
            if (now != last) {
                last = now
                c = 0
            } else {
                c++
            }
            var res = ''
            res +=now.toString(36)
            res +=(0x7fffffff ^ c).toString(36)
            return res
        } 
    }
})
