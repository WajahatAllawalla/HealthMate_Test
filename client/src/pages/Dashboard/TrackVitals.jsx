import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { HeartOutlined, FireOutlined, DownOutlined, DashboardOutlined } from "@ant-design/icons";

const TrackVitals = () => {
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");

  const handleSave = () => {
    // yaha API call ya form submission handle kar sakte ho
    console.log({ bloodPressure, heartRate, temperature, oxygenSaturation });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Vitals</h1>
      <p className="text-gray-500 mb-6">Record your daily health measurements</p>

      <Card className="rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
          <DashboardOutlined className="text-green-500" />
          Track Vital Signs
        </h2>
        <p className="text-sm text-gray-500 mb-4">Record your daily health measurements</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Blood Pressure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <HeartOutlined className="text-blue-500" />
              Blood Pressure
            </label>
            <Input
              placeholder="e.g., 120/80"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="rounded-md"
            />
          </div>

          {/* Heart Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FireOutlined className="text-red-500" />
              Heart Rate (bpm)
            </label>
            <Input
              placeholder="e.g., 72"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="rounded-md"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FireOutlined className="text-red-500" />
              Temperature (°F)
            </label>
            <Input
              placeholder="e.g., 98.6"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="rounded-md"
            />
          </div>

          {/* Oxygen Saturation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <DownOutlined className="text-teal-400" />
              Oxygen Saturation (%)
            </label>
            <Input
              placeholder="e.g., 98"
              value={oxygenSaturation}
              onChange={(e) => setOxygenSaturation(e.target.value)}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button type="primary" className="w-full" onClick={handleSave}>
            Save Vitals
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TrackVitals;