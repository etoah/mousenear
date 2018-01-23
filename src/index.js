import throttle from 'lodash/throttle'

/**
 *
 * @param options
 */
export default class MouseNear {
  /**
   *
   * @param options
   *    distance
   *    offsetX
   *    offsetY
   *    throttleTime
   *    persistent
   */
  constructor (options) {
    this.options = options
    this.elementList = []
    this._init()
  }
  /**
   *
   * @param {HTMLElement | string} target - HTMLElement or querySelector string
   * @param callback
   */
  add (target, callback) {
    const element = parseElement(target)
    element._elementBounds = calculateElementBounds(element.getBoundingClientRect(), this.options)
    element._callback = callback
    this.elementList.push(element)
  }

  remove(element){
    var index = this.elementList.indexOf(element)
    if(index > -1){
      this.elementList.splice(index, 1);
    }
  }

  _init () {
    var that = this
    const eventCallback = throttle(function (event) {
      var restList = []

      that.elementList.forEach(item => {
        if (isMouseInRange(event, item._elementBounds)) {
          item._callback.call(item, event)
        } else if (!that.options.persistent) {
          restList.push(item)
        }
      })
      that.elementList = restList
    }, that.options.throttleTime || 100)
    this.eventCallback = eventCallback
    document.addEventListener('mousemove', eventCallback)
  }

  destory () {
    this.elementList = null
    document.removeEventListener('mousemove', this.eventCallback)
  }
}

// for test
//window.MouseNear = MouseNear

function calculateElementBounds (elementRect, options) {
  const distance = options.distance || 40
  if (isNaN(distance)) {
    throw new TypeError('options.distance was expecting a number, was given: ' + typeof options.distance)
  } else {
    return {
      top: elementRect.top - (options.offsetX || distance),
      bottom: elementRect.bottom + (options.offsetX || distance),
      left: elementRect.left - (options.offsetY || distance),
      right: elementRect.right + (options.offsetY || distance)
    }
  }
}

/**
 * @param {Event} event
 * @param {Object} elementBounds
 */
function isMouseInRange (event, elementBounds) {
  var {clientX, clientY} = event
  return event.clientX <= elementBounds.right
    && event.clientX >= elementBounds.left
    && event.clientY <= elementBounds.bottom
    && event.clientY >= elementBounds.top
}

function parseElement (selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  } if (selector instanceof HTMLElement) {
    return selector
  } else {
    throw new TypeError('prefetch was expecting a querySelector string or a HTML Element')
  }
}
