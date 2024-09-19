import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SpaceMouseManager = () => {
    const [spaceMouses, setSpaceMouses] = useState([]);
    const [newMouseName, setNewMouseName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [selectedMouse, setSelectedMouse] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSpaceMouses();
    }, []);

    const fetchSpaceMouses = async () => {
        try {
            const response = await fetch('/api/space-mouses');
            if (response.ok) {
                const data = await response.json();
                setSpaceMouses(data);
            } else {
                setStatusMessage('Failed to load space mouses.');
            }
        } catch (error) {
            console.error('Error fetching space mouses:', error);
            setStatusMessage('Error fetching space mouses.');
        }
    };

    const handleAddSpaceMouse = async () => {
        try {
            const response = await fetch('/api/space-mouses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newMouseName, status: 'checked_in' }),
            });

            if (response.ok) {
                const newMouse = await response.json();
                setSpaceMouses([...spaceMouses, newMouse]);
                setNewMouseName('');
                setStatusMessage('Space mouse added successfully.');
            } else {
                const errorData = await response.json();
                console.error('Failed to add space mouse:', errorData);
                setStatusMessage(`Failed to add space mouse: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding space mouse:', error);
            setStatusMessage('Error adding space mouse.');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/space-mouses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setSpaceMouses((prev) =>
                    prev.map((mouse) =>
                        mouse.id === id ? { ...mouse, status: newStatus } : mouse
                    )
                );
                setStatusMessage('Status updated successfully.');
            } else {
                setStatusMessage('Failed to update status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setStatusMessage('Error updating status.');
        }
    };

    const handleShowModal = (mouse) => {
        setSelectedMouse(mouse);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMouse(null);
        setShowModal(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Space Mouse Manager</h2>
            {statusMessage && <p className="text-red-500">{statusMessage}</p>}

            {/* Add New Space Mouse */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Add New Space Mouse</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={newMouseName}
                        onChange={(e) => setNewMouseName(e.target.value)}
                        placeholder="Space Mouse Name"
                        className="border p-2 rounded-md w-full"
                    />
                    <button
                        onClick={handleAddSpaceMouse}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Add Space Mouse
                    </button>
                </div>
            </div>

            {/* List of Space Mouses */}
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2">QR Code</th>
                        <th className="px-4 py-2">Link</th>
                        <th className="px-4 py-2">Checked Out Info</th>
                    </tr>
                </thead>
                <tbody>
                    {spaceMouses.map((mouse) => (
                        <tr key={mouse.id} className="border-t">
                            <td className="px-4 py-2">
                                <Link
                                    to={`/space-mouse/${mouse.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {mouse.name}
                                </Link>
                            </td>
                            <td className="px-4 py-2">
                                <select
                                    value={mouse.status}
                                    onChange={(e) => handleStatusChange(mouse.id, e.target.value)}
                                    className="border p-2 rounded-md"
                                >
                                    <option value="checked_in">Checked In</option>
                                    <option value="checked_out">Checked Out</option>
                                </select>
                            </td>
                            <td className="px-4 py-2">
                                {mouse.qrCodePath && (
                                    <img
                                        src={mouse.qrCodePath}
                                        alt={`QR code for ${mouse.name}`}
                                        className="w-16 h-16"
                                    />
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {mouse.id && (
                                    <a
                                        className="text-blue-600 hover:underline"
                                        href={`http://localhost:3000/space-mouse/${mouse.id}`}
                                    >
                                        {mouse.name}
                                    </a>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleShowModal(mouse)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    View Info
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for showing who checked out the space mouse */}
            {showModal && selectedMouse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            {selectedMouse.name} Checkout Information
                        </h3>
                        <p>Status: {selectedMouse.status}</p>
                        <p>Checked Out By: {selectedMouse.checkedOutBy || 'N/A'}</p>
                        <p>
                            Last Checked Out Date: {selectedMouse.checkedOutDate || 'N/A'}
                        </p>
                        <p>
                            Last Checked Out Time: {selectedMouse.checkedOutTime || 'N/A'}
                        </p>
                        <p>Contact: {selectedMouse.checkedOutByContact || 'N/A'}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpaceMouseManager;
