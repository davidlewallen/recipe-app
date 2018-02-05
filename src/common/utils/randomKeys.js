// @flow
import uuid from 'uuid/v5';

const NAMESPACE = 'f829e458-5757-54ac-b4b7-598f44c2c9b5';

const genKey = (value: String): String => uuid(value.toString(), NAMESPACE);

export default genKey;
