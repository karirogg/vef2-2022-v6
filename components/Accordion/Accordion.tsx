import { RichText } from 'prismic-reactjs';
import { PrismicRichText } from '../../types';
import AccordionItem from '../AccordionItem/AccordionItem';

type IProps = {
  title: PrismicRichText;
  items: [{ title: PrismicRichText; content: PrismicRichText }];
};

export default function Accordion({ title, items }: IProps) {
  return (
    <>
      <RichText render={title} />
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} content={item.content} />
      ))}
    </>
  );
}
