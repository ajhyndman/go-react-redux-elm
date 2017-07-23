// @flow
import WebSocket from 'ws';

// Persist event log
class Log {
  log = [];
  subscribers = [];

  push = event => {
    this.log = this.log.concat([event]);
    this.subscribers.forEach(subscriber => {
      subscriber(event);
    });
  };

  subscribe = subscriber => {
    if (this.log.length > 0) {
      this.log.forEach(subscriber);
    }
    this.subscribers.push(subscriber);
  };

  getLog = () => this.log;
}

const actions = new Log();

// Launch WebServer
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    actions.push(message);
    console.log('action:', message);
    console.log('action log:', actions.getLog());
  });

  actions.subscribe(event => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(event);
    }
  });
});
