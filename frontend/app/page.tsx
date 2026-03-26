import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>App is working 🚀</h1>
      <p>Click on Below link you can go to Register page </p>
      <Link href='/register'>
       <button>Go to Main page</button> 
      </Link>
    </div>
  );
}
