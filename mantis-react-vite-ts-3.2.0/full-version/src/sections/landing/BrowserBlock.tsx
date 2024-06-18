// third-party
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project import
import useConfig from 'hooks/useConfig';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// ==============================|| LANDING - BROWSER  PAGE ||============================== //

export default function BrowserBlockPage() {
  const theme = useTheme();
  const { presetColor } = useConfig();

  return (
    <Box sx={{ position: 'relative', '& .ReactCompareSlider': { direction: theme.direction } }}>
      <ReactCompareSlider
        className="ReactCompareSlider"
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: undefined,
              background: theme.palette.common.white,
              border: 0,
              color: '#333'
            }}
          />
        }
        itemOne={<ReactCompareSliderImage src={getImageUrl(`${presetColor}-dark.jpg`, ImagePath.LANDING)} />}
        itemTwo={<ReactCompareSliderImage src={getImageUrl(`${presetColor}-light.jpg`, ImagePath.LANDING)} />}
      />
    </Box>
  );
}
