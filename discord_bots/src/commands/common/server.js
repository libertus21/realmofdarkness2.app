"use strict";
// thin wrapper so legacy bots that require JS can still load the TypeScript version
module.exports = require("./server.ts").default || require("./server.ts");