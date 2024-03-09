import { SignJWT, jwtVerify} from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import mysql from "mysql2/promise"


const secretKey = 'secret' 
const key = new TextEncoder().encode(secretKey)

export async function encrpyt(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(key)
}


export async function Query(query: string, values: any[] = []) {

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    })
  
    try {
      const [ results ] = await connection.execute(query, values)
  
      connection.end()
  
      return results
    } catch (error) {
      return { error }
    }
  }

export async function decrypt(input: string) : Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })
    return payload
}

export async function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)
    

    const results: any = await Query('SELECT * FROM Customer WHERE email = ?', [email])

    const user = results[0]

    
    if (!user) {
        return { error: 'User not found' }
    }

    if (user.password !== password) {
        return { error: 'Password is incorrect' }
    }

    const expires = new Date(Date.now() + 10 * 1000)
    const session = await encrpyt({ user, expires})

}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0) })
}

export async function getSession() {
    const session = cookies().get('session')?.value 
    if (!session) return null
    return await decrypt(session)
}

export async function updateSession(request: NextRequest){
    const session = request.cookies.get('session')?.value
    if (!session) return;

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 10 * 1000)
    const res = NextResponse.next()

    res.cookies.set({
        name: 'session',
        value: await encrpyt(parsed),
        httpOnly: true,
        expires: parsed.expires
    })
    return res
}