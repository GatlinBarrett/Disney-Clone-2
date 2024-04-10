// npm install firebase --force
// npm add @heroicons/react@v1
// npm install @auth/firebase-adapter firebase-admin --force
// npm add next-auth
// npm install react-responsive-carousel
// npm install tailwind-scrollbar-hide
// npm install react-player
// 

import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import ShowsCollection from "../components/ShowsCollection";

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) {
  console.log(popularMovies);
  const { data: session } = useSession();

  return (
    <div className="">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      {!session ? (
        <Hero></Hero>
      ) : (
        <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          <Slider></Slider>
          <Brands></Brands>
          <MoviesCollection
            results={popularMovies}
            title="Popular Movies"
          ></MoviesCollection>
          <ShowsCollection
            results={popularShows}
            title="Popular Shows"
          ></ShowsCollection>

          <MoviesCollection
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}
