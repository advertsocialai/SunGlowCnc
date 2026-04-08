import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/step',
  'application/stp',
  'model/step',
  'model/stp',
  'application/octet-stream', // .step .stp .stl .iges
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/vnd.ms-excel',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const ALLOWED_EXTENSIONS = [
  '.pdf', '.step', '.stp', '.stl', '.iges', '.igs',
  '.jpg', '.jpeg', '.png', '.gif',
  '.dwg', '.dxf', '.sat', '.ipt', '.prt', '.sldprt',
  '.doc', '.docx', '.xls', '.xlsx',
]

const MAX_SIZE_MB = 50
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Size check
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_SIZE_MB}MB` },
        { status: 400 }
      )
    }

    // Extension check
    const originalName = file.name
    const ext = path.extname(originalName).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` },
        { status: 400 }
      )
    }

    // Build safe filename: timestamp + userId prefix + original name sanitised
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `${Date.now()}_${session.user.id.slice(-6)}_${safeName}`

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    // Write file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(path.join(uploadDir, fileName), buffer)

    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      url: fileUrl,
      name: originalName,
      size: file.size,
      ext,
    }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
