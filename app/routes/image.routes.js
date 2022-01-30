module.exports = (app) => {
    const multer = require("multer");
    
    // Use Multer
    var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './resources/uploads')
        },
        filename: (res, file, callBack) => {
            callBack(null, file.fieldname + '_' + file.originalname)
        }
    });
    
    var upload = multer({
        storage: storage
    });
    

    app.post("/upload", upload.single('images'), (req,res) => {
        if(!req.file){
            console.log("No file upload");
        } else {
            console.log(req.file.filename)
            res.status(200).send({
                message: "success",
                info : req.file.filename
            })
        }
    });

    app.delete("/delete/:imageName", (req, res) => {
    
        if (!req.params) {
          return res.status(500).json({
            msg: "params undefined",
          });
        } else {
          const fileExist = fs.existsSync(`resources/uploads/${req.params.imageName}`);
          if (fileExist) {
            fs.unlinkSync(`resources/uploads/${req.params.imageName}`);
            // return res.status(200).json({
            //   fileExist,
            // });
            res.status(200).send({ msg: "file dihapus" });
          } else {
            res.status(404).json({ msg: "file doesnt exist" });
            // res.status(404).send(fileExist);
          }
        }
      });
}