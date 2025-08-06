import Link from "next/link";

export default function ExploreCTA() {
  return (
    <section className="bg-[#FFD522] text-black py-12 px-4 text-center rounded-xl mt-12 mx-auto max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Ready to explore all the experiences available for you?
      </h2>
      <Link
        href="/explore"
        className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition"
      >
        Explore Events
      </Link>
    </section>
  );
}
