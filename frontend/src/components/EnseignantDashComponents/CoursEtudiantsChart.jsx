import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CoursEtudiantsChart = ({ data }) => {
  return (
    <div className="mt-5 bg-base-100 p-6 rounded-lg shadow ">
      <h3 className="text-lg font-semibold mb-4 text-gray-400">Étudiants par cours</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="titre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nombreEtudiants" fill="#4ade80" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursEtudiantsChart;
