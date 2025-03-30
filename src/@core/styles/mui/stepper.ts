// ** MUI imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Hooks Imports

const StepperWrapper = styled(Box)<BoxProps>(({ theme }) => {
  // ** Hook

  return {
    [theme.breakpoints.down('md')]: {
      '& .MuiStepper-horizontal:not(.MuiStepper-alternativeLabel)': {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    '& .MuiStep-root': {
      '& .step-label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiAvatar-root': {
          marginRight: theme.spacing(4)
        }
      },
      '& .step-number': {
        fontWeight: 'bold',
        fontSize: '2.125rem',
        marginRight: theme.spacing(2.5),
        color: theme.palette.text.primary
      },
      '& .step-title': {
        fontWeight: 500,
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize
      },
      '& .step-subtitle': {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body2.fontSize
      },
      '& .MuiStepLabel-root.Mui-disabled': {
        '& .step-number': {
          color: theme.palette.text.disabled
        }
      },
      '& .Mui-error': {
        '& .MuiStepLabel-labelContainer, & .step-number, & .step-title, & .step-subtitle': {
          color: theme.palette.error.main
        }
      }
    },
    '& .MuiStepConnector-root': {
      marginLeft: theme.spacing(2.05),
      '& .MuiStepConnector-line': {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderColor: theme.palette.divider
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiStepConnector-line': {
          borderColor: "#000",
          borderStyle: 'dashed'
        }
      }
    },
    '& .MuiStepper-alternativeLabel': {
      '& .MuiStepConnector-root': {
        top: 10
      },
      '& .MuiStepLabel-labelContainer': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: theme.spacing(1)
        }
      }
    },
    '& .MuiStepper-vertical': {
      '& .MuiStep-root': {
        marginBottom: theme.spacing(4),
        '& .step-label': {
          justifyContent: 'flex-start'
        },
        '& .MuiStepContent-root': {
          borderWidth: 2,
          marginLeft: theme.spacing(2.25),
          borderColor: theme.palette.primary.main
        },
        '& .button-wrapper': {
          marginTop: theme.spacing(4)
        },
        '&.active + .MuiStepConnector-root .MuiStepConnector-line': {
          borderColor: theme.palette.primary.main
        },
        '& .MuiStepLabel-root': {
          paddingBottom: theme.spacing(10)
        }
      },
      '& .MuiStepConnector-root': {
        marginLeft: theme.spacing(2.25),
        height: '100%',
        '& .MuiStepConnector-line': {
          borderRadius: 0,
          minHeight: theme.spacing(12),
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: theme.palette.divider,
          height: '100%'
        }
      }
    }
  }
})

export default StepperWrapper
