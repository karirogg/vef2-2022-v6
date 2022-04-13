import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { fetchFromPrismic } from '../api/prismic';
import { PrismicRichText } from '../types';

type IProps = {
  title: PrismicRichText;
  content: PrismicRichText;
  links: [
    {
      uid: string;
      title: string;
    }
  ];
};

export default function Home({ title, content, links }: IProps) {
  return (
    <>
      <RichText render={title} />
      <RichText render={content} />
      <h2>Hlekkir</h2>
      {links.map((link, i) => {
        return (
          <Link key={i} href={`/${link.uid}`} passHref>
            <a>{link.title}</a>
          </Link>
        );
      })}
    </>
  );
}

type PrismicResponse = {
  allFrontPages: {
    edges: [
      {
        node: {
          title: PrismicRichText;
          content: PrismicRichText;
        };
      }
    ];
  };

  allInformationPages: {
    edges: [
      {
        node: {
          _meta: {
            uid: string;
          };
          title: PrismicRichText;
        };
      }
    ];
  };
};

const query = `
query {
  allFrontPages {
    edges {
      node {
        title
        content
      }
    }
  }

  allInformationPages {
    edges {
      node {
        _meta {
          uid
        }
        title
      }
    }
  }
}
`;

export async function getStaticProps() {
  const data = await fetchFromPrismic<PrismicResponse>(query);

  const { title, content } = data.allFrontPages.edges[0].node;

  const links = data.allInformationPages.edges.map((edge) => {
    return {
      uid: edge.node._meta.uid,
      title: edge.node.title[0].text,
    };
  });

  return {
    props: {
      title,
      content,
      links,
    },
    revalidate: 10,
  };
}
