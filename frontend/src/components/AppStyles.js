const styles = (drawerWidth) => (theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    flex: {
        flex: 1
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          position: 'relative'
        },
    },
    drawerHeader: {
      ...theme.mixins.toolbar,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 24px'
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    content: {
      width: '100%',
      padding: theme.spacing.unit * 3,
      height: 'calc(100% - 56px)',
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      }
    },
    progress: {
      margin: "20% auto",
      textAlign: "center"
    }
}))

export default styles
