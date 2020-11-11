import { createMuiTheme } from '@material-ui/core'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
/* darkBlue: #044BD9
mediumBlue: #2B65D9
lightBlue: #2B76D9
yellow: #F2AC29
grey: #F2F2F2 */
const breakpoints = createBreakpoints({})
export const lightMode = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      colorPrimary: {
        backgroundColor: '#ececec',
      }
    },
    MuiButton: {
      root: {
        fontFamily: "Noto Sans JP', sans-serif",
        textTransform: 'none',
        fontSize: '1rem',
        color: '#044BD9',
        borderRadius: '20px',
        margin: '0 5px',
      },
      outlinedSizeSmall: {
        padding: '3px 20px',
        border: '2px solid #044BD9',
        fontSize: '1rem',
        borderRadius: '20px',
        '&:hover': {
          padding: '3px 20px',
          border: '2px solid #044BD9',
          backgroundColor: '#2B65D9',
          borderRadius: '20px',
          color: '#FFFFFF',
        },
      },
      containedSizeSmall: {
        padding: '3px 20px',
        fontSize: '1rem',
        borderRadius: '20px',
        backgroundColor: '#2B65D9',
        color: '#FFFFFF',
        '&:hover': {
          padding: '3px 20px',
          backgroundColor: '#F2F2F2',
          borderRadius: '20px',
          color: '#044BD9',
        },
      },
      containedSizeLarge: {
        borderRadius: '20px',
        backgroundColor: '#2B65D9',
        color: '#FFFFFF',
        fontSize: '1.1rem',
        '&:hover': {
          backgroundColor: '#F2F2F2',
          borderRadius: '20px',
          color: '#044BD9',
        },
      },
      textSizeSmall: {
        fontSize: '1rem',
        margin: '0 10px'
      },
      containedSecondary: {
        fontSize: '1rem',
        backgroundColor: '#E33C1C',
        borderRadius: '20px',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#FCF5F4',
          borderRadius: '20px',
          color: '#000000',
        },
      }
    },
    MuiAvatar: {
      root: {
        width: '38px',
        height: '38px',
        fontSize: '1.2rem',
        fontFamily: 'Noto Sans JP, sans-serif',
      },
    },
    MuiSelect: {
      icon: {
        left: 'calc(100% - 20px)'
      }
    },
    MuiInputLabel: {
      root: {
        fontFamily: "Noto Sans JP, sans-serif",
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
        color: "rgba(0, 0, 0, 0.47)",
        marginRight: '5px'
      }
    },
    MuiInputBase: {
      input: {
        fontFamily: "Noto Sans JP, sans-serif",
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
      },
      colorSecondary: {
        color: "#000000"
      }
    },
    MuiChip: {
      root: {
        margin: '5px'
      }
    },
    MuiToolbar: {
      gutters: {
        [breakpoints.up('lg')]: {
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem'
        },
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '14px'
      }
    },
    MuiBadge: {
      anchorOriginBottomRightCircle: {
        top: '70%'
      }
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#2B65D9",
        backgroundColor: "#ffffff42"
      },
      root: {
        padding: '10px'
      }
    }
  },
})
