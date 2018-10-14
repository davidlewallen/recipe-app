import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });
