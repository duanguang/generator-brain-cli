import React from 'react';
import create from 'middle-core';
import App from "./containers/App";

const app = create();
app.start(App, '#app');