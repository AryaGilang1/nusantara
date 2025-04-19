import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { axiosInstance2 } from '../../lib/axios';  // Pastikan axiosInstance2 sudah di-import dengan benar

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const [chartData, setChartData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(Date.now()); // Use state for timestamp to trigger re-fetch

    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        try {
            // Ambil data label dan datasets dari API
            const labelsResponse = await axiosInstance2.get('/items', {
                headers: { 'Cache-Control': 'no-cache' }  // Menambahkan header untuk memastikan data terbaru
            });

            // Format data menjadi satu objek yang konsisten
            const formattedData = {
                labels: labelsResponse.data.map(item => item.name),  // Ambil nama label dari response
                datasets: [{
                    label: '# of Votes',  // Label untuk dataset
                    data: labelsResponse.data.map(item => item.votes),  // Ambil data votes
                    backgroundColor: labelsResponse.data.map(item => item.backgroundColor),  // Ambil warna latar belakang
                    borderColor: labelsResponse.data.map(item => item.borderColor),  // Ambil warna border
                    borderWidth: 1,  // Lebar border
                }],
            };

            setChartData(formattedData);  // Update state chartData dengan data yang telah diformat
        } catch (error) {
            console.error("Error fetching data:", error);  // Tangani error jika request gagal
        }
    };

    useEffect(() => {
        fetchData();  // Panggil fungsi fetchData saat komponen dimounting atau setelah `lastUpdated` berubah
    }, [lastUpdated]);  // Dependency array bergantung pada `lastUpdated`

    // Fungsi untuk melakukan force re-fetch data
    const handleForceUpdate = () => {
        setLastUpdated(Date.now());  // Memperbarui timestamp untuk memicu re-fetch
    };

    if (!chartData) {
        return <div>Loading...</div>;  // Menampilkan loading jika chartData belum ada
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',  // Tempatkan legend di atas
            },
            tooltip: {
                enabled: true,  // Menampilkan tooltip saat hover
            },
        },
    };

    return (
        <div>
            <h2>My Doughnut Chart</h2>
            <button onClick={handleForceUpdate}>Refresh Data</button>  {/* Tombol untuk memaksa refresh data */}
            <Doughnut data={chartData} options={options} />  {/* Render chart */}
        </div>
    );
};

export default DoughnutChart;
