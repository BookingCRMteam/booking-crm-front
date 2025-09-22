import React from 'react';

import ReactCountryFlag from 'react-country-flag';

type CountryFlagProps = {
  countryCode: string;
};

export const CountryFlag = ({ countryCode }: CountryFlagProps) => {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '1.5em',
        height: '1.5em',
        marginRight: 8,
      }}
    />
  );
};
