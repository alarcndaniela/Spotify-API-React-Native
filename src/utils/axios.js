import axios from 'axios';
import { Buffer } from 'buffer';
import base64 from 'react-native-base64';
import constants from './constants';

const base64credentials= base64.encode(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET);

const instance = axios.create({
	baseURL: 'https://accounts.spotify.com/api/token',
	headers: {
      'Authorization': 'Bearer ' + Buffer.from(`${constants.CLIENT_ID}:${constants.CLIENT_SECRET}`).toString('base64'),
		  'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
});

export default instance;