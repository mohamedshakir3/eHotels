import { Query } from '@/lib'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

    const country: string | null = request.nextUrl.searchParams.get('country')
    
    const query: string = country ? 'SELECT * FROM Hotel WHERE country = ?' : 'SELECT * FROM Hotel'

    const results = await Query(query, [country])
    
    return Response.json(results)
}
