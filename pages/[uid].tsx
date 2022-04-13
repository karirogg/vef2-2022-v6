import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import { fetchFromPrismic } from '../api/prismic';
import Accordion from '../components/Accordion/Accordion';
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
            <div key={i}>
              <Image
                width={image.dimensions.width}
                height={image.dimensions.height}
                alt={image.alt}
                src={image.url}
              />
              <RichText render={caption} />
            </div>
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

type SSParams = {
  params: {
    uid: string;
  };
};

type PrismicResponse = {
  informationPage: {
    title: PrismicRichText;
    slices: Array<AccordionData | ImageData | TextData>;
  };
};

export async function getServerSideProps({ params }: SSParams) {
  const { uid } = params;
  const data = await fetchFromPrismic<PrismicResponse>(query, { uid });

  return {
    props: {
      title: data.informationPage.title,
      slices: data.informationPage.slices,
    },
  };
}
