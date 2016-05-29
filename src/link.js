let Rx = require('rxjs/Rx');

let mousedowns = Rx.Observable.fromEvent(document, 'mousedown')
  , mousemoves = Rx.Observable.fromEvent(document, 'mousemove')
  , mouseups = Rx.Observable.fromEvent(document, 'mouseup')

let mousedrags = mousedowns.flatMap(x => mousemoves.map(y => ({
  left: x.clientX,
  top: x.clientY,
  right: y.clientX,
  bottom: y.clientY
})).takeUntil(mouseups));

mousedrags.subscribe(x => console.log('mousedrags' + x))

console.log("loaded");
