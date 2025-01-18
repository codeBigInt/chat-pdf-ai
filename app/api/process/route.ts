import { loadS3ToPinecone } from "@/lib/server/processor"

export async function POST(req: Request) {
    try {
        const { fileKey } = await req.json()
        await loadS3ToPinecone(fileKey)
        return Response.json({ success: true })
    } catch (error) {
        console.error('PDF processing failed:', error)
        return Response.json({ error: 'Processing failed' }, { status: 500 })
    }
}