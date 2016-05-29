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

// remove rectangle
mouseups.subscribe(_ => {
  let el = document.querySelector("#rect")
  if (!el) return

  el.remove()
})

console.log("loaded");
