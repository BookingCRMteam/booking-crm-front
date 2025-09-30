const propTypesTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {
  return tpl`
    "use client"
    ${imports}

import { SvgIcon, SvgIconProps } from '@mui/material';
${interfaces}

export const ${componentName}: React.FC<SvgIconProps> = (props) => {
  return <SvgIcon component={function icon(${props}) {
  return ${jsx};
}} {...props} />;
};
${exports};
  `;
};

module.exports = propTypesTemplate;
