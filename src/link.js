let Rx = require('rxjs/Rx')

let mousedowns = Rx.Observable.fromEvent(document, 'mousedown')
  , mousemoves = Rx.Observable.fromEvent(document, 'mousemove')
  , mouseups = Rx.Observable.fromEvent(document, 'mouseup')

let mousedrags = mousedowns.flatMap(x => mousemoves.map(y => ({
  left: x.clientX,
  top: x.clientY,
  width: y.clientX - x.clientX,
  height: y.clientY - x.clientY
})).takeUntil(mouseups))

// create and append rectangle
mousedowns.subscribe(_ => {
  let el = document.createElement('div')
  el.id = "rect"
  el.style.position = "absolute"
  el.style.border = "1px dotted lightblue"
  el.style.zIndex = "9999"
  document.body.appendChild(el)
})

// move rectangle
mousedrags.subscribe(e => {
  let el = document.querySelector("#rect")
  el.style.left = e.left + "px"
  el.style.top = e.top + "px"
  el.style.width = e.width + "px"
  el.style.height = e.height + "px"
})

let overlaps = (el1, el2) => {
  let rect1 = el1.getBoundingClientRect()
    , rect2 = el2.getBoundingClientRect()
    , left = Math.max(rect1.left, rect2.left)
    , right = Math.min(rect1.right, rect2.right)
    , top = Math.max(rect1.top, rect2.top)
    , bottom = Math.min(rect1.bottom, rect2.bottom)

    return left < right && top < bottom
}

// remove rectangle
mouseups.subscribe(_ => {
  let el = document.querySelector("#rect")
  if (!el) return

  let as = [...document.querySelectorAll('a')]
    .filter(a => overlaps(el, a))
    .map(a => window.open(a))
    .map(a => console.log(a))

  el.remove()
})

console.log("loaded");
