import Head from "../components/head";

export default function About() {
  return (
    <div>
      <Head url="https://www.daisforall.com/about" title="DaisForAll | About">
        <script
          key="about0-logo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.daisforall.com/",
              logo: "https://www.daisforall.com/logo.png",
            }),
          }}
        ></script>
      </Head>
    </div>
  );
}
