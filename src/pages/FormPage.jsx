import React, { useState, useEffect } from 'react';
import { axiosInstance2 } from '../lib/axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const FormPage = () => {
    const [items, setItems] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [newVotes, setNewVotes] = useState("");
    const [labelColor, setLabelColor] = useState("#FF6384");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance2.get('/items');
                // Ensure response.data.items is an array
                setItems(Array.isArray(response.data.items) ? response.data.items : []);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleAddLabel = async () => {
        if (!newLabel.trim()) {
            setError("Label name cannot be empty.");
            return;
        }

        if (newVotes <= 0) {
            setError("Votes must be greater than 0.");
            return;
        }

        const newItem = {
            id: items.length + 1,
            name: newLabel,
            votes: newVotes,
            backgroundColor: labelColor,
            borderColor: labelColor
        };

        setLoading(true);

        try {
            await axiosInstance2.post('/items', newItem);
            setItems(prev => [...prev, newItem]);

            setNewLabel("");
            setNewVotes("");
            setLabelColor("#FF6384");
            setError("");

            navigate('/chart');
        } catch (error) {
            setError("Error adding label");
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: items.map(item => item.name),
        datasets: [
            {
                label: '# of Votes',
                data: items.map(item => item.votes),
                backgroundColor: items.map(item => item.backgroundColor),
                borderColor: items.map(item => item.borderColor),
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Form Data Manager</h2>

            {loading && <div className="text-center text-blue-500 mb-4">Loading...</div>}
            {error && <div className="text-center text-red-500 mb-4">{error}</div>}

            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Add Label and Votes</h3>
                <div className="mt-6 flex items-center space-x-3">
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Enter new label"
                        className="border-2 border-gray-300 p-2 rounded-md w-2/3"
                    />
                    <input
                        type="number"
                        value={newVotes}
                        onChange={(e) => setNewVotes(Number(e.target.value))}
                        placeholder="Enter votes"
                        className="border-2 border-gray-300 p-2 rounded-md w-1/4"
                    />
                    <input
                        type="color"
                        value={labelColor}
                        onChange={(e) => setLabelColor(e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md"
                    />
                    <button
                        onClick={handleAddLabel}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Add Label
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Data Table</h3>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Label Name</th>
                            <th className="px-4 py-2 text-left">Votes</th>
                            <th className="px-4 py-2 text-left">Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.votes}</td>
                                <td className="px-4 py-2">
                                    <div
                                        style={{
                                            backgroundColor: item.backgroundColor,
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Chart View</h3>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default FormPage;
