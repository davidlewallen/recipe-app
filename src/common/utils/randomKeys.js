import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

const NAMESPACE = 'f829e458-5757-54ac-b4b7-598f44c2c9b5';

export const randomKey = () => uuidv4();

const genKey = value => uuidv5(value.toString(), NAMESPACE);

export default genKey;
