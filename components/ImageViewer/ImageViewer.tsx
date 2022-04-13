import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import { PrismicRichText } from '../../types';
import s from './ImageViewer.module.scss';

type IProps = {
  caption: PrismicRichText;
  imgUrl: string;
  alt: string;
};

export default function ImageViewer({ caption, imgUrl, alt }: IProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className={s.image__holder}>
        <Image src={imgUrl} layout="fill" objectFit="contain" alt={alt} />
      </div>
      <RichText render={caption} />
    </div>
  );
}
