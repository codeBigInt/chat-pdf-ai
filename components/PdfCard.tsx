"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, Calendar, LoaderPinwheel } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from "react"
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


// Coping pdf.worker.min.mjs to public folder
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFCardProps {
  name: string
  imageUrl?: string,
  id: string,
  creationDate: Date
}

export function PDFCard({ name, creationDate, id, imageUrl }: PDFCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <Link href={`/chats/${id}`}>
      <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div ref={containerRef} className="relative aspect-[3/4] flex flex-col items-center bg-gray-300 overflow-hidden">
            <Document
              file={imageUrl}
              loading={() => (
                <LoaderPinwheel size={25} className="text-pink-500 animate-bounce" />
              )}
              className="flex justify-center items-center"
            >
              <Page pageNumber={1} _className="w-full max-sm:h-full" width={300} />
            </Document>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="flex items-center gap-2 w-full">
            <FileText size={18} className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold line-clamp-1">{name.length > 20 ? name.slice(0, 20) + "..." : name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time>
              {creationDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
