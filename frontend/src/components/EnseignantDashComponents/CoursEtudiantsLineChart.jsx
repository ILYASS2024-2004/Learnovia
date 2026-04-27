// CoursEtudiantsLineChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 🔁 Fonction pour transformer les dates
const prepareDataByDate = (cours) => {
  const dateMap = {};

  cours.forEach(c => {
    c.etudiants?.forEach(e => {
      const date = new Date(e.date_inscription).toISOString().split('T')[0];
      if (!dateMap[date]) dateMap[date] = 0;
      dateMap[date]++;
    });
  });

  const result = Object.entries(dateMap).map(([date, count]) => ({ date, count }));
  result.sort((a, b) => new Date(a.date) - new Date(b.date));
  return result;
};

const CoursEtudiantsLineChart = ({ cours }) => {
  const data = prepareDataByDate(cours);

  return (
    <div className="mt-5 p-1 sm:p-4 bg-base-100 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-400">Evolution des Inscriptions</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursEtudiantsLineChart;
