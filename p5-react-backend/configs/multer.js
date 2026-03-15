import multer from "multer";

const storage = multer.diskStorage(
    {
    destination: (req, file, callback)=>{
        console.log("eow")
        callback(null, "uploads/") 
    },
    filename: (req, file, callback) => {
        const preFix = Date.now()
    
        callback(null, `${preFix} - ${file.originalname}`)
    }
    }
);

const upload = multer({storage});

export default upload;