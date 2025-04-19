import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { axiosInstance2 } from '../../lib/axios'; // Pastikan axiosInstance2 sudah di-import
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Mengambil data dari API menggunakan axiosInstance2
        const fetchData = async () => {
            try {
                const response = await axiosInstance2.get('/items');  // Mengambil data dari satu endpoint '/items'

                // Memproses data yang diterima agar cocok dengan format chart.js
                const labelsData = response.data.map(item => item.name);  // Mengambil nama label
                const votesData = response.data.map(item => item.votes);  // Mengambil data votes
                const backgroundColors = response.data.map(item => item.backgroundColor);  // Warna untuk masing-masing bar
                const borderColors = response.data.map(item => item.borderColor);  // Warna border

                // Format data untuk chart
                const formattedData = {
                    labels: labelsData,  // Array of label names
                    datasets: [
                        {
                            label: '# of Votes',  // Nama dataset
                            data: votesData,  // Array of vote counts
                            backgroundColor: backgroundColors,  // Warna latar belakang untuk bar
                            borderColor: borderColors,  // Warna border
                            borderWidth: 1,  // Border width
                        },
                    ],
                };

                setChartData(formattedData);  // Mengupdate state dengan data yang sudah diformat
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);  // Dependency array kosong, sehingga hanya dipanggil sekali ketika komponen mount

    if (!chartData) {
        return <div>Loading...</div>;  // Tampilkan loading jika data belum tersedia
    }

    const options = {
        indexAxis: 'x', // default 'x' = vertical bar chart
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Contoh Vertical Bar Chart',
            },
        },
    };

    return (
        <div className="w-1/2 h-1/2">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default VerticalBarChart;
