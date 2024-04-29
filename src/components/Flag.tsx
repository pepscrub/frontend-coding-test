import { CSSProperties, FC } from "react";

interface Props {
  countryCode: string;
  cdnURL?: string;
  cdnSuffix?: string;
  style?: CSSProperties;
}

export const Flag: FC<Props> = ({
  countryCode,
  cdnURL = 'https://static.lens.org/lens/9.1.3/img/flags/',
  cdnSuffix = 'png',
  style,
}) => {
  if (countryCode.length > 2 || typeof countryCode !== 'string') return null;

  const flagUrl = `${cdnURL}${countryCode}.${cdnSuffix}`
  
  return (
    <img
      src={flagUrl}
      className={'mx-0.5'}
      style={{
        display: 'inline-block',
        fontSize: '1rem',
        lineHeight: '1rem',
        verticalAlign: 'middle',
        width: '1rem',
        ...style
      }}
    />
  )
}