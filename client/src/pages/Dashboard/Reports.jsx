import React from "react";
import { Layout, Menu, Button, Tag } from "antd";
import {
  FileTextOutlined,
  DashboardOutlined,
  UploadOutlined,
  HeartOutlined,
  SettingOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function Reports() {
  const reports = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "2025-10-15",
      size: "2.4 MB",
      category: "Lab Report",
    },
    {
      id: 2,
      title: "X-Ray Chest",
      date: "2025-10-10",
      size: "5.1 MB",
      category: "Imaging",
    },
    {
      id: 3,
      title: "ECG Report",
      date: "2025-10-05",
      size: "1.2 MB",
      category: "Cardiology",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold ">My Reports</h2>
          <p className="text-sm ">
            Access and manage your medical documents
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                <FileTextOutlined />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {report.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {report.date} • {report.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tag
                color="green"
                className="text-xs font-medium px-3 py-1 rounded-full"
              >
                {report.category}
              </Tag>
              <Button
                icon={<DownloadOutlined />}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                type="default"
              >
                Download
              </Button>
              <Button
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                type="default"
              >
                View
              </Button>
              <Button danger type="text" icon={<DeleteOutlined />} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Reports;