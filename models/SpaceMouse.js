const mongoose = require('mongoose');

const SpaceMouseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['checked_in', 'checked_out'], default: 'checked_in' },
    lastCheckedOutDate: { type: Date },
    qrCodePath: { type: String }, // Path to the QR code image

    // New fields to store form data during check-out
    checkedOutBy: { type: String },    // Name of the person checking out the space mouse
    phoneNumber: { type: String },     // Phone number of the person checking out
    duration: { type: String },        // Duration for which the space mouse is checked out
    email: { type: String },           // Email of the person checking out

    // New field for image texture
    Color: { type: String },         // Path to the image texture
});

module.exports = mongoose.model('SpaceMouse', SpaceMouseSchema);
