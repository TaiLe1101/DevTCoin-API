import multer from "multer";

const createStore = () => {
  return multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
};

export const multerMiddleware = {
  up() {
    return multer({ storage: createStore() });
  },
};
