import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { observer, inject} from 'mobx-react'


function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

@inject('store')
@observer
class SimpleModal extends React.Component {
    constructor(props){
        super(props)
        this.store = props.store.publicStore
        this.setModalState = this.store.setModalState
    }
    state = {
        open: false,
    };


    handleClose = () => {
        this.setModalState(false);
    };


    render() {
        const { classes } = this.props;
       const modalState = this.store.modalState/**/
        return (
            <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalState}// 打开方式
                onClose={this.handleClose}
            >
            <div style={getModalStyle()} className={classes.paper}>
                {React.cloneElement(React.Children.only(this.props.children), {})}
            </div>
            </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;