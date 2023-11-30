import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Digital Library</h1>
      <p>Welcome to the digital library!</p>
      <Link href="/graphql">
        <button>Click me to see what books are available!</button>
      </Link>
    </main>
  );
}
