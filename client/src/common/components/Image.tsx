import classNames from 'classnames';
import { FC } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';

interface ImageProps extends LazyLoadImageProps {
  width?: number;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

const Image: FC<ImageProps> = ({ width, height, rounded, ...props }) => {
  const classStyle = classNames('relative', props.wrapperClassName, {
    'w-full': !width,
    'pb-[100%]': !height,
    [`rounded-${rounded}`]: rounded,
    'overflow-hidden': rounded,
  });

  return (
    <LazyLoadImage
      {...props}
      wrapperProps={{ style: { display: 'block' } }}
      wrapperClassName={classStyle}
      className={classNames('absolute top-0 left-0 size-full', props.className, {
        [`rounded-[${rounded}px]`]: rounded,
      })}
      effect="blur"
    />
  );
};

export default Image;
