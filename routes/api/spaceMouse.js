const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const SpaceMouse = require('../../models/SpaceMouse');

// Get all space mouses
router.get('/', async (req, res) => {
    try {
        const spaceMouses = await SpaceMouse.find();
        res.json(spaceMouses);
    } catch (error) {
        console.error('Error fetching space mouses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get space mouse details by ID
router.get('/:id', async (req, res) => {
    try {
        const spaceMouse = await SpaceMouse.findOne({ id: req.params.id }); // Using custom 'id' field
        if (!spaceMouse) {
            return res.status(404).json({ message: 'Space mouse not found' });
        }
        res.json(spaceMouse);
    } catch (error) {
        console.error('Error fetching space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new space mouse
router.post('/', async (req, res) => {
    const { name, status } = req.body;

    try {
        // Generate a new random ID
        const id = uuidv4();
        
        // Define the directory and file path for the QR code
        const qrCodeDir = path.join(__dirname, '../../client/public/qrcodes');
        const qrCodeFilePath = path.join(qrCodeDir, `${id}.png`);
        const qrCodePath = `/qrcodes/${id}.png`; // Path to be saved in the database

        // Ensure the directory exists
        if (!fs.existsSync(qrCodeDir)) {
            fs.mkdirSync(qrCodeDir, { recursive: true });
        }

        // Generate QR code and save it as a PNG buffer
        const qrCodeBuffer = await QRCode.toBuffer(`http://yourwebsite.com/space-mouse/${id}`, {
            width: 300, // Adjust size of the QR code
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        // Load and resize the logo to ensure it's smaller than the QR code
        const logoPath = path.join(__dirname, '../../client/public/logo.png');
        const logoBuffer = await sharp(logoPath)
            .resize(60, 60) // Resize logo to fit within the QR code
            .toBuffer();

        // Combine the QR code and logo using sharp
        const combinedImageBuffer = await sharp(qrCodeBuffer)
            .composite([{
                input: logoBuffer,
                gravity: 'center',  // Place the logo in the center of the QR code
            }])
            .toBuffer();

        // Save the combined image (QR code + logo)
        fs.writeFileSync(qrCodeFilePath, combinedImageBuffer);

        // Create and save the new space mouse to the database, including the QR code path
        const newSpaceMouse = new SpaceMouse({ id, name, status, qrCodePath });
        await newSpaceMouse.save();

        // Include the QR code path in the response
        res.status(201).json(newSpaceMouse);
    } catch (error) {
        console.error('Error adding space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Other routes like check-in, check-out, update, delete, etc...

module.exports = router;
