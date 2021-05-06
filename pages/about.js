import Head from "next/head";

export default function About() {
  return (
    <div>
      <Head>
        <script
          key="about0-logo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.daisforall.com/",
              logo: "https://www.daisforall.cyou/logo.png",
            }),
          }}
        ></script>
      </Head>
    </div>
  );
}
