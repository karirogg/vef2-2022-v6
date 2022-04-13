import { RichText } from "prismic-reactjs";
import { useState } from "react";
import { PrismicRichText } from "../../types";

type IProps = {
  title: PrismicRichText;
  content: PrismicRichText;
};

export default function AccordionItem({ title, content }: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div onClick={() => setOpen(!open)}>
      <RichText render={title} />
      {open && <RichText render={content} />}
    </div>
  );
}
