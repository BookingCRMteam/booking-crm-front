const propTypesTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {
  return tpl`
    "use client"
    ${imports}

import { SvgIcon, SvgIconProps } from '@mui/material';
${interfaces}

const IconComponent = (${props}) => {
  return ${jsx};
};

const ${componentName}: React.FC<SvgIconProps> = (props) => {
  return <SvgIcon component={IconComponent} {...props} />;
};
${exports};
  `;
};

module.exports = propTypesTemplate;
