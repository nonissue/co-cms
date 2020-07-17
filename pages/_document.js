import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/css-media-vars.css' />
        </Head>
        <body>
          <Main />
          {/* Here we will mount our modal portal */}
          <NextScript />
        </body>
      </html>
    );
  }
}
