import React, { useState } from "react";
import { Form, Input, Select, Button, message, Card, Modal } from "antd";
import PDFUploader from "../../components/PDFUploader";
import { extractPDFText } from "../../utils/pdfUtils";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const UploadReportForm = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      // Extract PDF text
      const pdfText = await extractPDFText(fileList[0]);

      // Prepare payload
      const payload = {
        ...values,
        pdfText,
      };

      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data?.status === 200) {
        message.success(res.data.message || "Report submitted successfully.");

        // Show modal with AI summary
        setAiSummary(res.data.summery);
        setModalVisible(true);

        setFileList([]);
      } else {
        message.error(res.data?.message || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      message.error("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Upload Report</h1>
        <p>Add new medical reports and documents</p>
      </div>

      <Card className="rounded-xl shadow-sm">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Report Name"
            name="reportName"
            rules={[{ required: true, message: "Please enter report name" }]}
          >
            <Input placeholder="e.g., Blood Test Results" />
          </Form.Item>

          <Form.Item
            label="Report Type"
            name="reportType"
            rules={[{ required: true, message: "Please select report type" }]}
          >
            <Select placeholder="Select report type">
              <Option value="blood-test">Blood Test</Option>
              <Option value="x-ray">X-Ray</Option>
              <Option value="ultrasound">Ultrasound</Option>
              <Option value="prescription">Prescription</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Notes (Optional)" name="notes">
            <TextArea rows={4} placeholder="Any additional notes" />
          </Form.Item>

          <Form.Item label="Upload PDF">
            <PDFUploader fileList={fileList} setFileList={setFileList} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Report
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Ant Design Modal */}
      <Modal
        title="AI Summary"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        width={800}
      >
        <div
          style={{ maxHeight: "60vh", overflowY: "auto" }}
          dangerouslySetInnerHTML={{ __html: aiSummary }}
        />
      </Modal>
    </div>
  );
};

export default UploadReportForm;