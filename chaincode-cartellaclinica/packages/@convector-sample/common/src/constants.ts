// Warn if changes model names, don't forget to change views ex
// "map": "function(doc) {if (doc.type.toUpperCase() === 'io.worldsibu.examples.person'...

// convector model
const CONVECTOR_MODEL_PATH_PREFIX: string = 'io.worldsibu.examples';
const CONVECTOR_MODEL_PATH_PERSONALE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.personale`;
const CONVECTOR_MODEL_PATH_CARTELLACLINICA: string = `${CONVECTOR_MODEL_PATH_PREFIX}.cartellaclinica`;
const CONVECTOR_MODEL_PATH_ATTRIBUTE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.attribute`;
const CONVECTOR_MODEL_PATH_X509IDENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.x509identity`;

export const appConstants = {
	CONVECTOR_MODEL_PATH_PERSONALE,
	CONVECTOR_MODEL_PATH_CARTELLACLINICA,
	CONVECTOR_MODEL_PATH_ATTRIBUTE,
	CONVECTOR_MODEL_PATH_X509IDENTITY,
};
