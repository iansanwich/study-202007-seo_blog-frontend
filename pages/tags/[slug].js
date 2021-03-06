import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";

import Layout from "../../components/Layout";
import { getSingleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME } from "../../config";
import Card from "../../components/blog/Card";

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>

      <meta
        name="description"
        content={`Best programming tutorials on ${query.slug}`}
      />
      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />

      <meta
        property="og:title"
        content={`Latest web development tutorials tags | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`Best programming tutorials on ${query.slug}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/sandwich.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/sandwich.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* TODO: Get app id from FB */}
      <meta property="fb:app_id" content="" />
    </Head>
  );

  return (
    <>
      {head()}

      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((blog) => (
                  <div key={blog._id}>
                    <Card blog={blog}></Card>
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = ({ query }) => {
  return getSingleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default Tag;
