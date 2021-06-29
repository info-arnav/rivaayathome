import Head from "../components/head";

export default function About() {
  return (
    <div>
      <Head url="https://www.rivaayathome.com/about" title="Rivaayat | About">
        <script
          key="about0-logo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.rivaayathome.com/",
              logo: "https://www.rivaayathome.com/logo.png",
            }),
          }}
        ></script>
      </Head>
    </div>
  );
}
