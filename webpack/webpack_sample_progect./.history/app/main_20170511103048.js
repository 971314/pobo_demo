// var greeter = require('./Greeter.js');
// document.getElementById('root').appendChild(greeter());


import React from 'react';
import {render} from 'react-dom';
import Greets from './Greeter';

render (<Greets/>,document.getElementById('root'));
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));