// EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。
// 当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function(){
	console.log('some_event 事件触发');
});
setTimeout(() => {
  event.emit('some_event');
}, 1000);