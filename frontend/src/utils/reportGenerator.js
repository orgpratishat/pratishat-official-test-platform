// src/utils/reportGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Generates and triggers download of a PDF report from test result data
export function downloadReportPDF(report) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('NEET Test Result Report', 14, 22);

  doc.setFontSize(12);
  doc.text(`Test Name: ${report.test.name}`, 14, 32);
  doc.text(`Score: ${report.score.obtainedMarks} / ${report.score.totalMarks}`, 14, 40);
  doc.text(`Accuracy: ${report.score.accuracy.toFixed(2)}%`, 14, 48);
  doc.text(`Total Time Spent: ${Math.floor(report.totalTimeSpent / 60)} minutes`, 14, 56);

  // Add more sections as needed, e.g., Subject-wise accuracy, weak topics, etc.

  doc.save(`NEET_Test_Result_${report._id}.pdf`);
}
