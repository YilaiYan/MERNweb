import React from 'react';
import PropTypes from 'prop-types';
//anytime want to interact with redux whether calling an action or getting state, use connect
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(
        alert => (
            <section className='container'>
                <div key={alert.id} className={'alert alert-'+alert.alertType} >
                    { alert.msg }
                </div>
            </section>
        )
    );

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

//fetch state into this components
//state.alert is a reducer
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);