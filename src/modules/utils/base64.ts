/**
 * Encode string or number to base64 string
 * @param word String | Number
 */
export const toBase64 = (word: string | number): string => {
  try {
    // @todo node doesn't like buffer
    return new Buffer(word.toString()).toString("base64");
  } catch (_err) {
    return "";
  }
};

/**
 * Decode base64 string
 * @param base64string String
 */
export const fromBase64 = (base64string: string): string => {
  try {
    return new Buffer(base64string, "base64").toString("ascii");
  } catch (_err) {
    return "";
  }
};
