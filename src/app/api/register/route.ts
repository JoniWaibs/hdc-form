import { DataSource } from "@/services/datasource"
import { NextResponse } from "next/server"
//import { createPreference } from "@/lib/mercadopago"


export async function POST(req: Request) {
  const data = await req.json()
  
  const response = await new DataSource().createStudent({
    ...data,
    confirmed: false,
  })

  // const preference = await createPreference({
  //   title: "Curso Periodismo 101",
  //   price: 10000,
  //   email,
  //   userId: user.id,
  // })

  return NextResponse.json(response)
}
