import Image from 'next/image'
import Link from 'next/link'
import StudentInfo from './studentinfo'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <StudentInfo />
      <Link href={"../week2/"}>Week 2</Link>
    </main>
  )
}
