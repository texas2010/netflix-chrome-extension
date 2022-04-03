import { useEffect, useState } from 'react';
import isElementExist from '../../utils/isElementExist';

const useIsElementExist = (selector: string) => {
  const [elementBooleanData, setElementBooleanData] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      const booleanData = await isElementExist(selector);
      setElementBooleanData(booleanData);
    })();
  }, [setElementBooleanData, selector]);

  return elementBooleanData;
};

export default useIsElementExist;
