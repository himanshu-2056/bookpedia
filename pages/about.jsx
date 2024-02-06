import Layout from "@/components/common/Layout";
import React from "react";

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5 space-y-10 my-10">
        <div className="h-[200px] bg-indigo-500 flex items-center justify-center rounded-xl custom-shadow">
          <h1 className="text-5xl text-white font-semibold ">About</h1>
        </div>
        <p>
          Welcome to LegacyLibrary - Your Ultimate Destination for Old Books <br />
          <br />
          <br />
          At LegacyLibrary, we believe that every book tells a unique story and
          holds immense value. Our mission is to connect book enthusiasts with a
          vast collection of old books, fostering a love for literature and a
          sense of nostalgia. If you&apos;re someone who appreciates the beauty
          of yellowed pages, the smell of aged paper, and the history that
          lingers within each book, you&apos;ve come to the right place.
          LegacyLibrary is your go-to online marketplace for selling and buying
          pre-loved books. <br />
          <br />
          <br /> <span className="font-bold">Why choose LegacyLibrary?</span> <br />
          <br />
          Extensive Collection: Our platform hosts a diverse range of old books
          across various genres, including classics, fiction, non-fiction,
          textbooks, and more. You&apos;ll find hidden literary gems and
          timeless masterpieces waiting to be discovered.
          <br />
          <br /> <span className="font-bold">Trusted Sellers:</span> We&apos;ve
          curated a community of trustworthy sellers who take pride in
          preserving the quality and authenticity of every book they offer. You
          can browse through detailed descriptions and reviews to make informed
          decisions before making a purchase.
          <br />
          <br />
          <span className="font-bold">Sustainable Reading: </span> By embracing
          pre-owned books, you&apos;re not only expanding your personal library
          but also contributing to sustainable reading practices. Reusing books
          reduces waste and supports a greener environment.
          <br />
          <br /> <span className="font-bold">Easy Selling Process: </span> Have
          a collection of old books gathering dust on your shelves? LegacyLibrary
          simplifies the selling process, allowing you to list your books
          effortlessly and reach potential buyers who share your passion for
          literature. Connect with Fellow Book Lovers: LegacyLibrary is more than
          just a marketplace. It&apos;s a community where book lovers can
          connect, share recommendations, and engage in discussions about their
          favorite literary works.
          <br />
          <br />
          <br /> Join us in celebrating the joy of reading! Whether you&apos;re
          on a quest to find a long-lost novel, looking to sell your cherished
          book collection, or simply seeking inspiration from the world of
          literature, LegacyLibrary is here to make your journey delightful and
          rewarding. Start exploring LegacyLibrary today and let the stories unfold!
        </p>
      </div>
    </Layout>
  );
};

export default About;
