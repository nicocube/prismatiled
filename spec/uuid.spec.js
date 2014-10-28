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
var uuid = require(__dirname + '/../lib/uuid.js')()('plop',function () {return 1392129660000})

describe("uuid generator", function () {

    it("", function () {
        expect(uuid()).toEqual("hrja20dczik0zj")
        expect(uuid()).toEqual("hrja20dczik0zi")
        expect(uuid()).toEqual("hrja20dczik0zh")
        expect(uuid()).toEqual("hrja20dczik0zg")
        expect(uuid()).toEqual("hrja20dczik0zf")
        expect(uuid()).toEqual("hrja20dczik0ze")
    })
})
