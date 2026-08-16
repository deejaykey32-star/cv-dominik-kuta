import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function PDFDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    const cvElement = document.getElementById('cv-content');
    if (!cvElement) return;

    try {
      setIsGenerating(true);
      
      // Add print-mode class for styling adjustments
      cvElement.classList.add('print-mode');
      
      // Allow DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 format dimensions in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Dominik_Kuta_CV.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Clean up
      cvElement.classList.remove('print-mode');
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-70"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span>Pobierz CV (PDF)</span>
    </button>
  );
}
