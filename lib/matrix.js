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

class Array2DImpl {
  constructor(h, v) {
    this._ = new Array(v).fill(null).map(() => (new Array(h)).fill(null))
  }
  get(x, y) {
    return this._[y][x]
  }
  set(x, y, v) {
    this._[y][x] = v
  }
}

module.exports = class Matrix {
  constructor(h, v, impl = Array2DImpl) {
    this.h = h
    this.v = v
    this.impl = Array2DImpl
  }
  get(x, y) {
    return this.impl.get(x, y)
  }
  set(x, y, v) {
    return this.impl.set(x, y, v)
  }
}

Matrix.Array2DImpl = Array2DImpl