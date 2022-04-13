export type PrismicRichText = any;

export type PrismicImage = {
  dimensions: { width: string; height: string };
  alt: string;
  copyright: string;
  url: string;
};

export type AccordionData = {
  __typename: 'InformationPageSlicesAccordion';
  variation: {
    primary: {
      title: PrismicRichText;
    };
    items: [
      {
        title: PrismicRichText;
        content: PrismicRichText;
      }
    ];
  };
};

export type ImageTypeData = {
  __typename: 'InformationPageSlicesImage';
  variation: {
    primary: {
      image: PrismicImage;
      caption: PrismicRichText;
    };
  };
};

export type TextData = {
  __typename: 'InformationPageSlicesText';
  variation: {
    primary: {
      title: PrismicRichText;
      description: PrismicRichText;
    };
  };
};

export type ListData = {
  __typename: 'InformationPageSlicesList';
  variation: {
    primary: {
      title: PrismicRichText;
      description: PrismicRichText;
    };
    items: [
      {
        title: PrismicRichText;
      }
    ];
  };
};
