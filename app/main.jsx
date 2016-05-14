import React from 'react';
import ReactDOM from 'react-dom';

const Hello = function (props) {
    return <div>{'Hello ' + props.name}</div>;
};

Hello.propTypes = {
    name: React.PropTypes.string,
};

ReactDOM.render(
    <Hello name="World" />,
    document.getElementById('app')
);
