import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, Calendar } from 'lucide-react'
import Link from 'next/link'

interface PDFCardProps {
  name: string
  imageUrl?: string,
  id: string,
  creationDate: Date
}

export function PDFCard({ name, creationDate, id }: PDFCardProps) {
  return (
    <Link href={`/chats/${id}`}>
      <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full bg-gray-300 overflow-hidden">
            <Image
              src={"/images/pdf-thumbnail.jpg"}
              alt={`${name} thumbnail`}
              fill
              className="object-cover transition-all duration-300 hover:scale-105"
            />
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
  )
}

