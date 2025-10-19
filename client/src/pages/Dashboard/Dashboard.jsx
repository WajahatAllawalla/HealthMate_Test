import React from "react";
import { Card, Row, Col, Button } from "antd";
import {
  FileTextOutlined,
  HeartOutlined,
  RobotOutlined,
  LineChartOutlined,
  UploadOutlined,
  FolderOpenOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-500">Overview of your health data</p>
      </div>

      {/* Top Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Health Records</span>
              <FileTextOutlined className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">12</h2>
            <p className="text-sm text-gray-500">Recent reports</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Vital Signs</span>
              <HeartOutlined className="text-green-500 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Normal</h2>
            <p className="text-sm text-gray-500">All within range</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">AI Insights</span>
              <RobotOutlined className="text-teal-500 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-teal-600">3</h2>
            <p className="text-sm text-gray-500">New recommendations</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Activity</span>
              <LineChartOutlined className="text-blue-500 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600">Active</h2>
            <p className="text-sm text-gray-500">Last updated today</p>
          </Card>
        </Col>
      </Row>

      {/* Bottom Action Cards */}
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24} md={8}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition text-center">
            <UploadOutlined className="text-blue-600 text-2xl mb-2" />
            <h3 className="text-lg font-semibold mb-1">Upload Report</h3>
            <p className="text-gray-500 text-sm mb-4">
              Add new medical reports or test results
            </p>
            <Link to="/upload">
              <Button
                type="primary"
                block
                className="bg-blue-600 hover:bg-blue-700"
              >
                Upload Now
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition text-center">
            <FolderOpenOutlined className="text-blue-600 text-2xl mb-2" />
            <h3 className="text-lg font-semibold mb-1">View Reports</h3>
            <p className="text-gray-500 text-sm mb-4">
              Access all your medical documents
            </p>
            <Link to="/reports">
              <Button block className="border-blue-600 text-blue-600">
                View All
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition text-center">
            <AreaChartOutlined className="text-blue-600 text-2xl mb-2" />
            <h3 className="text-lg font-semibold mb-1">Track Vitals</h3>
            <p className="text-gray-500 text-sm mb-4">
              Record your daily health measurements
            </p>
            <Link to="/vitals">
              <Button block className="border-blue-600 text-blue-600">
                Track Now
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;