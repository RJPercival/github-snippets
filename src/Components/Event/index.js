import React from 'react';
import PropTypes from 'prop-types';

const PullRequestEvent = ({ event: { payload: { action, pull_request: { html_url}}} }) => (<div className={"Event"}>
    <h2 className={"Event__title"}>Pull Request Event</h2>
    <a href={html_url}>Pull request {action}</a>
</div>);

class Events extends React.PureComponent {
    render() {
        const { event, components } = this.props;
        const eventType = event.type;
        if (!eventType) {
            return null;
        }

        const Component = components[eventType];

        if (!Component) {
            return null;
        }
        return (

                <Component {...this.props} />

        );
    }
}

export const EVENT_TYPES = {
    PULL_REQUEST: 'PullRequestEvent',
};

Events.defaultProps = {
    components: {
        [EVENT_TYPES.PULL_REQUEST]: PullRequestEvent,
    },
};

Events.propTypes = {
    event: PropTypes.object.isRequired,
};

Events.EVENT_TYPES = EVENT_TYPES;

export default Events;
