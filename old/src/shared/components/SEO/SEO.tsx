import Head from 'next/head';
import React from 'react';
import { EnvironmentVariable } from 'src/shared/utils/envVariables';

type SEOProps = {
  description: string;
  title: string;
  siteTitle: string;
};

export const SEO: React.FC<SEOProps> = ({ description, title, siteTitle }) => {
  const imgUrl = EnvironmentVariable.WEB_URL + '/seo.webp';

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:locale" content="es_PE" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:site_name"
        content="Philip Perez Castro frontend developer"
      />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={EnvironmentVariable.WEB_URL} />
      <meta property="og:site_name" content={`${title} | ${siteTitle}`} />

      {/* MICROSOFT APPLICATIONS */}
      <meta name="msapplication-TileImage" itemProp="image" content={imgUrl} />

      {/* FACEBOOK */}
      <meta property="og:image" itemProp="image" content={imgUrl} />
      <meta property="og:image:secure_url" itemProp="image" content={imgUrl} />
      <meta property="og:image:width" content="630" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={EnvironmentVariable.WEB_URL} />
      <meta property="twitter:url" content={EnvironmentVariable.WEB_URL} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" itemProp="image" content={imgUrl} />

      {/* WHATSAPP */}
      <meta property="og:image" itemProp="image" content={imgUrl} />
      <meta property="og:image:secure_url" itemProp="image" content={imgUrl} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="630" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};
