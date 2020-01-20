import Jimp from "jimp";

export const createThumbnail = async (
  filename: string,
  // format = "png",
  size = 256
): Promise<String | Boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const fileUrl = __dirname + `/../../images/${filename}`;
      const outputUrl = __dirname + `/../../images/thumb_${filename}`;
      Jimp.read(fileUrl).then(img => {
        img
          .resize(size, size)
          .quality(60)
          .write(outputUrl);
        resolve(outputUrl);
      });
    } catch (err) {
      console.error("Error while creating Thumbnail", err);
      reject(false);
    }
  });
};
