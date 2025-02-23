"use client";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, LoaderPinwheel } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
    pdfUrl: string;
}

const ChatPdfViewer = ({ pdfUrl }: Props) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    // const [isMobile, setIsMobile] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const pageRefs = useRef<HTMLElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = (type: "INCREMENT" | "DECREMENT") => {
        if (!numPages) return;
        
        let newPageNumber;
        if (type === "INCREMENT") {
            newPageNumber = pageNumber < numPages ? pageNumber + 1 : pageNumber;
        } else {
            newPageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
        }
        setPageNumber(newPageNumber);
        scrollToPage(newPageNumber);
    }

    const scrollToPage = (pageNumber: number) => {
        if (numPages && pageRefs.current[pageNumber - 1]) {
            pageRefs.current[pageNumber - 1].scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (!numPages || !containerRef.current) return;

        const container = containerRef.current;
        let mostVisiblePage = 1;
        let maxVisibleHeight = 0;

        for (let i = 0; i < numPages; i++) {
            const page = pageRefs.current[i];
            if (!page) continue;

            const rect = page.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const visibleTop = Math.max(rect.top, containerRect.top);
            const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                mostVisiblePage = i + 1;
            }
        }

        if (mostVisiblePage !== pageNumber) {
            setPageNumber(mostVisiblePage);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const throttledScroll = () => {
                requestAnimationFrame(() => handleScroll());
            };
            container.addEventListener('scroll', throttledScroll);
            return () => {
                container.removeEventListener('scroll', throttledScroll);
            };
        }
    }, [numPages, pageNumber]);

    // useEffect(() => {
    //     const checkIsMobile = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };

    //     window.addEventListener('resize', checkIsMobile);
    //     checkIsMobile();

    //     return () => {
    //         window.removeEventListener('resize', checkIsMobile);
    //     };
    // }, []);

    const renderPages = () => {
        if (!numPages) return null;

        return Array.from(new Array(numPages), (_, index) => (
            <div
                ref={(ref) => {
                    if (ref) pageRefs.current[index] = ref as HTMLElement;
                }}
                className="mb-4 shadow-lg w-full overflow-hidden"
                key={`page_${index + 1}`}
            >
                <Page
                    key={`page_content_${index + 1}`}
                    pageNumber={index + 1}
                    className="w-full"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    width={containerRef.current?.clientWidth}
                    loading={
                        <div className="h-96 w-full flex items-center justify-center bg-gray-100">
                            <div className="flex flex-col items-center">
                                <LoaderPinwheel size={30} className="text-pink-500 animate-bounce" />
                                <p>Loading page {index + 1}...</p>
                            </div>
                        </div>
                    }
                />
            </div>
        ));
    };

    return (
        <div ref={containerRef} className="w-full lg:max-w-full p-2 top-0 max-h-full overflow-auto h-full">
            <Document
                className="w-full max-h-full"
                file={pdfUrl}
                onLoadError={(error) => {
                    console.error('Error loading PDF:', error);
                    // setIsLoading(false);
                }}
                onLoadSuccess={({ numPages: totalPages }) => {
                    console.log('PDF loaded with', totalPages, 'pages');
                    setNumPages(totalPages);
                    // setIsLoading(false);
                }}
                loading={() => (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col items-center">
                            <LoaderPinwheel size={30} className="text-pink-500 animate-bounce" />
                            <p>Loading PDF...</p>
                        </div>
                    </div>
                )}
            >
                {renderPages()}
                {numPages && (
                    <div className="flex sticky md:absolute bottom-6 gap-2 justify-center w-full">
                        <div className="flex bg-white gap-3 px-4 py-1 border border-gray-500 rounded-3xl text-black w-max">
                            <Button 
                                disabled={pageNumber <= 1} 
                                onClick={() => handleNavigate("DECREMENT")} 
                                className="bg-transparent hover:text-white z-[20] rounded-full border border-gray-500"
                            >
                                <ChevronLeft className="hover:text-white text-black" />
                            </Button>
                            <p className="border border-gray-500 flex items-center justify-center px-4 rounded-md">
                                {pageNumber} of {numPages}
                            </p>
                            <Button 
                                disabled={pageNumber >= numPages} 
                                onClick={() => handleNavigate("INCREMENT")} 
                                className="bg-transparent hover:text-white z-[20] rounded-full border border-gray-500"
                            >
                                <ChevronRight className="hover:text-white text-black" />
                            </Button>
                        </div>
                    </div>
                )}
            </Document>
        </div>
    );
};

export default ChatPdfViewer;