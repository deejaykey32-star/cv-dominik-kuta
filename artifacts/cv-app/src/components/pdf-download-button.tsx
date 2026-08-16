import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useCV } from '../context/cv-context';
import { CVPrintTemplate } from './cv-print-template';

export function PDFDownloadButton() {
  const { cvData } = useCV();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    try {
      setIsGenerating(true);
      setShowTemplate(true);

      // Wait two frames for React to mount + paint the hidden template
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      await new Promise((resolve) => setTimeout(resolve, 80));

      const el = templateRef.current;
      if (!el) return;

      // Capture at 3× for sharp A4 output
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Ensure full height is captured
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      // A4 dimensions in mm
      const A4_W = 210;
      const A4_H = 297;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Single page — template is exactly A4 height, render it 1:1
      const imgData = canvas.toDataURL('image/jpeg', 0.97);
      pdf.addImage(imgData, 'JPEG', 0, 0, A4_W, A4_H);

      pdf.save('Dominik_Kuta_CV.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setShowTemplate(false);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        data-testid="button-download-pdf"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-70"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        <span>{isGenerating ? 'Generowanie...' : 'Pobierz CV (PDF)'}</span>
      </button>

      {/* Off-screen print template — mounted only during generation */}
      {showTemplate &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: '-9999px',
              zIndex: -1,
              pointerEvents: 'none',
              visibility: 'visible',
            }}
          >
            <CVPrintTemplate ref={templateRef} cvData={cvData} />
          </div>,
          document.body
        )}
    </>
  );
}
