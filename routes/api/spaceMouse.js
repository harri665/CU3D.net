const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas'); // Import canvas
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

        // Create a canvas to draw the QR code and logo
        const canvas = createCanvas(300, 300); // Create a canvas with the desired size
        const ctx = canvas.getContext('2d');

        // Generate QR code and draw it on the canvas
        await QRCode.toCanvas(canvas, `http://yourwebsite.com/space-mouse/${id}`, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        // Load the logo image
        const logoPath = path.join(__dirname, '../../client/public/logo.png'); // Path to your logo
        const logo = await loadImage(logoPath);

        // Calculate the position to place the logo
        const logoSize = 60; // Size of the logo
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;

        // Draw the logo on the canvas
        ctx.drawImage(logo, x, y, logoSize, logoSize);

        // Save the canvas to a file
        const out = fs.createWriteStream(qrCodeFilePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('QR code with logo created successfully'));

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

// Check in a space mouse
router.post('/:id/check-in', async (req, res) => {
    try {
        const spaceMouse = await SpaceMouse.findOne({ id: req.params.id });
        if (!spaceMouse) {
            return res.status(404).json({ message: 'Space mouse not found' });
        }
        if (spaceMouse.status === 'checked_in') {
            return res.status(400).json({ message: 'Space mouse already checked in' });
        }

        // Reset check-out-related fields
        spaceMouse.status = 'checked_in';
        spaceMouse.checkedOutBy = null;
        spaceMouse.phoneNumber = null;
        spaceMouse.duration = null;
        spaceMouse.lastCheckedOutDate = null;

        await spaceMouse.save();
        res.json({ status: 'checked in', spaceMouse });
    } catch (error) {
        console.error('Error checking in space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Check out a space mouse
router.post('/:id/check-out', async (req, res) => {
    const { name, phoneNumber, duration } = req.body; // Extract the form data

    try {
        const spaceMouse = await SpaceMouse.findOne({ id: req.params.id });
        if (!spaceMouse) {
            return res.status(404).json({ message: 'Space mouse not found' });
        }
        if (spaceMouse.status === 'checked_out') {
            return res.status(400).json({ message: 'Space mouse already checked out' });
        }

        // Update the space mouse with the check-out information
        spaceMouse.status = 'checked_out';
        spaceMouse.lastCheckedOutDate = new Date();
        spaceMouse.checkedOutBy = name;
        spaceMouse.phoneNumber = phoneNumber;
        spaceMouse.duration = duration;

        await spaceMouse.save();
        res.json({ status: 'checked out', spaceMouse });
    } catch (error) {
        console.error('Error checking out space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an existing space mouse
router.put('/:id', async (req, res) => {
    const { name, status } = req.body;

    try {
        const updatedSpaceMouse = await SpaceMouse.findOneAndUpdate(
            { id: req.params.id }, // Using custom 'id' field
            { name, status },
            { new: true }  // Return the updated document
        );
        if (!updatedSpaceMouse) {
            return res.status(404).json({ message: 'Space mouse not found' });
        }
        res.json(updatedSpaceMouse);
    } catch (error) {
        console.error('Error updating space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove a space mouse
router.delete('/:id', async (req, res) => {
    try {
        const deletedSpaceMouse = await SpaceMouse.findOneAndDelete({ id: req.params.id });
        if (!deletedSpaceMouse) {
            return res.status(404).json({ message: 'Space mouse not found' });
        }
        res.json({ message: 'Space mouse deleted' });
    } catch (error) {
        console.error('Error deleting space mouse:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
