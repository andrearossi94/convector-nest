// Warn if changes model, change views to ex
// "map": "function(doc) {if (doc.type.toUpperCase() === 'io.worldsibu.examples.person'...

// convector model
const CONVECTOR_MODEL_PATH_PREFIX: string = 'io.worldsibu.examples';
const CONVECTOR_MODEL_PATH_PARTICIPANT: string = `${CONVECTOR_MODEL_PATH_PREFIX}.participant`;
const CONVECTOR_MODEL_PATH_PERSON: string = `${CONVECTOR_MODEL_PATH_PREFIX}.person`;
const CONVECTOR_MODEL_PATH_ATTRIBUTE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.attribute`;
const CONVECTOR_MODEL_PATH_X509IDENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.x509identity`;

export const appConstants = {
	CONVECTOR_MODEL_PATH_PARTICIPANT,
	CONVECTOR_MODEL_PATH_PERSON,
	CONVECTOR_MODEL_PATH_ATTRIBUTE,
	CONVECTOR_MODEL_PATH_X509IDENTITY,
};
