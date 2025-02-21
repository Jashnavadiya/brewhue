const storageHelper = require("./../utils/storageHelper");

const storageHelperInstance = new storageHelper();

const sharp = require('sharp'); // Import sharp for image manipulation

exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file)
            return res.status(400).json({
                success: false,
                status: "fail",
                message: "No files found.",
                data: null,
            });

        const UserPanel = req.db.model('UserPanel');
        const shopName = req.params.shopName;
        const { section, key } = req.body;

        // Check file type (image or PDF)
        const isImage = req.file.mimetype.startsWith('image/');
        const isPDF = req.file.mimetype === 'application/pdf';

        let file;

        if (isImage) {
            // Process image to WebP format using sharp
            const webpBuffer = await sharp(req.file.buffer)
                .webp() // Convert to WebP format
                .toBuffer(); // Return the buffer

            // Upload the processed WebP image
            file = await storageHelperInstance.uploadFile({
                buffer: webpBuffer,
                originalname: req.file.originalname.replace(/\.[^/.]+$/, '.webp'), // Update extension to .webp
                mimetype: 'image/webp',
            }, shopName);

        } else if (isPDF) {
            // For PDF, no conversion needed, just upload as is
            file = await storageHelperInstance.uploadFile(req.file, shopName);
        } else {
            return res.status(400).json({
                success: false,
                status: "fail",
                message: "Unsupported file type.",
                data: null,
            });
        }

        console.log("File uploaded:", file);

        const fieldType = UserPanel.schema.path(`${section}.${key}`).instance;
        console.log("Field type:", fieldType);

        let updateObject;
        if (fieldType === 'Array') {
            updateObject = {
                $push: {
                    [`${section}.${key}`]: { img: file.url }, // Use 'file' for both image and PDF
                },
            };
        } else if (fieldType === 'String') {
            updateObject = {
                [`${section}.${key}`]: file.url,
            };
        } else {
            throw new Error('Unsupported field type');
        }
        
        console.log("Updating user panel...");
        const updatedUserPanel = await UserPanel.findOneAndUpdate({}, updateObject, { new: true });

        return res.status(201).json({
            success: true,
            message: "File was uploaded successfully.",
            data: {
                ...file,
                type: req.file.mimetype,
            },
            updatedUserPanel,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: "error",
            error,
            message: "An error occurred during file upload.",
            data: null,
        });
    }
};



exports.deleteFile = async (req, res, next) => {
    try {
        const { filePath } = req.query;
        await storageHelperInstance.deleteFile(filePath);
        return res.status(201).json({
            success: true,
            message: "File was deleted.",
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: "error",
            error,
            message: "No files found.",
            data: null,
        });
    }
};
