import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { fetchFromPrismic } from '../api/prismic';
import Accordion from '../components/Accordion/Accordion';
import ImageViewer from '../components/ImageViewer/ImageViewer';
import {
  AccordionData,
  ImageTypeData,
  PrismicRichText,
  TextData,
} from '../types';

type IProps = {
  title: PrismicRichText;
  slices: Array<AccordionData | ImageTypeData | TextData>;
};

export default function InformationPage({ title, slices }: IProps) {
  return (
    <>
      <RichText render={title} />
      <Link href="/">Til baka</Link>
      {slices.map((slice, i) => {
        if (slice.__typename === 'InformationPageSlicesAccordion') {
          return (
            <Accordion
              key={i}
              title={slice.variation.primary.title}
              items={slice.variation.items}
            />
          );
        } else if (slice.__typename == 'InformationPageSlicesText') {
          return (
            <div key={i}>
              <RichText render={slice.variation.primary.title} />
              <RichText render={slice.variation.primary.description} />
            </div>
          );
        } else if (slice.__typename == 'InformationPageSlicesImage') {
          const { caption, image } = slice.variation.primary;
          return (
            <ImageViewer
              key={i}
              caption={caption}
              imgUrl={image.url}
              alt={image.alt}
            />
          );
        }
      })}
    </>
  );
}

const query = `
query($uid: String = "golf") {
  informationPage(uid:$uid, lang:"is") {
    title
    slices {
      __typename
      ... on InformationPageSlicesAccordion {
        variation {
         	... on InformationPageSlicesAccordionDefault {
            primary {
              title
            }
            items {
              title
              content
            }
          }
        }
      }
      ... on InformationPageSlicesImage {
        variation {
         	... on InformationPageSlicesImageDefault {
            primary {
              image
              caption
            }
          }
        }
      }
      ... on InformationPageSlicesText {
        variation {
         	... on InformationPageSlicesTextDefault {
            primary {
              title
              description
            }
          }
        }
      }
    }
  }
}
`;

type PrismicResponse = {
  informationPage: {
    title: PrismicRichText;
    slices: Array<AccordionData | ImageData | TextData>;
  };
};

const pathsQuery = `
query {
  allInformationPages {
    edges {
      node {
        _meta {
          uid
        }
      }
    }
  }
}
`;

type PathsResponse = {
  allInformationPages: {
    edges: [
      {
        node: {
          _meta: {
            uid: string;
          };
        };
      }
    ];
  };
};

export async function getStaticPaths() {
  const data = await fetchFromPrismic<PathsResponse>(pathsQuery);

  return {
    paths: data.allInformationPages.edges.map((res) => {
      return {
        params: {
          uid: res.node._meta.uid,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const uid = params?.uid! as string;
  const data = await fetchFromPrismic<PrismicResponse>(query, { uid });

  return {
    props: {
      title: data.informationPage.title,
      slices: data.informationPage.slices,
    },
  };
}
