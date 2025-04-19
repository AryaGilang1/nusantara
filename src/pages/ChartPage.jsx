import React, { useEffect, useState } from 'react';
import DoughnutChart from '../components/bar/DoughnutChart';
import VerticalBarChart from '../components/bar/VeritcalBar';
import { axiosInstance2 } from '../lib/axios';

const ChartPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    // Ambil data dari endpoint /items
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance2.get('/items', {
                headers: { 'Cache-Control': 'no-cache' }
            });
            setItems(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [lastUpdated]);

    const handleDelete = async (id) => {
        try {
            await axiosInstance2.delete(`/items/${id}`);
            setLastUpdated(Date.now()); // Trigger re-fetch
        } catch (err) {
            console.error("Delete error:", err);
            alert("Gagal menghapus data");
        }
    };

    return (
        <div className='p-6 w-full min-h-screen bg-gray-100 space-y-10'>
            <h2 className='text-3xl font-bold text-center'>Chart & Tabel Data</h2>

            <div className='flex flex-col md:flex-row justify-evenly items-center gap-6'>
                <DoughnutChart />
                <VerticalBarChart />
            </div>

            <div>
                <h3 className='text-2xl font-semibold mb-4'>Tabel Data</h3>

                {loading && <p className='text-blue-500'>Loading data...</p>}
                {error && <p className='text-red-500'>{error}</p>}

                <table className="min-w-full bg-white shadow border rounded-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Votes</th>
                            <th className="px-4 py-2 text-left">Color</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.votes}</td>
                                    <td className="px-4 py-2">
                                        <div
                                            style={{
                                                backgroundColor: item.backgroundColor,
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                border: '1px solid #ccc',
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">Tidak ada data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChartPage;
