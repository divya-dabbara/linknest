import clientPromise from "@/lib/mongodb"
import { handleClientScriptLoad } from "next/script"

export async function POST(request) {
    // This function handles the POST request to add a new link
  const body = await request.json()
  const client = await clientPromise
  const db = client.db('bittree')
  const collection = db.collection('links')

  // If the handle already exists, return an error
  const existingHandle = await collection.findOne({handle: body.handle})

  if (existingHandle) {
    return Response.json({ success: false, error: true, message: 'This handle already exists. Please choose another one.', result: null })
  }

  const result = await collection.insertOne(body)
  return Response.json({ success: true, error: false, message: 'Your Bittree has been generated.', result: result })
} 