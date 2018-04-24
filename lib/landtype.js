/*
 * Copyright 2018 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

module.exports = class LandType {
  constructor({k, name, pos, min, max, x}) {
    if (typeof k !== 'string') throw new Error('LandType must be initiated with a "k" as string')
    if (typeof name !== 'string') throw new Error('LandType must be initiated with a "name" as string')
    const iftype = (x, t, d) => (typeof x === t ? x : d)
    pos = iftype(pos, 'boolean', true)
    min = iftype(min, 'number', 0)
    max = iftype(max, 'number', 0)
    if (pos && (min < 0 || max < 0)) throw new Error('LandType of positive level should have both min('+min+') and max('+max+') positive or nil.')
    if (!pos && (min > 0 || max > 0)) throw new Error('LandType of negative level should have both min('+min+') and max('+max+') negtive or nil.')
    x = iftype(x, 'number', 1)
    Object.assign(this, {k, name, pos, min, max, x})
  }
  static build(o) {
    return new LandType(o)
  }
  static buildMap(l) {
    return new Map(l.map(e => [e.k, e]))
  }
  create(l) {
    return { k: this.k, t: this.name, lvl: this.pos? +l : -l }
  }
}