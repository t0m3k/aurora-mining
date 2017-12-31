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
        marginLeft: drawerWidth
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    drawerPaper: {
        width: 250
    },
    drawerHeader: {
      ...theme.mixins.toolbar,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 24px'
    },
    content: {
      width: '100%',
      padding: theme.spacing.unit * 3,
      height: 'calc(100% - 56px)',
      marginTop: 56
    },
    progress: {
      margin: "20% auto",
      textAlign: "center"
    }
}))

export default styles
