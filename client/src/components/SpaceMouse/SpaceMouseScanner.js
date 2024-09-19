import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackgroundObject from './BackgroundObject';

const SpaceMouseForm = () => {
    const { id } = useParams();
    const [spaceMouse, setSpaceMouse] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the visibility of the form
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        duration: ''
    });

    useEffect(() => {
        // Fetch the space mouse details using the ID from the URL
        const fetchSpaceMouse = async () => {
            try {
                const response = await fetch(`/api/space-mouses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setSpaceMouse(data);
                } else {
                    setStatusMessage('Space mouse not found.');
                }
            } catch (error) {
                console.error('Error fetching space mouse:', error);
                setStatusMessage('Error fetching space mouse.');
            }
        };

        fetchSpaceMouse();
    }, [id]);

    const handleCheckInOut = async (action) => {
        // If checking out, ensure the modal data is validated
        if (action === 'check-out' && (!formData.name || !formData.number || !formData.duration)) {
            setStatusMessage('Please fill out all the fields.');
            return;
        }

        try {
            const response = await fetch(`/api/space-mouses/${id}/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: action === 'check-out' ? JSON.stringify(formData) : null,
            });

            if (response.ok) {
                const result = await response.json();
                setStatusMessage(`Space mouse ${result.status} successfully!`);
                // Update the space mouse status locally
                setSpaceMouse((prev) => ({ ...prev, status: result.status }));
                // Reset form data if checking out
                if (action === 'check-out') {
                    setFormData({ name: '', number: '', duration: '' });
                    setIsFormVisible(false); // Hide form after successful checkout
                }
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setStatusMessage(errorData.message || 'Failed to check in/out the space mouse.');
            }
        } catch (error) {
            console.error('Error checking in/out space mouse:', error);
            setStatusMessage('Error occurred during the check-in/out process.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (!spaceMouse) return <p className="text-center text-red-500">{statusMessage}</p>;

    return (
        <div className="relative min-h-screen ">
            <BackgroundObject />
            <h1 className='w-full text-7xl text-center font-bold text-white'>Space Mouse</h1>
            {/* Form Container */}
            <div className="absolute bottom-10 left-0 right-0 p-4">
                <div className="relative mx-auto max-w-xl bg-gray-800 bg-opacity-80 rounded-t-lg p-6 shadow-lg backdrop-blur-lg border-t-4 border-cyan-500">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-2 text-center tracking-wider">{spaceMouse.name}</h2>
                    <p className="text-gray-300 text-center mb-4 text-lg">Status: <span className="font-semibold">{spaceMouse.status}</span></p>

                    {/* Check Out Button */}
                    {!isFormVisible && spaceMouse.status === 'checked_in' && (
                        <div className="flex justify-center mb-4 transition-transform duration-700 ease-in-out transform">
                            <button 
                                onClick={() => setIsFormVisible(true)} 
                                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 glow-red"
                            >
                                Check Out
                            </button>
                        </div>
                    )}

                    {/* Check In Button */}
                    {!isFormVisible && spaceMouse.status === 'checked_out' && (
                        <div className="flex justify-center mb-4 transition-transform duration-700 ease-in-out transform">
                            <button 
                                onClick={() => handleCheckInOut('check-in')} 
                                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 glow-green"
                            >
                                Check In
                            </button>
                        </div>
                    )}

                    {/* Checkout Form (Animated Slide Up) */}
                    <div className={`transition-all duration-700 ease-in-out transform ${isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        {isFormVisible && (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1 text-white">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-white">Your Number</label>
                                    <input 
                                        type="text" 
                                        name="number" 
                                        value={formData.number} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-white">Duration (in hours)</label>
                                    <input 
                                        type="text" 
                                        name="duration" 
                                        value={formData.duration} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 rounded-lg text-black"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={() => setIsFormVisible(false)} 
                                        className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => handleCheckInOut('check-out')} 
                                        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {statusMessage && <p className="text-center text-cyan-300 mt-4">{statusMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default SpaceMouseForm;
